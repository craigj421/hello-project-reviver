import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { PropertyDetails } from "../types";

interface DocStampsInputProps {
  details: PropertyDetails;
  onInputChange: (field: keyof PropertyDetails, value: number) => void;
}

export const DocStampsInput = ({ details, onInputChange }: DocStampsInputProps) => {
  return (
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
  );
};