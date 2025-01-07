import { ScrollArea } from "@/components/ui/scroll-area";
import { PdfPreview } from "../PdfPreview";
import { PropertyDetails } from "../types";
import { RefObject } from "react";

interface CustomFee {
  id: string;
  name: string;
  amount: number;
  is_percentage: boolean;
}

interface PreviewContentProps {
  details: PropertyDetails;
  selectedSections: {
    propertyInfo: boolean;
    closingCosts: boolean;
    mortgageInfo: boolean;
    additionalFees: boolean;
    additionalServices: boolean;
    customFees: boolean;
    otherCosts: boolean;
    commissionInfo: boolean;
  };
  customFees: CustomFee[];
  pdfRef: RefObject<HTMLDivElement>;
}

export const PreviewContent = ({ details, selectedSections, customFees, pdfRef }: PreviewContentProps) => {
  return (
    <ScrollArea className="flex-1 border rounded-md">
      <div className="p-4" ref={pdfRef}>
        <PdfPreview 
          details={details} 
          selectedSections={selectedSections}
          customFees={customFees}
        />
      </div>
    </ScrollArea>
  );
};