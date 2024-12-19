interface TitleRateRange {
  min: number;
  max: number;
  rate: number;
  minimumFee?: number;
}

interface StateRates {
  [key: string]: TitleRateRange[];
}

// Initial rates for Florida, can be expanded for other states
const STATE_TITLE_RATES: StateRates = {
  FL: [
    { min: 0, max: 100000, rate: 5.75, minimumFee: 100 },
    { min: 100000, max: 1000000, rate: 5.00 },
    { min: 1000000, max: 5000000, rate: 2.50 },
    { min: 5000000, max: 10000000, rate: 2.25 },
    { min: 10000000, max: Infinity, rate: 2.00 }
  ]
};

export const calculateTitleInsurance = (purchasePrice: number, state: string = 'FL'): number => {
  console.log(`Calculating title insurance for ${state} with purchase price: ${purchasePrice}`);
  
  const stateRates = STATE_TITLE_RATES[state];
  if (!stateRates) {
    console.warn(`No title insurance rates found for state: ${state}`);
    return 0;
  }

  let insurance = 0;
  let remainingPrice = purchasePrice;

  for (const range of stateRates) {
    if (remainingPrice <= 0) break;

    const rangeAmount = Math.min(
      remainingPrice,
      range.max === Infinity ? remainingPrice : range.max - range.min
    );

    const rangeInsurance = (rangeAmount * range.rate) / 1000;
    insurance += rangeInsurance;
    remainingPrice -= rangeAmount;

    console.log(`Range ${range.min}-${range.max}: Added ${rangeInsurance}`);
  }

  // Apply minimum fee if applicable
  if (stateRates[0].minimumFee && insurance < stateRates[0].minimumFee) {
    insurance = stateRates[0].minimumFee;
  }

  console.log(`Final title insurance amount: ${insurance}`);
  return Math.round(insurance * 100) / 100; // Round to 2 decimal places
};