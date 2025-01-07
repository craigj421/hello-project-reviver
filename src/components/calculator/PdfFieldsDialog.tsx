import * as React from "react";
import { Dialog, DialogContent } from "@/components/ui/dialog";
import type { PropertyDetails } from "./types";
import { DialogHeader } from "./pdf-dialog/DialogHeader";
import { SectionSelector } from "./pdf-dialog/SectionSelector";
import { PreviewContent } from "./pdf-dialog/PreviewContent";
import { DialogFooter } from "./pdf-dialog/DialogFooter";

interface CustomFee {
  id: string;
  name: string;
  amount: number;
  is_percentage: boolean;
}

interface PdfFieldsDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  details: PropertyDetails;
  onSubmit: (selectedFields: Array<keyof PropertyDetails>) => void;
  customFees: CustomFee[];
}

export const PdfFieldsDialog = ({
  open,
  onOpenChange,
  details,
  onSubmit,
  customFees,
}: PdfFieldsDialogProps) => {
  const [selectedSections, setSelectedSections] = React.useState({
    propertyInfo: true,
    closingCosts: true,
    mortgageInfo: true,
    additionalFees: true,
    additionalServices: true,
    customFees: true,
    otherCosts: true,
    commissionInfo: true,
  });

  const pdfRef = React.useRef<HTMLDivElement>(null);

  const handleSectionChange = (section: string, checked: boolean) => {
    setSelectedSections(prev => ({
      ...prev,
      [section]: checked
    }));
  };

  const getSelectedFields = () => {
    const selectedFields: Array<keyof PropertyDetails> = [];
    
    if (selectedSections.propertyInfo) {
      selectedFields.push("sellerName", "propertyAddress", "purchasePrice");
    }
    if (selectedSections.closingCosts) {
      selectedFields.push("taxesApprox", "docStampsDeed", "ownersTitleInsurance", "sellerPayingTitle");
    }
    if (selectedSections.mortgageInfo) {
      selectedFields.push("firstMortgage", "secondMortgage");
    }
    if (selectedSections.additionalFees) {
      selectedFields.push("complianceAudit", "serviceTech", "termiteInspection");
    }
    if (selectedSections.additionalServices) {
      selectedFields.push("fhaVaFees", "survey", "hoa");
    }
    if (selectedSections.otherCosts) {
      selectedFields.push("homeWarranty", "buyersClosingCost", "repairs");
    }
    if (selectedSections.commissionInfo) {
      selectedFields.push("commissionRate", "commission");
    }
    
    return selectedFields;
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-[900px] h-[90vh] flex flex-col">
        <DialogHeader />
        <div className="grid grid-cols-2 gap-4 p-4 flex-1 min-h-0">
          <div className="space-y-4 overflow-y-auto">
            <SectionSelector 
              selectedSections={selectedSections}
              onSectionChange={handleSectionChange}
            />
          </div>
          <PreviewContent 
            details={details}
            selectedSections={selectedSections}
            customFees={customFees}
            pdfRef={pdfRef}
          />
        </div>
        <DialogFooter 
          pdfRef={pdfRef}
          onComplete={() => onSubmit(getSelectedFields())}
        />
      </DialogContent>
    </Dialog>
  );
};