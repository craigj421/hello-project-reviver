import { Label } from "@/components/ui/label";
import { TitleRate } from "@/hooks/settingsTypes";
import { TitleRateForm } from "./title-insurance/TitleRateForm";
import { TitleRatesTable } from "./title-insurance/TitleRatesTable";

interface TitleInsuranceSectionProps {
  rates: TitleRate[];
  onRatesChange: (rates: TitleRate[]) => void;
}

export const TitleInsuranceSection = ({ rates, onRatesChange }: TitleInsuranceSectionProps) => {
  const handleAddRate = (newRate: TitleRate) => {
    console.log("Adding new rate:", newRate);
    onRatesChange([...rates, newRate]);
  };

  const handleDeleteRate = (index: number) => {
    console.log("Deleting rate at index:", index);
    const updatedRates = rates.filter((_, i) => i !== index);
    onRatesChange(updatedRates);
  };

  return (
    <div className="space-y-4">
      <Label>Title Insurance Rates</Label>
      <TitleRatesTable rates={rates} onDelete={handleDeleteRate} />
      <TitleRateForm onAddRate={handleAddRate} />
    </div>
  );
};