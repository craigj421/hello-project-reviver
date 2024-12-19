import * as React from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog";
import { ScrollArea } from "@/components/ui/scroll-area";
import { supabase } from "@/integrations/supabase/client";
import type { PropertyDetails } from "./types";
import { PdfPreview } from "./PdfPreview";
import { SectionSelector } from "./pdf-dialog/SectionSelector";
import { PdfActions } from "./pdf-dialog/PdfActions";

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
        <DialogHeader>
          <DialogTitle>PDF Preview</DialogTitle>
        </DialogHeader>
        <div className="grid grid-cols-2 gap-4 p-4 flex-1 min-h-0">
          <div className="space-y-4 overflow-y-auto">
            <SectionSelector 
              selectedSections={selectedSections}
              onSectionChange={handleSectionChange}
            />
          </div>
          <ScrollArea className="flex-1 border rounded-md">
            <div className="p-4" ref={pdfRef}>
              <PdfPreview 
                details={details} 
                selectedSections={selectedSections}
                customFees={customFees}
              />
            </div>
          </ScrollArea>
        </div>
        <DialogFooter className="mt-4">
          <PdfActions 
            pdfRef={pdfRef}
            onComplete={() => onSubmit(getSelectedFields())}
          />
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};