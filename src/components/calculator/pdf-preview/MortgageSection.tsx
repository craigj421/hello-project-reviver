import { PropertyDetails } from "../types";

interface MortgageSectionProps {
  details: PropertyDetails;
  visible: boolean;
  formatCurrency: (amount: number) => string;
}

export const MortgageSection = ({ details, visible, formatCurrency }: MortgageSectionProps) => {
  if (!visible) return null;

  return (
    <div className="space-y-2 border-b pb-4">
      <div className="space-y-2">
        <div className="flex justify-between items-center text-sm">
          <span className="text-gray-600">First Mortgage:</span>
          <span className="font-medium">{formatCurrency(details.firstMortgage)}</span>
        </div>
        <div className="flex justify-between items-center text-sm">
          <span className="text-gray-600">Second Mortgage:</span>
          <span className="font-medium">{formatCurrency(details.secondMortgage)}</span>
        </div>
        <div className="flex justify-between items-center pt-2 border-t text-sm font-semibold">
          <span>Outstanding Loan + Mortgage costs:</span>
          <span>{formatCurrency(details.firstMortgage + details.secondMortgage)}</span>
        </div>
      </div>
    </div>
  );
};