import { useState } from "react";
import { Button } from "@/components/ui/button";
import { useToast } from "@/components/ui/use-toast";
import { PropertyInformation } from "./calculator/PropertyInformation";
import { CommissionDetails } from "./calculator/CommissionDetails";
import { ClosingCosts } from "./calculator/ClosingCosts";
import { AdditionalFees } from "./calculator/AdditionalFees";
import { AdditionalServices } from "./calculator/AdditionalServices";
import { OtherCosts } from "./calculator/OtherCosts";
import { CustomFeesSection } from "./calculator/CustomFeesSection";
import { MortgageInformation } from "./calculator/MortgageInformation";
import { PdfFieldsDialog } from "./calculator/PdfFieldsDialog";
import { 
  calculateCommission,
  calculateTotalClosingCosts,
  calculateNetProceeds
} from "@/utils/netProceedsCalculations";
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

  const [dialogOpen, setDialogOpen] = useState(false);

  const calculateResults = () => {
    const calculatedCommission = calculateCommission(details.purchasePrice, details.commissionRate);
    const detailsWithCommission = { ...details, commission: calculatedCommission };
    const totalClosingCosts = calculateTotalClosingCosts(detailsWithCommission);
    const netProceeds = calculateNetProceeds(
      details.purchasePrice,
      totalClosingCosts,
      details.firstMortgage,
      details.secondMortgage
    );

    toast({
      title: "Calculation Complete",
      description: `Estimated Net Proceeds: $${netProceeds.toLocaleString()}`,
    });
  };

  const handleInputChange = (field: keyof PropertyDetails, value: string | number | boolean) => {
    setDetails(prev => ({
      ...prev,
      [field]: value,
    }));
  };

  const handlePdfFieldsSubmit = (selectedFields: Array<keyof PropertyDetails>) => {
    console.log("Selected fields for PDF:", selectedFields);
    console.log("Details to include:", selectedFields.map(field => ({ [field]: details[field] })));
    
    toast({
      title: "PDF Generation Started",
      description: `Generating PDF with ${selectedFields.length} selected fields.`,
    });
  };

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <PropertyInformation details={details} onInputChange={handleInputChange} />
        <CommissionDetails details={details} onInputChange={handleInputChange} />
        <ClosingCosts details={details} onInputChange={handleInputChange} />
        <AdditionalFees details={details} onInputChange={handleInputChange} />
        <AdditionalServices details={details} onInputChange={handleInputChange} />
        <CustomFeesSection details={details} onInputChange={handleInputChange} />
        <OtherCosts details={details} onInputChange={handleInputChange} />
        <MortgageInformation details={details} onInputChange={handleInputChange} />
      </div>

      <div className="flex justify-end gap-4 mt-6">
        <Button onClick={calculateResults} variant="outline">
          Calculate Net Proceeds
        </Button>
        <Button onClick={() => setDialogOpen(true)}>
          Generate PDF Report
        </Button>
      </div>

      <PdfFieldsDialog
        open={dialogOpen}
        onOpenChange={setDialogOpen}
        details={details}
        onSubmit={handlePdfFieldsSubmit}
      />
    </div>
  );
};