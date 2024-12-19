import { useState } from "react";

const SETTINGS_STORAGE_KEY = 'agent_settings';

export interface Settings {
  emailNotifications: boolean;
  darkMode: boolean;
  maintenanceMode: boolean;
  apiKey: string;
  agentName: string;
  commission: string;
  state: string;
  logo: File | null;
  propertyTaxRate: string;
}

type SettingsKey = keyof Settings;

export const useSettings = () => {
  const [settings, setSettings] = useState<Settings>(() => {
    const savedSettings = localStorage.getItem(SETTINGS_STORAGE_KEY);
    return savedSettings ? JSON.parse(savedSettings) : {
      emailNotifications: false,
      darkMode: false,
      maintenanceMode: false,
      apiKey: "sk_test_123456789",
      agentName: "",
      commission: "",
      state: "Florida",
      logo: null,
      propertyTaxRate: "",
    };
  });

  const [logoPreview, setLogoPreview] = useState<string | null>(null);

  const updateSettings = (keyOrPartial: SettingsKey | Partial<Settings>, value?: any) => {
    if (typeof keyOrPartial === 'object') {
      setSettings(prev => ({
        ...prev,
        ...keyOrPartial,
      }));
      localStorage.setItem(SETTINGS_STORAGE_KEY, JSON.stringify({
        ...settings,
        ...keyOrPartial,
      }));
    } else {
      setSettings(prev => ({
        ...prev,
        [keyOrPartial]: value,
      }));
      localStorage.setItem(SETTINGS_STORAGE_KEY, JSON.stringify({
        ...settings,
        [keyOrPartial]: value,
      }));
    }
  };

  const handleLogoChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      setSettings(prev => ({ ...prev, logo: file }));
      const reader = new FileReader();
      reader.onloadend = () => {
        setLogoPreview(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  return {
    settings,
    updateSettings,
    handleLogoChange,
    logoPreview,
  };
};