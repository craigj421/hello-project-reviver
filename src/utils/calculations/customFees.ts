interface CustomFee {
  id: string;
  name: string;
  amount: number;
  is_percentage: boolean;
}

export const calculateCustomFees = (purchasePrice: number, customFees: CustomFee[]) => {
  const totalCustomFees = customFees.reduce((total, fee) => {
    const feeAmount = fee.is_percentage ? 
      (purchasePrice * fee.amount) / 100 : 
      fee.amount;
    console.log(`Calculating custom fee ${fee.name}:`, {
      isPercentage: fee.is_percentage,
      amount: fee.amount,
      calculatedAmount: feeAmount
    });
    return total + feeAmount;
  }, 0);

  console.log("Total custom fees calculated:", totalCustomFees);
  return totalCustomFees;
};