import { useEffect } from "react";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card } from "@/components/ui/card";
import { Switch } from "@/components/ui/switch";
import { PropertyDetails } from "./types";
import { calculateTitleInsurance } from "@/utils/titleInsurance";

interface ClosingCostsProps {
  details: PropertyDetails;
  onInputChange: (field: keyof PropertyDetails, value: string | number | boolean) => void;
}

export const ClosingCosts = ({ details, onInputChange }: ClosingCostsProps) => {
  useEffect(() => {
    if (details.purchasePrice > 0) {
      // Get the state from localStorage
      const savedSettings = localStorage.getItem('agent_settings');
      const settings = savedSettings ? JSON.parse(savedSettings) : { state: 'Florida' };
      
      console.log("Calculating title insurance for state:", settings.state);
      const titleInsurance = calculateTitleInsurance(details.purchasePrice, settings.state);
      console.log("Updating title insurance amount:", titleInsurance);
      onInputChange("ownersTitleInsurance", titleInsurance);
    }
  }, [details.purchasePrice, onInputChange]);

  useEffect(() => {
    const savedSettings = localStorage.getItem('agent_settings');
    if (savedSettings) {
      const settings = JSON.parse(savedSettings);
      if (settings.searchExamClosingFee) {
        console.log("Setting default Search/Exam/Closing Fee:", settings.searchExamClosingFee);
        onInputChange("searchExamClosingFee", parseFloat(settings.searchExamClosingFee));
      }
    }
  }, [onInputChange]);

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
            readOnly
            className="bg-gray-100"
            placeholder="Automatically calculated"
          />
        </div>
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