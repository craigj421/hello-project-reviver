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
    const titleInsuranceAmount = details.sellerPayingTitle ? details.ownersTitleInsurance : 0;
    
    const total = (
      details.taxesApprox +
      details.docStampsDeed +
      titleInsuranceAmount +
      details.commission +
      details.complianceAudit +
      details.serviceTech +
      details.termiteInspection +
      details.fhaVaFees +
      details.survey +
      details.hoa +
      details.homeWarranty +
      details.buyersClosingCost +
      details.repairs +
      details.searchExamClosingFee
    );
    
    console.log("PDF Preview - Total Closing Costs Breakdown:", {
      taxesApprox: details.taxesApprox,
      docStampsDeed: details.docStampsDeed,
      ownersTitleInsurance: titleInsuranceAmount,
      titleInsuranceIncluded: details.sellerPayingTitle,
      commission: details.commission,
      complianceAudit: details.complianceAudit,
      serviceTech: details.serviceTech,
      termiteInspection: details.termiteInspection,
      fhaVaFees: details.fhaVaFees,
      survey: details.survey,
      hoa: details.hoa,
      homeWarranty: details.homeWarranty,
      buyersClosingCost: details.buyersClosingCost,
      repairs: details.repairs,
      searchExamClosingFee: details.searchExamClosingFee,
      total: total
    });
    
    return total;
  };

  const calculateTotalMortgage = () => {
    const total = details.firstMortgage + details.secondMortgage;
    console.log("PDF Preview - Total Mortgage:", {
      firstMortgage: details.firstMortgage,
      secondMortgage: details.secondMortgage,
      total: total
    });
    return total;
  };

  const calculateNetProceeds = () => {
    const totalClosingCosts = calculateTotalClosingCosts();
    const totalMortgage = calculateTotalMortgage();
    const netProceeds = details.purchasePrice - totalClosingCosts - totalMortgage;
    
    console.log("PDF Preview - Net Proceeds Calculation:", {
      purchasePrice: details.purchasePrice,
      totalClosingCosts,
      totalMortgage,
      netProceeds
    });
    
    return netProceeds;
  };

  return (
    <div className="mt-8 pt-4 border-t space-y-4">
      <div className="flex justify-between items-center text-base">
        <span className="font-medium">Total Closing Costs:</span>
        <span>{formatCurrency(calculateTotalClosingCosts())}</span>
      </div>
      <div className="flex justify-between items-center text-base">
        <span className="font-medium">Total Mortgage:</span>
        <span>{formatCurrency(calculateTotalMortgage())}</span>
      </div>
      <div className="flex justify-between items-center text-xl font-bold pt-4 border-t">
        <span>Net Proceeds to Seller:</span>
        <span>{formatCurrency(calculateNetProceeds())}</span>
      </div>
    </div>
  );
};