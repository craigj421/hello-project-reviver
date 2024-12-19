import { Card } from "@/components/ui/card";
import { PropertyDetails } from "./types";
import { Header } from "./pdf-preview/Header";
import { SellerSection } from "./pdf-preview/SellerSection";
import { ClosingCostsSection } from "./pdf-preview/ClosingCostsSection";
import { AdditionalFeesSection } from "./pdf-preview/AdditionalFeesSection";
import { AdditionalServicesSection } from "./pdf-preview/AdditionalServicesSection";
import { MortgageSection } from "./pdf-preview/MortgageSection";
import { NetProceedsSection } from "./pdf-preview/NetProceedsSection";

interface PdfPreviewProps {
  details: PropertyDetails;
  selectedSections: {
    propertyInfo: boolean;
    closingCosts: boolean;
    mortgageInfo: boolean;
    additionalFees: boolean;
    additionalServices: boolean;
    otherCosts: boolean;
  };
}

export const PdfPreview = ({ details, selectedSections }: PdfPreviewProps) => {
  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
    }).format(amount);
  };

  return (
    <Card className="p-6 max-w-[800px] mx-auto bg-white text-black">
      <div className="space-y-6">
        <Header />
        <SellerSection details={details} visible={selectedSections.propertyInfo} />
        <ClosingCostsSection 
          details={details} 
          visible={selectedSections.closingCosts}
          formatCurrency={formatCurrency}
        />
        <AdditionalFeesSection 
          details={details} 
          visible={selectedSections.additionalFees}
          formatCurrency={formatCurrency}
        />
        <AdditionalServicesSection 
          details={details} 
          visible={selectedSections.additionalServices}
          formatCurrency={formatCurrency}
        />
        <MortgageSection 
          details={details} 
          visible={selectedSections.mortgageInfo}
          formatCurrency={formatCurrency}
        />
        <NetProceedsSection 
          details={details} 
          selectedSections={selectedSections}
          formatCurrency={formatCurrency}
        />

        <div className="flex justify-between pt-8 mt-8 border-t">
          <div className="flex flex-col items-center">
            <div className="w-48 border-t border-black mt-8"></div>
            <span className="text-sm">Signature (for Seller)</span>
          </div>
          <div className="flex flex-col items-center">
            <div className="w-48 border-t border-black mt-8"></div>
            <span className="text-sm">Signature (for Agent)</span>
          </div>
        </div>

        <div className="text-xs text-gray-500 mt-4">
          *This is NOT an ESTIMATION and may not include all expenses such as HOA, insurance or taxes.
        </div>
      </div>
    </Card>
  );
};