import { PropertyDetails } from "../types";

interface AdditionalServicesSectionProps {
  details: PropertyDetails;
  visible: boolean;
  formatCurrency: (amount: number) => string;
}

export const AdditionalServicesSection = ({ details, visible, formatCurrency }: AdditionalServicesSectionProps) => {
  if (!visible) return null;

  return (
    <div className="space-y-2 border-b pb-4">
      <h2 className="font-semibold text-lg border-b pb-2 mb-3">Additional Services:</h2>
      <div className="space-y-2 pl-4">
        <div className="flex justify-between items-center text-sm">
          <span className="text-gray-600">FHA/VA Fees:</span>
          <span className="font-medium">{formatCurrency(details.fhaVaFees)}</span>
        </div>
        <div className="flex justify-between items-center text-sm">
          <span className="text-gray-600">Survey:</span>
          <span className="font-medium">{formatCurrency(details.survey)}</span>
        </div>
        <div className="flex justify-between items-center text-sm">
          <span className="text-gray-600">HOA:</span>
          <span className="font-medium">{formatCurrency(details.hoa)}</span>
        </div>
      </div>
    </div>
  );
};