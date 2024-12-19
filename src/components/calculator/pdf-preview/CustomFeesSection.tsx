import { PropertyDetails } from "../types";

interface CustomFee {
  id: string;
  name: string;
  amount: number;
  is_percentage: boolean;
}

interface CustomFeesSectionProps {
  details: PropertyDetails;
  customFees: CustomFee[];
  visible: boolean;
  formatCurrency: (amount: number) => string;
}

export const CustomFeesSection = ({ details, customFees, visible, formatCurrency }: CustomFeesSectionProps) => {
  if (!visible || customFees.length === 0) return null;

  const calculateFeeAmount = (fee: CustomFee) => {
    if (fee.is_percentage) {
      return (details.purchasePrice * (fee.amount / 100));
    }
    return fee.amount;
  };

  return (
    <div className="space-y-2 border-b pb-4">
      <h2 className="font-semibold text-lg border-b pb-2 mb-3">Custom Fees:</h2>
      <div className="space-y-2 pl-4">
        {customFees.map((fee) => (
          <div key={fee.id} className="flex justify-between items-center text-sm">
            <span className="text-gray-600">{fee.name}:</span>
            <span className="font-medium">{formatCurrency(calculateFeeAmount(fee))}</span>
          </div>
        ))}
      </div>
    </div>
  );
};