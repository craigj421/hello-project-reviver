import { useState } from "react";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { useToast } from "@/components/ui/use-toast";

interface PropertyDetails {
  sellerName: string;
  propertyAddress: string;
  purchasePrice: number;
  taxesApprox: number;
  docStampsDeed: number;
  ownersTitleInsurance: number;
  commissionRate: number;
  commission: number;
  complianceAudit: number;
  serviceTech: number;
  termiteInspection: number;
  fhaVaFees: number;
  survey: number;
  hoa: number;
  homeWarranty: number;
  buyersClosingCost: number;
  repairs: number;
  searchExamClosingFee: number;
  sellerPayingTitle: boolean;
  firstMortgage: number;
  secondMortgage: number;
}

export const NetProceedsCalculator = () => {
  const { toast } = useToast();
  const [details, setDetails] = useState<PropertyDetails>({
    sellerName: "",
    propertyAddress: "",
    purchasePrice: 0,
    taxesApprox: 0,
    docStampsDeed: 0,
    ownersTitleInsurance: 0,
    commissionRate: 6,
    commission: 0,
    complianceAudit: 0,
    serviceTech: 0,
    termiteInspection: 0,
    fhaVaFees: 0,
    survey: 0,
    hoa: 0,
    homeWarranty: 0,
    buyersClosingCost: 0,
    repairs: 0,
    searchExamClosingFee: 0,
    sellerPayingTitle: false,
    firstMortgage: 0,
    secondMortgage: 0,
  });

  const calculateNetProceeds = () => {
    // Calculate commission based on rate
    const calculatedCommission = (details.purchasePrice * details.commissionRate) / 100;

    // Calculate total closing costs
    const totalClosingCosts = 
      details.taxesApprox +
      details.docStampsDeed +
      details.ownersTitleInsurance +
      calculatedCommission +
      details.complianceAudit +
      details.serviceTech +
      details.termiteInspection +
      details.fhaVaFees +
      details.survey +
      details.hoa +
      details.homeWarranty +
      details.buyersClosingCost +
      details.repairs +
      details.searchExamClosingFee;

    // Calculate total mortgages
    const totalMortgages = details.firstMortgage + details.secondMortgage;

    // Calculate net proceeds
    const netProceeds = details.purchasePrice - totalClosingCosts - totalMortgages;

    toast({
      title: "Calculation Complete",
      description: `Estimated Net Proceeds: $${netProceeds.toLocaleString()}`,
    });

    console.log("Net Proceeds Calculation:", {
      purchasePrice: details.purchasePrice,
      totalClosingCosts,
      totalMortgages,
      netProceeds,
    });
  };

  const handleInputChange = (field: keyof PropertyDetails, value: string | number | boolean) => {
    setDetails(prev => ({
      ...prev,
      [field]: value,
    }));
  };

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Basic Information */}
        <div className="space-y-4">
          <div>
            <Label htmlFor="sellerName">Seller Name</Label>
            <Input
              id="sellerName"
              value={details.sellerName}
              onChange={(e) => handleInputChange("sellerName", e.target.value)}
              placeholder="Enter seller's name"
            />
          </div>
          <div>
            <Label htmlFor="propertyAddress">Property Address</Label>
            <Input
              id="propertyAddress"
              value={details.propertyAddress}
              onChange={(e) => handleInputChange("propertyAddress", e.target.value)}
              placeholder="Enter property address"
            />
          </div>
          <div>
            <Label htmlFor="purchasePrice">Purchase Price ($)</Label>
            <Input
              id="purchasePrice"
              type="number"
              value={details.purchasePrice || ""}
              onChange={(e) => handleInputChange("purchasePrice", parseFloat(e.target.value) || 0)}
              placeholder="Enter purchase price"
            />
          </div>
        </div>

        {/* Fees and Costs */}
        <div className="space-y-4">
          <div>
            <Label htmlFor="commissionRate">Commission Rate (%)</Label>
            <Input
              id="commissionRate"
              type="number"
              value={details.commissionRate || ""}
              onChange={(e) => handleInputChange("commissionRate", parseFloat(e.target.value) || 0)}
              placeholder="Enter commission rate"
            />
          </div>
          <div>
            <Label htmlFor="firstMortgage">First Mortgage ($)</Label>
            <Input
              id="firstMortgage"
              type="number"
              value={details.firstMortgage || ""}
              onChange={(e) => handleInputChange("firstMortgage", parseFloat(e.target.value) || 0)}
              placeholder="Enter first mortgage amount"
            />
          </div>
          <div>
            <Label htmlFor="secondMortgage">Second Mortgage ($)</Label>
            <Input
              id="secondMortgage"
              type="number"
              value={details.secondMortgage || ""}
              onChange={(e) => handleInputChange("secondMortgage", parseFloat(e.target.value) || 0)}
              placeholder="Enter second mortgage amount"
            />
          </div>
        </div>
      </div>

      <div className="flex justify-end mt-6">
        <Button onClick={calculateNetProceeds} className="w-full md:w-auto">
          Calculate Net Proceeds
        </Button>
      </div>
    </div>
  );
};