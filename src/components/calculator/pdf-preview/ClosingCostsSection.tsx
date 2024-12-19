import { PropertyDetails } from "../types";

interface ClosingCostsSectionProps {
  details: PropertyDetails;
  visible: boolean;
  formatCurrency: (amount: number) => string;
}

export const ClosingCostsSection = ({ details, visible, formatCurrency }: ClosingCostsSectionProps) => {
  if (!visible) return null;

  return (
    <div className="space-y-2 border-b pb-4">
      <h2 className="font-semibold text-lg border-b pb-2 mb-3">Estimated Closing Costs:</h2>
      <div className="space-y-2 pl-4">
        <div className="flex justify-between items-center text-sm">
          <span className="text-gray-600">Doc Stamps on Deed:</span>
          <span className="font-medium">{formatCurrency(details.docStampsDeed)}</span>
        </div>
        <div className="flex justify-between items-center text-sm">
          <span className="text-gray-600">Owner's Title Insurance:</span>
          <span className="font-medium">{formatCurrency(details.ownersTitleInsurance)}</span>
        </div>
        <div className="flex justify-between items-center text-sm">
          <span className="text-gray-600">Taxes Approx:</span>
          <span className="font-medium">{formatCurrency(details.taxesApprox)}</span>
        </div>
      </div>
    </div>
  );
};