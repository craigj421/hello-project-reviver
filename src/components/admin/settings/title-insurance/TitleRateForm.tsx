import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { TitleRate } from "@/hooks/settingsTypes";

interface TitleRateFormProps {
  onAddRate: (rate: TitleRate) => void;
}

export const TitleRateForm = ({ onAddRate }: TitleRateFormProps) => {
  const [newRate, setNewRate] = useState<TitleRate>({
    minAmount: 0,
    maxAmount: 0,
    ratePerThousand: 0,
  });

  const handleSubmit = () => {
    if (newRate.minAmount >= 0 && newRate.maxAmount > newRate.minAmount && newRate.ratePerThousand > 0) {
      console.log("Adding new rate:", newRate);
      onAddRate(newRate);
      setNewRate({ minAmount: 0, maxAmount: 0, ratePerThousand: 0 });
    }
  };

  return (
    <div className="grid grid-cols-4 gap-4">
      <div>
        <Label>Min Amount</Label>
        <Input
          type="number"
          value={newRate.minAmount}
          onChange={(e) => setNewRate({ ...newRate, minAmount: Number(e.target.value) })}
          placeholder="0"
        />
      </div>
      <div>
        <Label>Max Amount</Label>
        <Input
          type="number"
          value={newRate.maxAmount}
          onChange={(e) => setNewRate({ ...newRate, maxAmount: Number(e.target.value) })}
          placeholder="100000"
        />
      </div>
      <div>
        <Label>Rate per $1,000</Label>
        <Input
          type="number"
          value={newRate.ratePerThousand}
          onChange={(e) => setNewRate({ ...newRate, ratePerThousand: Number(e.target.value) })}
          placeholder="5.75"
        />
      </div>
      <div className="flex items-end">
        <Button onClick={handleSubmit} className="w-full">Add Rate</Button>
      </div>
    </div>
  );
};