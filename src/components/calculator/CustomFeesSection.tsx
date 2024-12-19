import { Card } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";

interface CustomFee {
  id: string;
  name: string;
  amount: number;
  is_percentage: boolean;
}

interface CustomFeesSectionProps {
  details: {
    purchasePrice: number;
  };
  customFees: CustomFee[];
}

export const CustomFeesSection = ({ details, customFees }: CustomFeesSectionProps) => {
  const calculateFeeAmount = (fee: CustomFee) => {
    if (fee.is_percentage) {
      return (details.purchasePrice * fee.amount) / 100;
    }
    return fee.amount;
  };

  return (
    <Card className="p-4">
      <h3 className="text-lg font-semibold mb-4">Custom Fees</h3>
      <div className="space-y-4">
        {customFees.map((fee) => (
          <div key={fee.id}>
            <Label htmlFor={`customFee-${fee.id}`}>
              {fee.name} {fee.is_percentage ? `(${fee.amount}%)` : ''}
            </Label>
            <Input
              id={`customFee-${fee.id}`}
              type="number"
              value={calculateFeeAmount(fee)}
              readOnly
              className="bg-gray-100"
            />
          </div>
        ))}
        {customFees.length === 0 && (
          <p className="text-sm text-muted-foreground">No custom fees configured</p>
        )}
      </div>
    </Card>
  );
};