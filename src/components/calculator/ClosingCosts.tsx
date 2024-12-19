import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card } from "@/components/ui/card";
import { Switch } from "@/components/ui/switch";
import { PropertyDetails } from "./types";

interface ClosingCostsProps {
  details: PropertyDetails;
  onInputChange: (field: keyof PropertyDetails, value: string | number | boolean) => void;
}

export const ClosingCosts = ({ details, onInputChange }: ClosingCostsProps) => {
  return (
    <Card className="p-4">
      <h3 className="text-lg font-semibold mb-4">Closing Costs</h3>
      <div className="space-y-4">
        <div>
          <Label htmlFor="taxesApprox">Taxes (Approximate)</Label>
          <Input
            id="taxesApprox"
            type="number"
            value={details.taxesApprox || ""}
            onChange={(e) => onInputChange("taxesApprox", parseFloat(e.target.value) || 0)}
            placeholder="Enter approximate taxes"
          />
        </div>
        <div>
          <Label htmlFor="docStampsDeed">Doc Stamps Deed</Label>
          <Input
            id="docStampsDeed"
            type="number"
            value={details.docStampsDeed || ""}
            onChange={(e) => onInputChange("docStampsDeed", parseFloat(e.target.value) || 0)}
            placeholder="Enter doc stamps deed"
          />
        </div>
        <div>
          <Label htmlFor="ownersTitleInsurance">Owner's Title Insurance</Label>
          <Input
            id="ownersTitleInsurance"
            type="number"
            value={details.ownersTitleInsurance || ""}
            onChange={(e) => onInputChange("ownersTitleInsurance", parseFloat(e.target.value) || 0)}
            placeholder="Enter owner's title insurance"
          />
        </div>
        <div className="flex items-center space-x-2">
          <Switch
            id="sellerPayingTitle"
            checked={details.sellerPayingTitle}
            onCheckedChange={(checked) => onInputChange("sellerPayingTitle", checked)}
          />
          <Label htmlFor="sellerPayingTitle">Is Seller Paying Title?</Label>
        </div>
      </div>
    </Card>
  );
};