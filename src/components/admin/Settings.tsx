import { Card } from "@/components/ui/card";
import { useToast } from "@/components/ui/use-toast";
import { useSettings } from "@/hooks/useSettings";
import { useAuth } from "@/contexts/AuthContext";
import { Skeleton } from "@/components/ui/skeleton";
import { SettingsContent } from "./settings/SettingsContent";

export const Settings = () => {
  const { toast } = useToast();
  const { settings, updateSettings, handleLogoChange, logoPreview, loading } = useSettings();
  const { signOut } = useAuth();

  const handleSave = async () => {
    try {
      console.log("Saving settings with logo URL:", logoPreview);
      const settingsToUpdate = {
        ...settings,
        logo_url: logoPreview || settings.logo_url
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
      <SettingsContent 
        settings={settings}
        updateSettings={updateSettings}
        handleLogoChange={handleLogoChange}
        logoPreview={logoPreview}
        onSave={handleSave}
        onSignOut={signOut}
      />
    </Card>
  );
};