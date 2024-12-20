interface TitleInsuranceDetails {
  sellerPayingTitle: boolean;
  ownersTitleInsurance: number;
}

interface TitleRate {
  min_amount: number;
  max_amount: number;
  rate_per_thousand: number;
}

export const calculateTitleInsurance = (details: TitleInsuranceDetails) => {
  const titleInsuranceAmount = details.sellerPayingTitle ? details.ownersTitleInsurance : 0;
  console.log("Title insurance calculation:", {
    sellerPayingTitle: details.sellerPayingTitle,
    ownersTitleInsurance: details.ownersTitleInsurance,
    finalAmount: titleInsuranceAmount
  });
  return titleInsuranceAmount;
};

export const calculateTitleInsuranceAmount = (purchasePrice: number, rates: TitleRate[]): number => {
  if (!rates.length) {
    console.log('No title insurance rates available');
    return 0;
  }

  console.log('Calculating title insurance with rates:', rates);
  let insurance = 0;
  let remainingPrice = purchasePrice;

  // Sort rates by minAmount to ensure proper calculation order
  const sortedRates = [...rates].sort((a, b) => a.min_amount - b.min_amount);

  for (const rate of sortedRates) {
    if (remainingPrice <= 0) break;
    
    if (purchasePrice >= rate.min_amount) {
      const rangeAmount = Math.min(
        remainingPrice,
        rate.max_amount === 0 ? remainingPrice : rate.max_amount - rate.min_amount
      );

      const rangeInsurance = (rangeAmount * rate.rate_per_thousand) / 1000;
      insurance += rangeInsurance;
      remainingPrice -= rangeAmount;

      console.log(`Range ${rate.min_amount}-${rate.max_amount}: Added ${rangeInsurance}`);
    }
  }

  console.log(`Final title insurance amount: ${insurance}`);
  return Math.round(insurance * 100) / 100;
};