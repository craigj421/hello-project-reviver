import { useEffect } from "react";
import { Card } from "@/components/ui/card";
import { PropertyDetails } from "./types";
import { calculateTitleInsurance } from "@/utils/titleInsurance";
import { TaxesInput } from "./closing-costs/TaxesInput";
import { DocStampsInput } from "./closing-costs/DocStampsInput";
import { TitleInsuranceInput } from "./closing-costs/TitleInsuranceInput";
import { SearchExamInput } from "./closing-costs/SearchExamInput";
import { SellerTitleSwitch } from "./closing-costs/SellerTitleSwitch";

interface ClosingCostsProps {
  details: PropertyDetails;
  onInputChange: (field: keyof PropertyDetails, value: string | number | boolean) => void;
}

export const ClosingCosts = ({ details, onInputChange }: ClosingCostsProps) => {
  useEffect(() => {
    if (details.purchasePrice > 0) {
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
        <TaxesInput details={details} onInputChange={onInputChange} />
        <DocStampsInput details={details} onInputChange={onInputChange} />
        <TitleInsuranceInput details={details} />
        <SearchExamInput details={details} onInputChange={onInputChange} />
        <SellerTitleSwitch details={details} onInputChange={onInputChange} />
      </div>
    </Card>
  );
};