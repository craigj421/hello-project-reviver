import { useState } from "react";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

interface TitleRate {
  minAmount: number;
  maxAmount: number;
  ratePerThousand: number;
  id?: string;
  settings_id?: string;
}

interface TitleInsuranceSectionProps {
  rates: TitleRate[];
  onRatesChange: (rates: TitleRate[]) => void;
}

export const TitleInsuranceSection = ({ rates, onRatesChange }: TitleInsuranceSectionProps) => {
  const [newRate, setNewRate] = useState<TitleRate>({
    minAmount: 0,
    maxAmount: 0,
    ratePerThousand: 0,
  });

  const addRate = () => {
    if (newRate.minAmount >= 0 && newRate.maxAmount > newRate.minAmount && newRate.ratePerThousand > 0) {
      onRatesChange([...rates, newRate]);
      setNewRate({ minAmount: 0, maxAmount: 0, ratePerThousand: 0 });
    }
  };

  const deleteRate = (index: number) => {
    const updatedRates = rates.filter((_, i) => i !== index);
    onRatesChange(updatedRates);
  };

  return (
    <div className="space-y-4">
      <Label>Title Insurance Rates</Label>
      
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Min Amount ($)</TableHead>
            <TableHead>Max Amount ($)</TableHead>
            <TableHead>Rate per $1,000</TableHead>
            <TableHead>Actions</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {rates.map((rate, index) => (
            <TableRow key={index}>
              <TableCell>{rate.minAmount.toLocaleString()}</TableCell>
              <TableCell>{rate.maxAmount.toLocaleString()}</TableCell>
              <TableCell>${rate.ratePerThousand}</TableCell>
              <TableCell>
                <Button
                  variant="destructive"
                  size="sm"
                  onClick={() => deleteRate(index)}
                >
                  Delete
                </Button>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>

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
          <Button onClick={addRate} className="w-full">Add Rate</Button>
        </div>
      </div>
    </div>
  );
};