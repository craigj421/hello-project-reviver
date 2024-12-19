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
      console.log("Fetching settings for user:", user?.id);
      const settingsData = await fetchUserSettings(user?.id);
      if (settingsData) {
        console.log("Retrieved settings:", settingsData);
        setSettings(settingsData);
        if (settingsData.logo_url) {
          console.log("Setting logo preview from fetched settings:", settingsData.logo_url);
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
      console.log("Updating settings with:", updates);
      const updatedSettings = { ...settings, ...updates };
      setSettings(updatedSettings);
      
      await updateUserSettings(user.id, updatedSettings);
      console.log("Settings updated successfully");
    } catch (error) {
      console.error("Error in updateSettings:", error);
      throw error;
    }
  };

  const handleLogoChange = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file && user?.id) {
      try {
        console.log("Uploading new logo file:", file.name);
        const publicUrl = await handleLogoUpload(file, user.id);
        console.log("Logo uploaded successfully, URL:", publicUrl);
        setLogoPreview(publicUrl);
        await updateSettings({ logo_url: publicUrl });
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