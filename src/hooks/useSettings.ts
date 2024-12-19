import { useState, useEffect } from "react";
import { supabase } from "@/integrations/supabase/client";
import { useAuth } from "@/contexts/AuthContext";

const SETTINGS_STORAGE_KEY = 'agent_settings';

export interface TitleRate {
  id?: string;
  settings_id?: string;
  min_amount: number;
  max_amount: number;
  rate_per_thousand: number;
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
      const { data: settingsData, error: settingsError } = await supabase
        .from('settings')
        .select('*, title_insurance_rates(*)')
        .single();

      if (settingsError) {
        console.error("Error fetching settings:", settingsError);
        return;
      }

      if (settingsData) {
        console.log("Retrieved settings:", settingsData);
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
          titleInsuranceRates: settingsData.title_insurance_rates || [],
        });

        if (settingsData.logo_url) {
          setLogoPreview(settingsData.logo_url);
        }
      }
    } catch (error) {
      console.error("Error in fetchSettings:", error);
    } finally {
      setLoading(false);
    }
  };

  const updateSettings = async (keyOrPartial: SettingsKey | Partial<Settings>, value?: any) => {
    try {
      const updatedSettings = typeof keyOrPartial === 'object'
        ? { ...settings, ...keyOrPartial }
        : { ...settings, [keyOrPartial]: value };

      setSettings(updatedSettings);

      // Save to Supabase
      const { error } = await supabase
        .from('settings')
        .update({
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
        .eq('id', settings.id);

      if (error) {
        console.error("Error updating settings:", error);
        throw error;
      }

      // Save to localStorage for offline access
      localStorage.setItem(SETTINGS_STORAGE_KEY, JSON.stringify(updatedSettings));
    } catch (error) {
      console.error("Error in updateSettings:", error);
    }
  };

  const handleLogoChange = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      try {
        // Upload to Supabase Storage
        const fileExt = file.name.split('.').pop();
        const fileName = `${Math.random()}.${fileExt}`;
        const filePath = `${user?.id}/${fileName}`;

        const { error: uploadError, data } = await supabase.storage
          .from('logos')
          .upload(filePath, file);

        if (uploadError) {
          throw uploadError;
        }

        if (data) {
          const { data: urlData } = supabase.storage
            .from('logos')
            .getPublicUrl(filePath);

          const publicUrl = urlData.publicUrl;

          // Update settings with new logo URL
          await updateSettings('logo_url', publicUrl);
          setLogoPreview(publicUrl);
        }
      } catch (error) {
        console.error("Error uploading logo:", error);
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