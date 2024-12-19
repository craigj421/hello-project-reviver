import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { useState } from "react";
import { useToast } from "@/components/ui/use-toast";
import { AgentInfoSection } from "./settings/AgentInfoSection";
import { StateSection } from "./settings/StateSection";
import { LogoSection } from "./settings/LogoSection";
import { ToggleSection } from "./settings/ToggleSection";
import { ApiSection } from "./settings/ApiSection";
import { TaxSection } from "./settings/TaxSection";

const SETTINGS_STORAGE_KEY = 'agent_settings';

export const Settings = () => {
  const { toast } = useToast();
  const [settings, setSettings] = useState(() => {
    const savedSettings = localStorage.getItem(SETTINGS_STORAGE_KEY);
    return savedSettings ? JSON.parse(savedSettings) : {
      emailNotifications: false,
      darkMode: false,
      maintenanceMode: false,
      apiKey: "sk_test_123456789",
      agentName: "",
      commission: "",
      state: "Florida",
      logo: null as File | null,
      propertyTaxRate: "",
    };
  });

  const [logoPreview, setLogoPreview] = useState<string | null>(null);

  const handleSettingChange = (key: string, value: any) => {
    setSettings(prev => ({
      ...prev,
      [key]: value,
    }));
  };

  const handleToggle = (key: keyof typeof settings) => {
    setSettings((prev) => ({
      ...prev,
      [key]: !prev[key],
    }));
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

  const handleSave = () => {
    console.log("Saving settings:", settings);
    localStorage.setItem(SETTINGS_STORAGE_KEY, JSON.stringify(settings));
    toast({
      title: "Settings saved",
      description: "Your settings have been saved successfully.",
    });
  };

  return (
    <Card className="p-6">
      <h2 className="text-xl font-semibold mb-4">Settings</h2>
      <div className="space-y-6">
        <AgentInfoSection 
          agentName={settings.agentName}
          commission={settings.commission}
          onSettingChange={handleSettingChange}
        />

        <StateSection 
          state={settings.state}
          onStateChange={(value) => handleSettingChange("state", value)}
        />

        <TaxSection
          propertyTaxRate={settings.propertyTaxRate}
          onSettingChange={handleSettingChange}
        />

        <LogoSection 
          logoPreview={logoPreview}
          onLogoChange={handleLogoChange}
        />

        <ToggleSection 
          settings={settings}
          onToggle={handleToggle}
        />

        <ApiSection 
          apiKey={settings.apiKey}
          onApiKeyChange={(value) => handleSettingChange("apiKey", value)}
        />

        <Button onClick={handleSave} className="w-full">
          Save Settings
        </Button>
      </div>
    </Card>
  );
};