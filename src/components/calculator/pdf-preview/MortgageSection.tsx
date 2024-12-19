import { PropertyDetails } from "../types";

interface MortgageSectionProps {
  details: PropertyDetails;
  visible: boolean;
}

export const MortgageSection = ({ details, visible }: MortgageSectionProps) => {
  if (!visible) return null;

  return (
    <div className="space-y-2">
      <div className="flex justify-between">
        <span>First Mortgage:</span>
        <span>${details.firstMortgage.toLocaleString()}</span>
      </div>
      <div className="flex justify-between">
        <span>Second Mortgage:</span>
        <span>${details.secondMortgage.toLocaleString()}</span>
      </div>
      <div className="flex justify-between font-semibold pt-2 border-t">
        <span>Outstanding Loan + Mortgage costs:</span>
        <span>${(details.firstMortgage + details.secondMortgage).toLocaleString()}</span>
      </div>
    </div>
  );
};