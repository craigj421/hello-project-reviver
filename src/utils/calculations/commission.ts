export const calculateCommission = (purchasePrice: number, commissionRate: number) => {
  const commission = (purchasePrice * commissionRate) / 100;
  console.log("Commission calculation:", {
    purchasePrice,
    commissionRate,
    commission
  });
  return commission;
};