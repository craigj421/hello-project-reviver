import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { useToast } from "@/components/ui/use-toast";
import { AgentInfoSection } from "./settings/AgentInfoSection";
import { StateSection } from "./settings/StateSection";
import { LogoSection } from "./settings/LogoSection";
import { ToggleSection } from "./settings/ToggleSection";
import { ApiSection } from "./settings/ApiSection";
import { TaxSection } from "./settings/TaxSection";
import { useSettings } from "@/hooks/useSettings";

export const Settings = () => {
  const { toast } = useToast();
  const { settings, updateSettings, handleLogoChange, logoPreview } = useSettings();

  const handleSave = () => {
    console.log("Saving settings:", settings);
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
          onSettingChange={(key: string, value: any) => updateSettings(key as keyof typeof settings, value)}
        />

        <StateSection 
          state={settings.state}
          onStateChange={(value) => updateSettings("state", value)}
        />

        <TaxSection
          propertyTaxRate={settings.propertyTaxRate}
          searchExamClosingFee={settings.searchExamClosingFee}
          onSettingChange={(key: string, value: any) => updateSettings(key as keyof typeof settings, value)}
        />

        <LogoSection 
          logoPreview={logoPreview}
          onLogoChange={handleLogoChange}
        />

        <ToggleSection 
          settings={settings}
          onToggle={(key) => updateSettings(key as keyof typeof settings, !settings[key as keyof typeof settings])}
        />

        <ApiSection 
          apiKey={settings.apiKey}
          onApiKeyChange={(value) => updateSettings("apiKey", value)}
        />

        <Button onClick={handleSave} className="w-full">
          Save Settings
        </Button>
      </div>
    </Card>
  );
};