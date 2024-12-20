import { Button } from "@/components/ui/button";
import { PropertyInformation } from "./calculator/PropertyInformation";
import { CommissionDetails } from "./calculator/CommissionDetails";
import { ClosingCosts } from "./calculator/ClosingCosts";
import { AdditionalFees } from "./calculator/AdditionalFees";
import { AdditionalServices } from "./calculator/AdditionalServices";
import { OtherCosts } from "./calculator/OtherCosts";
import { CustomFeesSection } from "./calculator/CustomFeesSection";
import { MortgageInformation } from "./calculator/MortgageInformation";
import { PdfFieldsDialog } from "./calculator/PdfFieldsDialog";
import { CalculatorProvider, useCalculator } from "@/contexts/CalculatorContext";

const CalculatorContent = () => {
  const { 
    details, 
    customFees, 
    onInputChange, 
    calculateResults, 
    dialogOpen, 
    setDialogOpen,
    handlePdfFieldsSubmit 
  } = useCalculator();

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <PropertyInformation details={details} onInputChange={onInputChange} />
        <CommissionDetails details={details} onInputChange={onInputChange} />
        <ClosingCosts details={details} onInputChange={onInputChange} />
        <AdditionalFees details={details} onInputChange={onInputChange} />
        <AdditionalServices details={details} onInputChange={onInputChange} />
        <CustomFeesSection details={details} customFees={customFees} />
        <OtherCosts details={details} onInputChange={onInputChange} />
        <MortgageInformation details={details} onInputChange={onInputChange} />
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
        customFees={customFees}
      />
    </div>
  );
};

export const NetProceedsCalculator = () => {
  return (
    <CalculatorProvider>
      <CalculatorContent />
    </CalculatorProvider>
  );
};