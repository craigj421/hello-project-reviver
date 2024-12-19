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
    let total = 0;
    
    if (selectedSections.closingCosts) {
      total += details.taxesApprox + details.docStampsDeed + details.ownersTitleInsurance;
    }
    
    if (selectedSections.additionalFees) {
      total += details.complianceAudit + details.serviceTech + details.termiteInspection;
    }
    
    if (selectedSections.additionalServices) {
      total += details.fhaVaFees + details.survey + details.hoa;
    }
    
    if (selectedSections.otherCosts) {
      total += details.homeWarranty + details.buyersClosingCost + details.repairs;
    }
    
    return total;
  };

  const calculateTotalMortgage = () => {
    if (!selectedSections.mortgageInfo) return 0;
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