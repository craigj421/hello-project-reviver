import { useState, useEffect } from "react";
import { supabase } from "@/integrations/supabase/client";
import { useAuth } from "@/contexts/AuthContext";
import { Settings, TitleRate } from "./settingsTypes";
import { fetchUserSettings, updateUserSettings, handleLogoUpload } from "./settingsUtils";

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
    logo_url: "",
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
      const settingsData = await fetchUserSettings(user?.id);
      if (settingsData) {
        setSettings(settingsData);
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

  const updateSettings = async (updates: Partial<Settings>) => {
    if (!user?.id) return;
    
    try {
      const updatedSettings = { ...settings, ...updates };
      setSettings(updatedSettings);
      
      await updateUserSettings(user.id, updatedSettings);
      localStorage.setItem('agent_settings', JSON.stringify(updatedSettings));
    } catch (error) {
      console.error("Error in updateSettings:", error);
      throw error;
    }
  };

  const handleLogoChange = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file && user?.id) {
      try {
        const publicUrl = await handleLogoUpload(file, user.id);
        await updateSettings({ logo_url: publicUrl });
        setLogoPreview(publicUrl);
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