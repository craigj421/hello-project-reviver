import { PropertyDetails } from "../types";

interface ClosingCostsSectionProps {
  details: PropertyDetails;
  visible: boolean;
  formatCurrency: (amount: number) => string;
}

export const ClosingCostsSection = ({ details, visible, formatCurrency }: ClosingCostsSectionProps) => {
  if (!visible) return null;

  return (
    <div className="space-y-2">
      <h2 className="font-semibold">Estimated Closing Costs:</h2>
      <div className="space-y-1 pl-4">
        <div className="flex justify-between">
          <span>Doc Stamps on Deed:</span>
          <span>{formatCurrency(details.docStampsDeed)}</span>
        </div>
        <div className="flex justify-between">
          <span>Owner's Title Insurance:</span>
          <span>{formatCurrency(details.ownersTitleInsurance)}</span>
        </div>
        <div className="flex justify-between">
          <span>Taxes Approx:</span>
          <span>{formatCurrency(details.taxesApprox)}</span>
        </div>
      </div>
    </div>
  );
};