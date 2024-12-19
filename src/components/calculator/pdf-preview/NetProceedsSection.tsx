import { PropertyDetails } from "../types";
import { 
  calculateTotalClosingCosts,
  calculateNetProceeds
} from "@/utils/netProceedsCalculations";

interface CustomFee {
  id: string;
  name: string;
  amount: number;
  is_percentage: boolean;
}

interface NetProceedsSectionProps {
  details: PropertyDetails;
  selectedSections: {
    propertyInfo: boolean;
    closingCosts: boolean;
    mortgageInfo: boolean;
    additionalFees: boolean;
    additionalServices: boolean;
    otherCosts: boolean;
    commissionInfo: boolean;
    customFees: boolean;
  };
  formatCurrency: (amount: number) => string;
  customFees: CustomFee[];
}

export const NetProceedsSection = ({ 
  details, 
  selectedSections, 
  formatCurrency,
  customFees 
}: NetProceedsSectionProps) => {
  const totalClosingCosts = calculateTotalClosingCosts(details, customFees, details.purchasePrice);
  const netProceeds = calculateNetProceeds(
    details.purchasePrice,
    totalClosingCosts,
    details.firstMortgage,
    details.secondMortgage
  );

  console.log("PDF Preview - Net Proceeds Calculation:", {
    purchasePrice: details.purchasePrice,
    totalClosingCosts,
    customFees,
    netProceeds
  });

  return (
    <div className="mt-8 pt-4 border-t space-y-4">
      {selectedSections.commissionInfo && (
        <>
          <div className="flex justify-between items-center text-base">
            <span className="font-medium">Commission Rate:</span>
            <span>{details.commissionRate}%</span>
          </div>
          <div className="flex justify-between items-center text-base">
            <span className="font-medium">Total Commission:</span>
            <span>{formatCurrency(details.commission)}</span>
          </div>
        </>
      )}
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