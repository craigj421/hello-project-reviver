import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { useToast } from "@/components/ui/use-toast";
import { AgentInfoSection } from "./settings/AgentInfoSection";
import { LogoSection } from "./settings/LogoSection";
import { ToggleSection } from "./settings/ToggleSection";
import { TaxSection } from "./settings/TaxSection";
import { TitleInsuranceSection } from "./settings/TitleInsuranceSection";
import { useSettings } from "@/hooks/useSettings";
import { useAuth } from "@/contexts/AuthContext";
import { LogOut } from "lucide-react";
import { Skeleton } from "@/components/ui/skeleton";

export const Settings = () => {
  const { toast } = useToast();
  const { settings, updateSettings, handleLogoChange, logoPreview, loading } = useSettings();
  const { signOut } = useAuth();

  const handleSave = async () => {
    try {
      console.log("Saving settings with logo URL:", logoPreview);
      const settingsToUpdate = {
        ...settings,
        logo_url: logoPreview || settings.logo_url // Use existing logo_url if no new preview
      };
      
      await updateSettings(settingsToUpdate);
      
      toast({
        title: "Settings saved",
        description: "Your settings have been saved successfully.",
      });
    } catch (error) {
      console.error("Error saving settings:", error);
      toast({
        title: "Error",
        description: "There was an error saving your settings.",
        variant: "destructive",
      });
    }
  };

  if (loading) {
    return (
      <Card className="p-6">
        <h2 className="text-xl font-semibold mb-4">Settings</h2>
        <div className="space-y-6">
          <Skeleton className="h-[200px]" />
          <Skeleton className="h-[150px]" />
          <Skeleton className="h-[100px]" />
        </div>
      </Card>
    );
  }

  return (
    <Card className="p-6">
      <h2 className="text-xl font-semibold mb-4">Settings</h2>
      <div className="space-y-6">
        <AgentInfoSection 
          agentName={settings.agentName}
          commission={settings.commission}
          onSettingChange={(key: string, value: any) => updateSettings({ [key]: value })}
        />

        <TitleInsuranceSection
          rates={settings.titleInsuranceRates}
          onRatesChange={(rates) => updateSettings({ titleInsuranceRates: rates })}
        />

        <TaxSection
          propertyTaxRate={settings.propertyTaxRate}
          searchExamClosingFee={settings.searchExamClosingFee}
          onSettingChange={(key: string, value: any) => updateSettings({ [key]: value })}
        />

        <LogoSection 
          logoPreview={settings.logo_url || logoPreview}
          onLogoChange={handleLogoChange}
        />

        <ToggleSection 
          settings={settings}
          onToggle={(key) => updateSettings({ [key]: !settings[key as keyof typeof settings] })}
        />

        <Button onClick={handleSave} className="w-full">
          Save Settings
        </Button>

        <div className="border-t pt-4">
          <Button 
            variant="destructive" 
            className="w-full" 
            onClick={signOut}
          >
            <LogOut className="mr-2" />
            Sign Out
          </Button>
        </div>
      </div>
    </Card>
  );
};