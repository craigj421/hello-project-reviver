import * as React from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";
import type { PropertyDetails } from "./types";
import { PdfPreview } from "./PdfPreview";

interface PdfFieldsDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  details: PropertyDetails;
  onSubmit: (selectedFields: Array<keyof PropertyDetails>) => void;
}

export const PdfFieldsDialog = ({
  open,
  onOpenChange,
  details,
  onSubmit,
}: PdfFieldsDialogProps) => {
  const [selectedSections, setSelectedSections] = React.useState({
    propertyInfo: true,
    closingCosts: true,
    mortgageInfo: true,
    additionalFees: true,
    additionalServices: true,
    otherCosts: true,
  });

  const handleSubmit = () => {
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
    
    onSubmit(selectedFields);
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-[900px] h-[90vh] flex flex-col">
        <DialogHeader>
          <DialogTitle>PDF Preview</DialogTitle>
        </DialogHeader>
        <div className="grid grid-cols-2 gap-4 p-4 flex-1 min-h-0">
          <div className="space-y-4 overflow-y-auto">
            <h3 className="font-semibold">Select Sections to Include</h3>
            <div className="space-y-2">
              <div className="flex items-center space-x-2">
                <Checkbox 
                  id="propertyInfo" 
                  checked={selectedSections.propertyInfo}
                  onCheckedChange={(checked) => 
                    setSelectedSections(prev => ({...prev, propertyInfo: checked === true}))
                  }
                />
                <Label htmlFor="propertyInfo">Property Information</Label>
              </div>
              <div className="flex items-center space-x-2">
                <Checkbox 
                  id="closingCosts" 
                  checked={selectedSections.closingCosts}
                  onCheckedChange={(checked) => 
                    setSelectedSections(prev => ({...prev, closingCosts: checked === true}))
                  }
                />
                <Label htmlFor="closingCosts">Closing Costs</Label>
              </div>
              <div className="flex items-center space-x-2">
                <Checkbox 
                  id="mortgageInfo" 
                  checked={selectedSections.mortgageInfo}
                  onCheckedChange={(checked) => 
                    setSelectedSections(prev => ({...prev, mortgageInfo: checked === true}))
                  }
                />
                <Label htmlFor="mortgageInfo">Mortgage Information</Label>
              </div>
              <div className="flex items-center space-x-2">
                <Checkbox 
                  id="additionalFees" 
                  checked={selectedSections.additionalFees}
                  onCheckedChange={(checked) => 
                    setSelectedSections(prev => ({...prev, additionalFees: checked === true}))
                  }
                />
                <Label htmlFor="additionalFees">Additional Fees</Label>
              </div>
              <div className="flex items-center space-x-2">
                <Checkbox 
                  id="additionalServices" 
                  checked={selectedSections.additionalServices}
                  onCheckedChange={(checked) => 
                    setSelectedSections(prev => ({...prev, additionalServices: checked === true}))
                  }
                />
                <Label htmlFor="additionalServices">Additional Services</Label>
              </div>
              <div className="flex items-center space-x-2">
                <Checkbox 
                  id="otherCosts" 
                  checked={selectedSections.otherCosts}
                  onCheckedChange={(checked) => 
                    setSelectedSections(prev => ({...prev, otherCosts: checked === true}))
                  }
                />
                <Label htmlFor="otherCosts">Other Costs</Label>
              </div>
            </div>
          </div>
          <ScrollArea className="flex-1 border rounded-md">
            <div className="p-4">
              <PdfPreview details={details} selectedSections={selectedSections} />
            </div>
          </ScrollArea>
        </div>
        <DialogFooter className="mt-4">
          <Button onClick={handleSubmit}>Generate PDF</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};