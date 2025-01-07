import { Card } from "@/components/ui/card";
import { PropertyDetails } from "./types";
import { calculateTitleInsuranceAmount } from "@/utils/calculations/titleInsurance";
import { TaxesInput } from "./closing-costs/TaxesInput";
import { DocStampsInput } from "./closing-costs/DocStampsInput";
import { TitleInsuranceInput } from "./closing-costs/TitleInsuranceInput";
import { SearchExamInput } from "./closing-costs/SearchExamInput";
import { useCalculatorSettings } from "@/hooks/useCalculatorSettings";
import { useEffect } from "react";

interface ClosingCostsProps {
  details: PropertyDetails;
  onInputChange: (field: keyof PropertyDetails, value: string | number | boolean) => void;
}

export const ClosingCosts = ({ details, onInputChange }: ClosingCostsProps) => {
  const { titleRates } = useCalculatorSettings();

  useEffect(() => {
    if (details.purchasePrice > 0 && titleRates.length > 0) {
      const titleInsurance = calculateTitleInsuranceAmount(details.purchasePrice, titleRates);
      console.log("Updating title insurance amount:", titleInsurance);
      onInputChange("ownersTitleInsurance", titleInsurance);
    }
  }, [details.purchasePrice, titleRates, onInputChange]);

  return (
    <Card className="p-4">
      <h3 className="text-lg font-semibold mb-4">Closing Costs</h3>
      <div className="space-y-4">
        <TaxesInput details={details} onInputChange={onInputChange} />
        <DocStampsInput details={details} onInputChange={onInputChange} />
        <TitleInsuranceInput details={details} onInputChange={onInputChange} />
        <SearchExamInput details={details} onInputChange={onInputChange} />
      </div>
    </Card>
  );
};