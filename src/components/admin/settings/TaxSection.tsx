import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

interface TaxSectionProps {
  propertyTaxRate: string;
  searchExamClosingFee: string;
  onSettingChange: (key: string, value: any) => void;
}

export const TaxSection = ({ propertyTaxRate, searchExamClosingFee, onSettingChange }: TaxSectionProps) => {
  return (
    <div className="space-y-4">
      <div className="space-y-2">
        <Label htmlFor="propertyTaxRate">Property Tax Rate (%)</Label>
        <Input
          id="propertyTaxRate"
          type="number"
          step="0.01"
          value={propertyTaxRate}
          onChange={(e) => {
            console.log("Property tax rate changed to:", e.target.value);
            onSettingChange("propertyTaxRate", e.target.value);
          }}
          placeholder="Enter property tax rate"
        />
        <p className="text-sm text-muted-foreground">
          This rate will be used to automatically calculate property taxes in the Net Proceeds Calculator.
        </p>
      </div>

      <div className="space-y-2">
        <Label htmlFor="searchExamClosingFee">Search/Exam/Closing Fee ($)</Label>
        <Input
          id="searchExamClosingFee"
          type="number"
          step="0.01"
          value={searchExamClosingFee}
          onChange={(e) => {
            console.log("Search/Exam/Closing Fee changed to:", e.target.value);
            onSettingChange("searchExamClosingFee", e.target.value);
          }}
          placeholder="Enter default Search/Exam/Closing Fee"
        />
        <p className="text-sm text-muted-foreground">
          This amount will be automatically populated in the Net Proceeds Calculator.
        </p>
      </div>
    </div>
  );
};