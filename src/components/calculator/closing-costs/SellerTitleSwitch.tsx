import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";
import { PropertyDetails } from "../types";

interface SellerTitleSwitchProps {
  details: PropertyDetails;
  onInputChange: (field: keyof PropertyDetails, value: boolean) => void;
}

export const SellerTitleSwitch = ({ details, onInputChange }: SellerTitleSwitchProps) => {
  return (
    <div className="flex items-center space-x-2">
      <Switch
        id="sellerPayingTitle"
        checked={details.sellerPayingTitle}
        onCheckedChange={(checked) => onInputChange("sellerPayingTitle", checked)}
      />
      <Label htmlFor="sellerPayingTitle">Is Seller Paying Title?</Label>
    </div>
  );
};