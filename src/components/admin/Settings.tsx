import { Card } from "@/components/ui/card";
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useState } from "react";
import { Upload } from "lucide-react";
import { useToast } from "@/components/ui/use-toast";

// Move US_STATES to a separate constant file if it grows
const US_STATES = [
  "Alabama", "Alaska", "Arizona", "Arkansas", "California", "Colorado", "Connecticut", 
  "Delaware", "Florida", "Georgia", "Hawaii", "Idaho", "Illinois", "Indiana", "Iowa", 
  "Kansas", "Kentucky", "Louisiana", "Maine", "Maryland", "Massachusetts", "Michigan", 
  "Minnesota", "Mississippi", "Missouri", "Montana", "Nebraska", "Nevada", "New Hampshire", 
  "New Jersey", "New Mexico", "New York", "North Carolina", "North Dakota", "Ohio", 
  "Oklahoma", "Oregon", "Pennsylvania", "Rhode Island", "South Carolina", "South Dakota", 
  "Tennessee", "Texas", "Utah", "Vermont", "Virginia", "Washington", "West Virginia", 
  "Wisconsin", "Wyoming"
];

// Create a localStorage key for settings
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
    };
  });

  const [logoPreview, setLogoPreview] = useState<string | null>(null);

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
        <div className="space-y-2">
          <Label htmlFor="agentName">Agent Name</Label>
          <Input 
            id="agentName" 
            value={settings.agentName}
            onChange={(e) => setSettings(prev => ({ ...prev, agentName: e.target.value }))}
            placeholder="Enter agent name"
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor="commission">Commission Rate (%)</Label>
          <Input 
            id="commission" 
            type="number"
            value={settings.commission}
            onChange={(e) => setSettings(prev => ({ ...prev, commission: e.target.value }))}
            placeholder="Enter commission rate"
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor="state">State (for Title Insurance)</Label>
          <Select 
            value={settings.state} 
            onValueChange={(value) => {
              console.log("State changed to:", value);
              setSettings(prev => ({ ...prev, state: value }));
            }}
          >
            <SelectTrigger>
              <SelectValue placeholder="Select state" />
            </SelectTrigger>
            <SelectContent>
              {US_STATES.map((state) => (
                <SelectItem key={state} value={state}>
                  {state}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        <div className="space-y-2">
          <Label>Company Logo</Label>
          <div className="flex flex-col items-center p-4 border-2 border-dashed rounded-md">
            {logoPreview ? (
              <div className="mb-4">
                <img 
                  src={logoPreview} 
                  alt="Logo preview" 
                  className="max-w-[200px] max-h-[200px] object-contain"
                />
              </div>
            ) : (
              <div className="w-32 h-32 bg-gray-100 flex items-center justify-center rounded-md mb-4">
                <Upload className="w-8 h-8 text-gray-400" />
              </div>
            )}
            <Input
              id="logo"
              type="file"
              accept="image/*"
              onChange={handleLogoChange}
              className="hidden"
            />
            <Label
              htmlFor="logo"
              className="cursor-pointer inline-flex items-center px-4 py-2 bg-primary text-primary-foreground rounded-md hover:bg-primary/90"
            >
              {logoPreview ? "Change Logo" : "Upload Logo"}
            </Label>
          </div>
        </div>

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
