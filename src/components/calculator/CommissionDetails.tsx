import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card } from "@/components/ui/card";
import { PropertyDetails } from "./types";
import { useEffect } from "react";

interface CommissionDetailsProps {
  details: PropertyDetails;
  onInputChange: (field: keyof PropertyDetails, value: string | number | boolean) => void;
}

export const CommissionDetails = ({ details, onInputChange }: CommissionDetailsProps) => {
  useEffect(() => {
    // Calculate commission amount whenever rate or purchase price changes
    const calculatedCommission = (details.purchasePrice * details.commissionRate) / 100;
    console.log("Calculating commission:", {
      purchasePrice: details.purchasePrice,
      commissionRate: details.commissionRate,
      calculatedCommission
    });
    onInputChange("commission", calculatedCommission);
  }, [details.purchasePrice, details.commissionRate, onInputChange]);

  return (
    <Card className="p-4">
      <h3 className="text-lg font-semibold mb-4">Commission Details</h3>
      <div className="space-y-4">
        <div>
          <Label htmlFor="commissionRate">Commission Rate (%)</Label>
          <Input
            id="commissionRate"
            type="number"
            value={details.commissionRate || ""}
            onChange={(e) => onInputChange("commissionRate", parseFloat(e.target.value) || 0)}
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