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
import { Download, Printer } from "lucide-react";
import html2pdf from "html2pdf.js";
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
    commissionInfo: true,
  });

  const pdfRef = React.useRef<HTMLDivElement>(null);

  const handleGeneratePdf = async (action: 'download' | 'print') => {
    if (!pdfRef.current) return;

    const element = pdfRef.current;
    const opt = {
      margin: [0.3, 0.3], // Reduced margins [top/bottom, left/right] in inches
      filename: 'net-proceeds-calculation.pdf',
      image: { type: 'jpeg', quality: 0.98 },
      html2canvas: { 
        scale: 1.5, // Reduced scale for better fit
        useCORS: true,
        letterRendering: true,
      },
      jsPDF: { 
        unit: 'in', 
        format: 'letter', 
        orientation: 'portrait',
        compress: true,
      }
    };

    try {
      if (action === 'download') {
        await html2pdf().set(opt).from(element).save();
      } else {
        const pdfBlob = await html2pdf().set(opt).from(element).output('blob');
        const pdfUrl = URL.createObjectURL(pdfBlob);
        const printWindow = window.open(pdfUrl);
        if (printWindow) {
          printWindow.onload = function() {
            printWindow.print();
            URL.revokeObjectURL(pdfUrl);
          };
        }
      }
      
      onSubmit(getSelectedFields());
    } catch (error) {
      console.error('Error generating PDF:', error);
    }
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
                  id="commissionInfo" 
                  checked={selectedSections.commissionInfo}
                  onCheckedChange={(checked) => 
                    setSelectedSections(prev => ({...prev, commissionInfo: checked === true}))
                  }
                />
                <Label htmlFor="commissionInfo">Commission Information</Label>
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
            <div className="p-4" ref={pdfRef}>
              <PdfPreview details={details} selectedSections={selectedSections} />
            </div>
          </ScrollArea>
        </div>
        <DialogFooter className="mt-4 space-x-2">
          <Button 
            onClick={() => handleGeneratePdf('print')} 
            variant="outline"
            className="gap-2"
          >
            <Printer className="h-4 w-4" />
            Print PDF
          </Button>
          <Button 
            onClick={() => handleGeneratePdf('download')}
            className="gap-2"
          >
            <Download className="h-4 w-4" />
            Download PDF
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};