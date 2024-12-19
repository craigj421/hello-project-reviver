import { useEffect } from "react";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card } from "@/components/ui/card";
import { PropertyDetails } from "./types";

interface CommissionDetailsProps {
  details: PropertyDetails;
  onInputChange: (field: keyof PropertyDetails, value: string | number | boolean) => void;
}

export const CommissionDetails = ({ details, onInputChange }: CommissionDetailsProps) => {
  useEffect(() => {
    const savedSettings = localStorage.getItem('agent_settings');
    if (savedSettings) {
      const settings = JSON.parse(savedSettings);
      if (settings.commission) {
        console.log("Setting default commission rate from settings:", settings.commission);
        onInputChange("commissionRate", parseFloat(settings.commission));
      }
    }
  }, [onInputChange]);

  useEffect(() => {
    const calculatedCommission = (details.purchasePrice * details.commissionRate) / 100;
    console.log("Calculating commission:", {
      purchasePrice: details.purchasePrice,
      commissionRate: details.commissionRate,
      calculatedCommission
    });
    onInputChange("commission", calculatedCommission);
  }, [details.purchasePrice, details.commissionRate, onInputChange]);

  const handleCommissionRateChange = (value: string) => {
    const numericValue = parseFloat(value) || 0;
    if (numericValue >= 0 && numericValue <= 100) {
      onInputChange("commissionRate", numericValue);
    }
  };

  return (
    <Card className="p-4">
      <h3 className="text-lg font-semibold mb-4">Commission Details</h3>
      <div className="space-y-4">
        <div>
          <Label htmlFor="commissionRate">Commission Rate (%)</Label>
          <Input
            id="commissionRate"
            type="number"
            min="0"
            max="100"
            step="0.1"
            value={details.commissionRate || ""}
            onChange={(e) => handleCommissionRateChange(e.target.value)}
            placeholder="Enter commission rate"
          />
        </div>
        <div>
          <Label htmlFor="commission">Commission Amount ($)</Label>
          <Input
            id="commission"
            type="number"
            value={details.commission || ""}
            readOnly
            className="bg-gray-100"
            placeholder="Calculated commission amount"
          />
        </div>
      </div>
    </Card>
  );
};