import { Card } from "@/components/ui/card";
import { PropertyDetails } from "./types";

interface PdfPreviewProps {
  details: PropertyDetails;
}

export const PdfPreview = ({ details }: PdfPreviewProps) => {
  const calculateTotalClosingCosts = () => {
    return (
      details.taxesApprox +
      details.docStampsDeed +
      details.ownersTitleInsurance +
      details.commission +
      details.complianceAudit +
      details.serviceTech +
      details.termiteInspection +
      details.fhaVaFees +
      details.survey +
      details.hoa +
      details.homeWarranty +
      details.buyersClosingCost +
      details.repairs +
      details.searchExamClosingFee
    );
  };

  const calculateTotalMortgage = () => {
    return details.firstMortgage + details.secondMortgage;
  };

  const calculateNetProceeds = () => {
    return details.purchasePrice - calculateTotalClosingCosts() - calculateTotalMortgage();
  };

  return (
    <Card className="p-6 max-w-[800px] mx-auto bg-white text-black">
      <div className="space-y-6">
        {/* Logo and Header */}
        <div className="flex flex-col items-center space-y-2">
          <img 
            src="/placeholder.svg" 
            alt="Company Logo" 
            className="h-16 w-auto mb-2"
          />
          <h1 className="text-2xl font-bold text-center">Seller's Net Sheet</h1>
        </div>

        {/* Seller and Property Information */}
        <div className="space-y-2">
          <div className="flex">
            <span className="w-32">Seller's Name:</span>
            <span>{details.sellerName}</span>
          </div>
          <div className="flex">
            <span className="w-32">Property Address:</span>
            <span>{details.propertyAddress}</span>
          </div>
          <div className="flex">
            <span className="w-32">Purchase Price:</span>
            <span>${details.purchasePrice.toLocaleString()}</span>
          </div>
        </div>

        {/* Estimated Closing Costs */}
        <div className="space-y-2">
          <h2 className="font-semibold">Estimated Closing Costs:</h2>
          <div className="space-y-1 pl-4">
            <div className="flex justify-between">
              <span>Doc Stamps on Deed:</span>
              <span>${details.docStampsDeed.toLocaleString()}</span>
            </div>
            <div className="flex justify-between">
              <span>Owner's Title Insurance:</span>
              <span>${details.ownersTitleInsurance.toLocaleString()}</span>
            </div>
            <div className="flex justify-between">
              <span>Commission:</span>
              <span>${details.commission.toLocaleString()}</span>
            </div>
            <div className="flex justify-between">
              <span>Compliance & Audit:</span>
              <span>${details.complianceAudit.toLocaleString()}</span>
            </div>
            <div className="flex justify-between">
              <span>Service & Tech:</span>
              <span>${details.serviceTech.toLocaleString()}</span>
            </div>
            <div className="flex justify-between">
              <span>Termite Inspection:</span>
              <span>${details.termiteInspection.toLocaleString()}</span>
            </div>
            <div className="flex justify-between">
              <span>FHA/VA Fees:</span>
              <span>${details.fhaVaFees.toLocaleString()}</span>
            </div>
            <div className="flex justify-between">
              <span>Survey:</span>
              <span>${details.survey.toLocaleString()}</span>
            </div>
            <div className="flex justify-between">
              <span>Search/Exam/Closing Fee:</span>
              <span>${details.searchExamClosingFee.toLocaleString()}</span>
            </div>
            <div className="flex justify-between">
              <span>Taxes Approx:</span>
              <span>${details.taxesApprox.toLocaleString()}</span>
            </div>
            <div className="flex justify-between">
              <span>HOA:</span>
              <span>${details.hoa.toLocaleString()}</span>
            </div>
            <div className="flex justify-between">
              <span>Home Warranty:</span>
              <span>${details.homeWarranty.toLocaleString()}</span>
            </div>
            <div className="flex justify-between">
              <span>Buyer's Closing Cost:</span>
              <span>${details.buyersClosingCost.toLocaleString()}</span>
            </div>
            <div className="flex justify-between">
              <span>Repairs:</span>
              <span>${details.repairs.toLocaleString()}</span>
            </div>
          </div>
          <div className="flex justify-between font-semibold pt-2 border-t">
            <span>Total Closing Cost:</span>
            <span>${calculateTotalClosingCosts().toLocaleString()}</span>
          </div>
        </div>

        {/* Mortgage Information */}
        <div className="space-y-2">
          <div className="flex justify-between">
            <span>First Mortgage:</span>
            <span>${details.firstMortgage.toLocaleString()}</span>
          </div>
          <div className="flex justify-between">
            <span>Second Mortgage:</span>
            <span>${details.secondMortgage.toLocaleString()}</span>
          </div>
          <div className="flex justify-between font-semibold pt-2 border-t">
            <span>Outstanding Loan + Mortgage costs:</span>
            <span>${calculateTotalMortgage().toLocaleString()}</span>
          </div>
        </div>

        {/* Net Proceeds */}
        <div className="flex justify-between font-bold text-lg pt-4 border-t">
          <span>Net Proceeds to Seller:</span>
          <span>${calculateNetProceeds().toLocaleString()}</span>
        </div>

        {/* Signature Lines */}
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

        {/* Disclaimer */}
        <div className="text-xs text-gray-500 mt-4">
          *This is NOT an ESTIMATION and may not include all expenses such as HOA, insurance or taxes.
        </div>
      </div>
    </Card>
  );
};