import { calculateTitleInsurance } from './titleInsurance';
import { calculateCustomFees } from './customFees';

interface ClosingCostsDetails {
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
}

interface CustomFee {
  id: string;
  name: string;
  amount: number;
  is_percentage: boolean;
}

export const calculateTotalClosingCosts = (
  details: ClosingCostsDetails,
  customFees: CustomFee[] = [],
  purchasePrice: number = 0
) => {
  const titleInsuranceAmount = calculateTitleInsurance(details);
  const totalCustomFees = calculateCustomFees(purchasePrice, customFees);
  
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
    details.searchExamClosingFee +
    totalCustomFees;

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
    customFees: totalCustomFees,
    total: total
  });

  return total;
};