import { Label } from "@/components/ui/label";
import { useCustomFees } from "@/hooks/useCustomFees";
import { CustomFeesContent } from "./custom-fees/CustomFeesContent";

export const CustomFeesSection = () => {
  const { fees, addFee, deleteFee } = useCustomFees();

  return (
    <div className="space-y-4">
      <Label>Custom Fees</Label>
      <CustomFeesContent 
        fees={fees}
        onDelete={deleteFee}
        onAdd={addFee}
      />
    </div>
  );
};