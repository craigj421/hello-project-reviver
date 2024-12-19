import { Card } from "@/components/ui/card";
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useState } from "react";

export const Settings = () => {
  const [settings, setSettings] = useState({
    emailNotifications: false,
    darkMode: false,
    maintenanceMode: false,
    apiKey: "sk_test_123456789",
  });

  const handleToggle = (key: keyof typeof settings) => {
    setSettings((prev) => ({
      ...prev,
      [key]: !prev[key],
    }));
  };

  const handleSave = () => {
    console.log("Saving settings:", settings);
    // Here you would typically save to your backend
  };

  return (
    <Card className="p-6">
      <h2 className="text-xl font-semibold mb-4">Settings</h2>
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <Label htmlFor="emailNotifications">Email Notifications</Label>
          <Switch 
            id="emailNotifications" 
            checked={settings.emailNotifications}
            onCheckedChange={() => handleToggle("emailNotifications")}
          />
        </div>
        <div className="flex items-center justify-between">
          <Label htmlFor="darkMode">Dark Mode</Label>
          <Switch 
            id="darkMode" 
            checked={settings.darkMode}
            onCheckedChange={() => handleToggle("darkMode")}
          />
        </div>
        <div className="flex items-center justify-between">
          <Label htmlFor="maintenanceMode">Maintenance Mode</Label>
          <Switch 
            id="maintenanceMode" 
            checked={settings.maintenanceMode}
            onCheckedChange={() => handleToggle("maintenanceMode")}
          />
        </div>
        <div className="space-y-2">
          <Label htmlFor="apiKey">API Key</Label>
          <Input 
            id="apiKey" 
            type="password" 
            value={settings.apiKey}
            onChange={(e) => setSettings(prev => ({ ...prev, apiKey: e.target.value }))}
          />
        </div>
        <Button onClick={handleSave} className="w-full">
          Save Settings
        </Button>
      </div>
    </Card>
  );
};