import { useState, useEffect } from "react";
import { supabase } from "@/integrations/supabase/client";
import { useAuth } from "@/contexts/AuthContext";

const SETTINGS_STORAGE_KEY = 'agent_settings';

export interface TitleRate {
  minAmount: number;
  maxAmount: number;
  ratePerThousand: number;
  id?: string;
  settings_id?: string;
}

export interface Settings {
  id?: string;
  emailNotifications: boolean;
  darkMode: boolean;
  maintenanceMode: boolean;
  apiKey: string;
  agentName: string;
  commission: string;
  logo: File | null;
  logo_url?: string;
  propertyTaxRate: string;
  searchExamClosingFee: string;
  titleInsuranceRates: TitleRate[];
}

type SettingsKey = keyof Settings;

export const useSettings = () => {
  const { user } = useAuth();
  const [settings, setSettings] = useState<Settings>({
    emailNotifications: false,
    darkMode: false,
    maintenanceMode: false,
    apiKey: "",
    agentName: "",
    commission: "",
    logo: null,
    propertyTaxRate: "",
    searchExamClosingFee: "",
    titleInsuranceRates: [],
  });

  const [logoPreview, setLogoPreview] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (user) {
      fetchSettings();
    }
  }, [user]);

  const fetchSettings = async () => {
    try {
      console.log("Fetching settings for user:", user?.id);
      
      if (!user?.id) {
        console.error("No user ID available");
        return;
      }

      const { data: settingsData, error: settingsError } = await supabase
        .from('settings')
        .select('*, title_insurance_rates(*)')
        .eq('user_id', user.id)
        .maybeSingle();

      if (settingsError) {
        console.error("Error fetching settings:", settingsError);
        return;
      }

      if (settingsData) {
        console.log("Retrieved settings:", settingsData);
        const transformedRates = settingsData.title_insurance_rates?.map((rate: any) => ({
          minAmount: rate.min_amount,
          maxAmount: rate.max_amount,
          ratePerThousand: rate.rate_per_thousand,
          id: rate.id,
          settings_id: rate.settings_id
        })) || [];

        setSettings({
          id: settingsData.id,
          emailNotifications: settingsData.email_notifications || false,
          darkMode: settingsData.dark_mode || false,
          maintenanceMode: settingsData.maintenance_mode || false,
          apiKey: settingsData.api_key || "",
          agentName: settingsData.agent_name || "",
          commission: settingsData.commission || "",
          logo: null,
          logo_url: settingsData.logo_url,
          propertyTaxRate: settingsData.property_tax_rate || "",
          searchExamClosingFee: settingsData.search_exam_closing_fee || "",
          titleInsuranceRates: transformedRates,
        });

        if (settingsData.logo_url) {
          setLogoPreview(settingsData.logo_url);
        }
      } else {
        console.log("No settings found for user, using defaults");
      }
    } catch (error) {
      console.error("Error in fetchSettings:", error);
    } finally {
      setLoading(false);
    }
  };

  const updateSettings = async (keyOrPartial: SettingsKey | Partial<Settings>, value?: any) => {
    try {
      if (!user?.id) {
        console.error("No user ID available");
        return;
      }

      const updatedSettings = typeof keyOrPartial === 'object'
        ? { ...settings, ...keyOrPartial }
        : { ...settings, [keyOrPartial]: value };

      setSettings(updatedSettings);

      // Save to Supabase
      const { error } = await supabase
        .from('settings')
        .upsert({
          user_id: user.id,
          email_notifications: updatedSettings.emailNotifications,
          dark_mode: updatedSettings.darkMode,
          maintenance_mode: updatedSettings.maintenanceMode,
          api_key: updatedSettings.apiKey,
          agent_name: updatedSettings.agentName,
          commission: updatedSettings.commission,
          logo_url: updatedSettings.logo_url,
          property_tax_rate: updatedSettings.propertyTaxRate,
          search_exam_closing_fee: updatedSettings.searchExamClosingFee,
        })
        .eq('user_id', user.id);

      if (error) {
        console.error("Error updating settings:", error);
        throw error;
      }

      // Save to localStorage for offline access
      localStorage.setItem(SETTINGS_STORAGE_KEY, JSON.stringify(updatedSettings));
    } catch (error) {
      console.error("Error in updateSettings:", error);
      throw error;
    }
  };

  const handleLogoChange = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file && user?.id) {
      try {
        // Upload to Supabase Storage
        const fileExt = file.name.split('.').pop();
        const fileName = `${Math.random()}.${fileExt}`;
        const filePath = `${user.id}/${fileName}`;

        console.log("Uploading logo to path:", filePath);

        const { error: uploadError, data } = await supabase.storage
          .from('logos')
          .upload(filePath, file);

        if (uploadError) {
          console.error("Error uploading logo:", uploadError);
          throw uploadError;
        }

        if (data) {
          const { data: urlData } = supabase.storage
            .from('logos')
            .getPublicUrl(filePath);

          const publicUrl = urlData.publicUrl;
          console.log("Logo uploaded successfully, public URL:", publicUrl);

          // Update settings with new logo URL
          await updateSettings('logo_url', publicUrl);
          setLogoPreview(publicUrl);
        }
      } catch (error) {
        console.error("Error uploading logo:", error);
        throw error;
      }
    }
  };

  return {
    settings,
    updateSettings,
    handleLogoChange,
    logoPreview,
    loading,
  };
};