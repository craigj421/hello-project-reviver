import { Card } from "@/components/ui/card";
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";

export const Settings = () => {
  return (
    <Card className="p-6">
      <h2 className="text-xl font-semibold mb-4">Settings</h2>
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <Label htmlFor="notifications">Email Notifications</Label>
          <Switch id="notifications" />
        </div>
        <div className="flex items-center justify-between">
          <Label htmlFor="darkMode">Dark Mode</Label>
          <Switch id="darkMode" />
        </div>
      </div>
    </Card>
  );
};