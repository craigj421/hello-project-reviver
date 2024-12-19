import { useEffect, useState } from "react";
import { Card } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { supabase } from "@/integrations/supabase/client";
import { PropertyDetails } from "./types";

interface CustomFee {
  id: string;
  name: string;
  amount: number;
  is_percentage: boolean;
}

interface CustomFeesSectionProps {
  details: PropertyDetails;
  onInputChange: (field: keyof PropertyDetails, value: number) => void;
}

export const CustomFeesSection = ({ details, onInputChange }: CustomFeesSectionProps) => {
  const [customFees, setCustomFees] = useState<CustomFee[]>([]);

  useEffect(() => {
    const fetchCustomFees = async () => {
      const { data, error } = await supabase
        .from('custom_fees')
        .select('*')
        .order('created_at', { ascending: true });

      if (error) {
        console.error('Error fetching custom fees:', error);
        return;
      }

      console.log('Fetched custom fees:', data);
      setCustomFees(data || []);
    };

    fetchCustomFees();
  }, []);

  const calculateFeeAmount = (fee: CustomFee) => {
    if (fee.is_percentage) {
      return (details.purchasePrice * (fee.amount / 100));
    }
    return fee.amount;
  };

  return (
    <Card className="p-4">
      <h3 className="text-lg font-semibold mb-4">Custom Fees</h3>
      <div className="space-y-4">
        {customFees.map((fee) => (
          <div key={fee.id}>
            <Label htmlFor={`customFee-${fee.id}`}>{fee.name}</Label>
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