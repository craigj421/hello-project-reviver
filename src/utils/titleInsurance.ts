export interface TitleRate {
  minAmount: number;
  maxAmount: number;
  ratePerThousand: number;
}

export const calculateTitleInsurance = (purchasePrice: number, state: string = 'FL'): number => {
  console.log(`Calculating title insurance for ${state} with purchase price: ${purchasePrice}`);
  
  const savedSettings = localStorage.getItem('agent_settings');
  if (!savedSettings) {
    console.warn('No settings found in localStorage');
    return 0;
  }

  const settings = JSON.parse(savedSettings);
  const rates = settings.titleInsuranceRates;

  if (!rates || rates.length === 0) {
    console.warn('No title insurance rates found in settings');
    return 0;
  }

  console.log('Using title insurance rates:', rates);
  
  let insurance = 0;
  let remainingPrice = purchasePrice;

  // Sort rates by minAmount to ensure proper calculation order
  const sortedRates = [...rates].sort((a, b) => a.minAmount - b.minAmount);

  for (const rate of sortedRates) {
    if (remainingPrice <= 0) break;
    
    if (purchasePrice >= rate.minAmount) {
      const rangeAmount = Math.min(
        remainingPrice,
        rate.maxAmount === 0 ? remainingPrice : rate.maxAmount - rate.minAmount
      );

      const rangeInsurance = (rangeAmount * rate.ratePerThousand) / 1000;
      insurance += rangeInsurance;
      remainingPrice -= rangeAmount;

      console.log(`Range ${rate.minAmount}-${rate.maxAmount}: Added ${rangeInsurance}`);
    }
  }

  console.log(`Final title insurance amount: ${insurance}`);
  return Math.round(insurance * 100) / 100; // Round to 2 decimal places
};