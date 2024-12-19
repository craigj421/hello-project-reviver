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
}

export const NetProceedsSection = ({ details, selectedSections }: NetProceedsSectionProps) => {
  const calculateTotalClosingCosts = () => {
    // Always include all costs in calculation, regardless of visibility
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
    // Always include all mortgage values in calculation
    return details.firstMortgage + details.secondMortgage;
  };

  const calculateNetProceeds = () => {
    return details.purchasePrice - calculateTotalClosingCosts() - calculateTotalMortgage();
  };

  return (
    <div className="flex justify-between font-bold text-lg pt-4 border-t">
      <span>Net Proceeds to Seller:</span>
      <span>${calculateNetProceeds().toLocaleString()}</span>
    </div>
  );
};