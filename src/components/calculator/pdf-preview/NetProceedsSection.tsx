import { PropertyDetails } from "../types";

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
  const calculateTotalClosingCosts = () => {
    return (
      details.taxesApprox +
      details.docStampsDeed +
      details.ownersTitleInsurance +
      details.complianceAudit +
      details.serviceTech +
      details.termiteInspection +
      details.fhaVaFees +
      details.survey +
      details.hoa +
      details.homeWarranty +
      details.buyersClosingCost +
      details.repairs
    );
  };

  const calculateTotalMortgage = () => {
    return details.firstMortgage + details.secondMortgage;
  };

  const calculateNetProceeds = () => {
    return details.purchasePrice - calculateTotalClosingCosts() - calculateTotalMortgage();
  };

  return (
    <div className="mt-8 pt-4 border-t">
      <div className="flex justify-between items-center text-xl font-bold">
        <span>Net Proceeds to Seller:</span>
        <span>{formatCurrency(calculateNetProceeds())}</span>
      </div>
    </div>
  );
};