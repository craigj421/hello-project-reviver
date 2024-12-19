export const calculateTitleInsurance = (details: {
  sellerPayingTitle: boolean;
  ownersTitleInsurance: number;
}) => {
  const titleInsuranceAmount = details.sellerPayingTitle ? details.ownersTitleInsurance : 0;
  console.log("Title insurance calculation:", {
    sellerPayingTitle: details.sellerPayingTitle,
    ownersTitleInsurance: details.ownersTitleInsurance,
    finalAmount: titleInsuranceAmount
  });
  return titleInsuranceAmount;
};

export const calculateCommission = (purchasePrice: number, commissionRate: number) => {
  return (purchasePrice * commissionRate) / 100;
};

export const calculateTotalClosingCosts = (details: {
  taxesApprox: number;
  docStampsDeed: number;
  ownersTitleInsurance: number;
  sellerPayingTitle: boolean;
  commission: number;
  complianceAudit: number;
  serviceTech: number;
  termiteInspection: number;
  fhaVaFees: number;
  survey: number;
  hoa: number;
  homeWarranty: number;
  buyersClosingCost: number;
  repairs: number;
  searchExamClosingFee: number;
}) => {
  const titleInsuranceAmount = calculateTitleInsurance(details);
  
  const total = 
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
    details.searchExamClosingFee;

  console.log("Total Closing Costs Breakdown:", {
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

export const calculateNetProceeds = (
  purchasePrice: number,
  totalClosingCosts: number,
  firstMortgage: number,
  secondMortgage: number
) => {
  const totalMortgages = firstMortgage + secondMortgage;
  const netProceeds = purchasePrice - totalClosingCosts - totalMortgages;

  console.log("Net Proceeds Calculation:", {
    purchasePrice,
    totalClosingCosts,
    totalMortgages,
    netProceeds
  });

  return netProceeds;
};