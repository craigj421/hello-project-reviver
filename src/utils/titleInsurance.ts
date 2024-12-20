import { supabase } from "@/integrations/supabase/client";

export interface TitleRate {
  minAmount: number;
  maxAmount: number;
  ratePerThousand: number;
}

export const calculateTitleInsurance = async (purchasePrice: number, state: string = 'FL'): Promise<number> => {
  console.log(`Calculating title insurance for ${state} with purchase price: ${purchasePrice}`);
  
  // Get the current user's settings
  const { data: settingsData, error: settingsError } = await supabase
    .from('settings')
    .select('*, title_insurance_rates(*)')
    .single();

  if (settingsError) {
    console.error('Error fetching title insurance rates:', settingsError);
    return 0;
  }

  if (!settingsData?.title_insurance_rates || settingsData.title_insurance_rates.length === 0) {
    console.warn('No title insurance rates found in settings');
    return 0;
  }

  const rates = settingsData.title_insurance_rates.map(rate => ({
    minAmount: rate.min_amount,
    maxAmount: rate.max_amount,
    ratePerThousand: rate.rate_per_thousand
  }));

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