import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { PropertyDetails } from "../types";

interface TitleInsuranceInputProps {
  details: PropertyDetails;
  onInputChange: (field: keyof PropertyDetails, value: boolean) => void;
}

export const TitleInsuranceInput = ({ details, onInputChange }: TitleInsuranceInputProps) => {
  return (
    <div className="space-y-2">
      <div>
        <Label htmlFor="ownersTitleInsurance">Owner's Title Insurance</Label>
        <Input
          id="ownersTitleInsurance"
          type="number"
          value={details.ownersTitleInsurance || ""}
          readOnly
          className="bg-gray-100"
          placeholder="Automatically calculated"
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
  );
};