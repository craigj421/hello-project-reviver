import { PropertyDetails } from "../types";
import { 
  calculateTotalClosingCosts,
  calculateNetProceeds
} from "@/utils/netProceedsCalculations";

interface NetProceedsSectionProps {
  details: PropertyDetails;
  selectedSections: {
    propertyInfo: boolean;
    closingCosts: boolean;
    mortgageInfo: boolean;
    additionalFees: boolean;
    additionalServices: boolean;
    otherCosts: boolean;
  };
  formatCurrency: (amount: number) => string;
}

export const NetProceedsSection = ({ details, selectedSections, formatCurrency }: NetProceedsSectionProps) => {
  const totalClosingCosts = calculateTotalClosingCosts(details);
  const netProceeds = calculateNetProceeds(
    details.purchasePrice,
    totalClosingCosts,
    details.firstMortgage,
    details.secondMortgage
  );

  return (
    <div className="mt-8 pt-4 border-t space-y-4">
      <div className="flex justify-between items-center text-base">
        <span className="font-medium">Commission Rate:</span>
        <span>{details.commissionRate}%</span>
      </div>
      <div className="flex justify-between items-center text-base">
        <span className="font-medium">Total Commission:</span>
        <span>{formatCurrency(details.commission)}</span>
      </div>
      <div className="flex justify-between items-center text-base">
        <span className="font-medium">Total Closing Costs:</span>
        <span>{formatCurrency(totalClosingCosts)}</span>
      </div>
      <div className="flex justify-between items-center text-base">
        <span className="font-medium">Total Mortgage:</span>
        <span>{formatCurrency(details.firstMortgage + details.secondMortgage)}</span>
      </div>
      <div className="flex justify-between items-center text-xl font-bold pt-4 border-t">
        <span>Net Proceeds to Seller:</span>
        <span>{formatCurrency(netProceeds)}</span>
      </div>
    </div>
  );
};