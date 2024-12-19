import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";

interface ToggleSectionProps {
  settings: {
    emailNotifications: boolean;
    darkMode: boolean;
    maintenanceMode: boolean;
  };
  onToggle: (key: string) => void;
}

export const ToggleSection = ({ settings, onToggle }: ToggleSectionProps) => {
  return (
    <>
      <div className="flex items-center justify-between">
        <Label htmlFor="emailNotifications">Email Notifications</Label>
        <Switch 
          id="emailNotifications" 
          checked={settings.emailNotifications}
          onCheckedChange={() => onToggle("emailNotifications")}
        />
      </div>

      <div className="flex items-center justify-between">
        <Label htmlFor="darkMode">Dark Mode</Label>
        <Switch 
          id="darkMode" 
          checked={settings.darkMode}
          onCheckedChange={() => onToggle("darkMode")}
        />
      </div>

      <div className="flex items-center justify-between">
        <Label htmlFor="maintenanceMode">Maintenance Mode</Label>
        <Switch 
          id="maintenanceMode" 
          checked={settings.maintenanceMode}
          onCheckedChange={() => onToggle("maintenanceMode")}
        />
      </div>
    </>
  );
};