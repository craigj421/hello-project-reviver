import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";

interface ApiSectionProps {
  apiKey: string;
  onApiKeyChange: (value: string) => void;
}

export const ApiSection = ({ apiKey, onApiKeyChange }: ApiSectionProps) => {
  return (
    <div className="space-y-2">
      <Label htmlFor="apiKey">API Key</Label>
      <Input 
        id="apiKey" 
        type="password" 
        value={apiKey}
        onChange={(e) => onApiKeyChange(e.target.value)}
      />
    </div>
  );
};