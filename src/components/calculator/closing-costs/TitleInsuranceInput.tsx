import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { PropertyDetails } from "../types";

interface TitleInsuranceInputProps {
  details: PropertyDetails;
}

export const TitleInsuranceInput = ({ details }: TitleInsuranceInputProps) => {
  return (
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
  );
};