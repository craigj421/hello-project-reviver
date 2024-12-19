import { Card } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { PropertyDetails } from "./types";

interface MortgageInformationProps {
  details: PropertyDetails;
  onInputChange: (field: keyof PropertyDetails, value: string | number | boolean) => void;
}

export const MortgageInformation = ({ details, onInputChange }: MortgageInformationProps) => {
  return (
    <Card className="p-4">
      <h3 className="text-lg font-semibold mb-4">Mortgage Information</h3>
      <div className="space-y-4">
        <div>
          <Label htmlFor="firstMortgage">First Mortgage ($)</Label>
          <Input
            id="firstMortgage"
            type="number"
            value={details.firstMortgage || ""}
            onChange={(e) => onInputChange("firstMortgage", parseFloat(e.target.value) || 0)}
            placeholder="Enter first mortgage amount"
          />
        </div>
        <div>
          <Label htmlFor="secondMortgage">Second Mortgage ($)</Label>
          <Input
            id="secondMortgage"
            type="number"
            value={details.secondMortgage || ""}
            onChange={(e) => onInputChange("secondMortgage", parseFloat(e.target.value) || 0)}
            placeholder="Enter second mortgage amount"
          />
        </div>
      </div>
    </Card>
  );
};