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
      console.log("User detected, initiating settings fetch for user:", user.id);
      fetchSettings();
    }
  }, [user]);

  const fetchSettings = async () => {
    try {
      console.log("Starting fetchSettings for user:", user?.id);
      const settingsData = await fetchUserSettings(user?.id);
      if (settingsData) {
        console.log("Retrieved settings with logo_url:", settingsData.logo_url);
        setSettings(settingsData);
        if (settingsData.logo_url) {
          console.log("Setting logo preview from fetched settings:", settingsData.logo_url);
          setLogoPreview(settingsData.logo_url);
        }
      } else {
        console.log("No settings data retrieved");
      }
    } catch (error) {
      console.error("Error in fetchSettings:", error);
    } finally {
      setLoading(false);
    }
  };

  const updateSettings = async (updates: Partial<Settings>) => {
    if (!user?.id) {
      console.log("No user ID available for settings update");
      return;
    }
    
    try {
      console.log("Updating settings with:", updates);
      console.log("Current logo_url in updates:", updates.logo_url);
      const updatedSettings = { ...settings, ...updates };
      console.log("New settings after update:", updatedSettings);
      setSettings(updatedSettings);
      
      await updateUserSettings(user.id, updatedSettings);
      console.log("Settings updated successfully in database");
    } catch (error) {
      console.error("Error in updateSettings:", error);
      throw error;
    }
  };

  const handleLogoChange = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file && user?.id) {
      try {
        console.log("Starting logo upload for file:", file.name);
        const publicUrl = await handleLogoUpload(file, user.id);
        console.log("Logo uploaded successfully, received URL:", publicUrl);
        setLogoPreview(publicUrl);
        console.log("Logo preview state updated with URL:", publicUrl);
        await updateSettings({ logo_url: publicUrl });
        console.log("Settings updated with new logo URL");
      } catch (error) {
        console.error("Error uploading logo:", error);
        throw error;
      }
    } else {
      console.log("No file selected or no user ID available");
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