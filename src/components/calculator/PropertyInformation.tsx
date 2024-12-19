import { useEffect } from "react";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card } from "@/components/ui/card";
import { PropertyDetails } from "./types";

interface PropertyInformationProps {
  details: PropertyDetails;
  onInputChange: (field: keyof PropertyDetails, value: string | number | boolean) => void;
}

export const PropertyInformation = ({ details, onInputChange }: PropertyInformationProps) => {
  useEffect(() => {
    if (details.purchasePrice > 0) {
      const savedSettings = localStorage.getItem('agent_settings');
      if (savedSettings) {
        const settings = JSON.parse(savedSettings);
        const taxRate = parseFloat(settings.propertyTaxRate) || 0;
        const calculatedTaxes = (details.purchasePrice * (taxRate / 100));
        
        console.log("Calculating property taxes:", {
          purchasePrice: details.purchasePrice,
          taxRate,
          calculatedTaxes
        });
        
        onInputChange("taxesApprox", calculatedTaxes);
      }
    }
  }, [details.purchasePrice, onInputChange]);

  const handlePurchasePriceChange = (value: string) => {
    const numericValue = parseFloat(value) || 0;
    if (numericValue >= 0) {
      onInputChange("purchasePrice", numericValue);
    }
  };

  return (
    <Card className="p-4">
      <h3 className="text-lg font-semibold mb-4">Property Information</h3>
      <div className="space-y-4">
        <div>
          <Label htmlFor="sellerName">Seller Name</Label>
          <Input
            id="sellerName"
            value={details.sellerName}
            onChange={(e) => onInputChange("sellerName", e.target.value)}
            placeholder="Enter seller's name"
          />
        </div>
        <div>
          <Label htmlFor="propertyAddress">Property Address</Label>
          <Input
            id="propertyAddress"
            value={details.propertyAddress}
            onChange={(e) => onInputChange("propertyAddress", e.target.value)}
            placeholder="Enter property address"
          />
        </div>
        <div>
          <Label htmlFor="purchasePrice">Purchase Price ($)</Label>
          <Input
            id="purchasePrice"
            type="number"
            min="0"
            value={details.purchasePrice || ""}
            onChange={(e) => handlePurchasePriceChange(e.target.value)}
            placeholder="Enter purchase price"
          />
        </div>
      </div>
    </Card>
  );
};