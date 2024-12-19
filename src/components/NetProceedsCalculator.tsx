import { useState } from "react";
import { Button } from "@/components/ui/button";
import { useToast } from "@/components/ui/use-toast";
import { PropertyInformation } from "./calculator/PropertyInformation";
import { CommissionDetails } from "./calculator/CommissionDetails";
import { ClosingCosts } from "./calculator/ClosingCosts";
import type { PropertyDetails } from "./calculator/types";

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
        <PropertyInformation details={details} onInputChange={handleInputChange} />
        <CommissionDetails details={details} onInputChange={handleInputChange} />
        <ClosingCosts details={details} onInputChange={handleInputChange} />
        
        {/* Additional Fees */}
        <Card className="p-4">
          <h3 className="text-lg font-semibold mb-4">Additional Fees</h3>
          <div className="space-y-4">
            <div>
              <Label htmlFor="complianceAudit">Compliance & Audit</Label>
              <Input
                id="complianceAudit"
                type="number"
                value={details.complianceAudit || ""}
                onChange={(e) => handleInputChange("complianceAudit", parseFloat(e.target.value) || 0)}
                placeholder="Enter compliance & audit fee"
              />
            </div>
            <div>
              <Label htmlFor="serviceTech">Service & Tech</Label>
              <Input
                id="serviceTech"
                type="number"
                value={details.serviceTech || ""}
                onChange={(e) => handleInputChange("serviceTech", parseFloat(e.target.value) || 0)}
                placeholder="Enter service & tech fee"
              />
            </div>
            <div>
              <Label htmlFor="termiteInspection">Termite Inspection</Label>
              <Input
                id="termiteInspection"
                type="number"
                value={details.termiteInspection || ""}
                onChange={(e) => handleInputChange("termiteInspection", parseFloat(e.target.value) || 0)}
                placeholder="Enter termite inspection fee"
              />
            </div>
          </div>
        </Card>

        {/* Additional Services */}
        <Card className="p-4">
          <h3 className="text-lg font-semibold mb-4">Additional Services</h3>
          <div className="space-y-4">
            <div>
              <Label htmlFor="fhaVaFees">FHA/VA Fees</Label>
              <Input
                id="fhaVaFees"
                type="number"
                value={details.fhaVaFees || ""}
                onChange={(e) => handleInputChange("fhaVaFees", parseFloat(e.target.value) || 0)}
                placeholder="Enter FHA/VA fees"
              />
            </div>
            <div>
              <Label htmlFor="survey">Survey</Label>
              <Input
                id="survey"
                type="number"
                value={details.survey || ""}
                onChange={(e) => handleInputChange("survey", parseFloat(e.target.value) || 0)}
                placeholder="Enter survey cost"
              />
            </div>
            <div>
              <Label htmlFor="hoa">HOA</Label>
              <Input
                id="hoa"
                type="number"
                value={details.hoa || ""}
                onChange={(e) => handleInputChange("hoa", parseFloat(e.target.value) || 0)}
                placeholder="Enter HOA fees"
              />
            </div>
          </div>
        </Card>

        {/* Other Costs */}
        <Card className="p-4">
          <h3 className="text-lg font-semibold mb-4">Other Costs</h3>
          <div className="space-y-4">
            <div>
              <Label htmlFor="homeWarranty">Home Warranty</Label>
              <Input
                id="homeWarranty"
                type="number"
                value={details.homeWarranty || ""}
                onChange={(e) => handleInputChange("homeWarranty", parseFloat(e.target.value) || 0)}
                placeholder="Enter home warranty cost"
              />
            </div>
            <div>
              <Label htmlFor="buyersClosingCost">Buyer's Closing Cost</Label>
              <Input
                id="buyersClosingCost"
                type="number"
                value={details.buyersClosingCost || ""}
                onChange={(e) => handleInputChange("buyersClosingCost", parseFloat(e.target.value) || 0)}
                placeholder="Enter buyer's closing cost"
              />
            </div>
            <div>
              <Label htmlFor="repairs">Repairs</Label>
              <Input
                id="repairs"
                type="number"
                value={details.repairs || ""}
                onChange={(e) => handleInputChange("repairs", parseFloat(e.target.value) || 0)}
                placeholder="Enter repair costs"
              />
            </div>
          </div>
        </Card>

        {/* Mortgage Information */}
        <Card className="p-4">
          <h3 className="text-lg font-semibold mb-4">Mortgage Information</h3>
          <div className="space-y-4">
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
        </Card>
      </div>

      <div className="flex justify-end mt-6">
        <Button onClick={calculateNetProceeds} className="w-full md:w-auto">
          Calculate Net Proceeds
        </Button>
      </div>
    </div>
  );
};
