import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { PropertyDetails } from "../types";

interface TaxesInputProps {
  details: PropertyDetails;
  onInputChange: (field: keyof PropertyDetails, value: number) => void;
}

export const TaxesInput = ({ details, onInputChange }: TaxesInputProps) => {
  return (
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
  );
};