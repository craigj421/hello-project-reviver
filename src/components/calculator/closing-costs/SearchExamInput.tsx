import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { PropertyDetails } from "../types";

interface SearchExamInputProps {
  details: PropertyDetails;
  onInputChange: (field: keyof PropertyDetails, value: number) => void;
}

export const SearchExamInput = ({ details, onInputChange }: SearchExamInputProps) => {
  return (
    <div>
      <Label htmlFor="searchExamClosingFee">Search/Exam/Closing Fee</Label>
      <Input
        id="searchExamClosingFee"
        type="number"
        value={details.searchExamClosingFee || ""}
        onChange={(e) => onInputChange("searchExamClosingFee", parseFloat(e.target.value) || 0)}
        placeholder="Enter Search/Exam/Closing Fee"
      />
    </div>
  );
};