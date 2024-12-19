import { PropertyDetails } from "../types";

interface MortgageSectionProps {
  details: PropertyDetails;
  visible: boolean;
  formatCurrency: (amount: number) => string;
}

export const MortgageSection = ({ details, visible, formatCurrency }: MortgageSectionProps) => {
  if (!visible) return null;

  return (
    <div className="space-y-2">
      <div className="flex justify-between">
        <span>First Mortgage:</span>
        <span>{formatCurrency(details.firstMortgage)}</span>
      </div>
      <div className="flex justify-between">
        <span>Second Mortgage:</span>
        <span>{formatCurrency(details.secondMortgage)}</span>
      </div>
      <div className="flex justify-between font-semibold pt-2 border-t">
        <span>Outstanding Loan + Mortgage costs:</span>
        <span>{formatCurrency(details.firstMortgage + details.secondMortgage)}</span>
      </div>
    </div>
  );
};