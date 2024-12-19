import { PropertyDetails } from "../types";

interface AdditionalServicesSectionProps {
  details: PropertyDetails;
  visible: boolean;
  formatCurrency: (amount: number) => string;
}

export const AdditionalServicesSection = ({ details, visible, formatCurrency }: AdditionalServicesSectionProps) => {
  if (!visible) return null;

  return (
    <div className="space-y-2">
      <h2 className="font-semibold">Additional Services:</h2>
      <div className="space-y-1 pl-4">
        <div className="flex justify-between">
          <span>FHA/VA Fees:</span>
          <span>{formatCurrency(details.fhaVaFees)}</span>
        </div>
        <div className="flex justify-between">
          <span>Survey:</span>
          <span>{formatCurrency(details.survey)}</span>
        </div>
        <div className="flex justify-between">
          <span>HOA:</span>
          <span>{formatCurrency(details.hoa)}</span>
        </div>
      </div>
    </div>
  );
};