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