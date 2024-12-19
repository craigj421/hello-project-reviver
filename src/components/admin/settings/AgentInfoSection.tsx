import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

interface AgentInfoSectionProps {
  agentName: string;
  commission: string;
  onSettingChange: (key: string, value: any) => void;
}

export const AgentInfoSection = ({ agentName, commission, onSettingChange }: AgentInfoSectionProps) => {
  return (
    <>
      <div className="space-y-2">
        <Label htmlFor="agentName">Agent Name</Label>
        <Input 
          id="agentName" 
          value={agentName}
          onChange={(e) => onSettingChange("agentName", e.target.value)}
          placeholder="Enter agent name"
        />
      </div>

      <div className="space-y-2">
        <Label htmlFor="commission">Commission Rate (%)</Label>
        <Input 
          id="commission" 
          type="number"
          value={commission}
          onChange={(e) => onSettingChange("commission", e.target.value)}
          placeholder="Enter commission rate"
        />
      </div>
    </>
  );
};