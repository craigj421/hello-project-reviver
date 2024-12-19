import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { useState } from "react";

interface NewFee {
  name: string;
  amount: number;
  description: string;
  is_percentage: boolean;
}

interface NewFeeFormProps {
  onSubmit: (fee: NewFee) => void;
}

export const NewFeeForm = ({ onSubmit }: NewFeeFormProps) => {
  const [newFee, setNewFee] = useState<NewFee>({
    name: '',
    amount: 0,
    description: '',
    is_percentage: false,
  });

  const handleSubmit = () => {
    if (!newFee.name || newFee.amount < 0) return;
    onSubmit(newFee);
    setNewFee({
      name: '',
      amount: 0,
      description: '',
      is_percentage: false,
    });
  };

  return (
    <div className="grid grid-cols-5 gap-4">
      <div>
        <Label>Name</Label>
        <Input
          value={newFee.name}
          onChange={(e) => setNewFee({ ...newFee, name: e.target.value })}
          placeholder="Fee name"
        />
      </div>
      <div>
        <Label>Amount</Label>
        <Input
          type="number"
          value={newFee.amount}
          onChange={(e) => setNewFee({ ...newFee, amount: parseFloat(e.target.value) || 0 })}
          placeholder="Amount"
        />
      </div>
      <div className="flex items-center space-x-2 pt-6">
        <Switch
          id="is-percentage"
          checked={newFee.is_percentage}
          onCheckedChange={(checked) => setNewFee({ ...newFee, is_percentage: checked })}
        />
        <Label htmlFor="is-percentage">Is Percentage?</Label>
      </div>
      <div>
        <Label>Description</Label>
        <Input
          value={newFee.description}
          onChange={(e) => setNewFee({ ...newFee, description: e.target.value })}
          placeholder="Description"
        />
      </div>
      <div className="flex items-end">
        <Button onClick={handleSubmit} className="w-full">Add Fee</Button>
      </div>
    </div>
  );
};