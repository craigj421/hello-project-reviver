import { Card } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { PropertyDetails } from "./types";

interface OtherCostsProps {
  details: PropertyDetails;
  onInputChange: (field: keyof PropertyDetails, value: string | number | boolean) => void;
}

export const OtherCosts = ({ details, onInputChange }: OtherCostsProps) => {
  return (
    <Card className="p-4">
      <h3 className="text-lg font-semibold mb-4">Other Costs</h3>
      <div className="space-y-4">
        <div>
          <Label htmlFor="homeWarranty">Home Warranty</Label>
          <Input
            id="homeWarranty"
            type="number"
            value={details.homeWarranty || ""}
            onChange={(e) => onInputChange("homeWarranty", parseFloat(e.target.value) || 0)}
            placeholder="Enter home warranty cost"
          />
        </div>
        <div>
          <Label htmlFor="buyersClosingCost">Buyer's Closing Cost</Label>
          <Input
            id="buyersClosingCost"
            type="number"
            value={details.buyersClosingCost || ""}
            onChange={(e) => onInputChange("buyersClosingCost", parseFloat(e.target.value) || 0)}
            placeholder="Enter buyer's closing cost"
          />
        </div>
        <div>
          <Label htmlFor="repairs">Repairs</Label>
          <Input
            id="repairs"
            type="number"
            value={details.repairs || ""}
            onChange={(e) => onInputChange("repairs", parseFloat(e.target.value) || 0)}
            placeholder="Enter repair costs"
          />
        </div>
      </div>
    </Card>
  );
};