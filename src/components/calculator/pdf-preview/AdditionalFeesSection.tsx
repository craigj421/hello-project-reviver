import { PropertyDetails } from "../types";

interface AdditionalFeesSectionProps {
  details: PropertyDetails;
  visible: boolean;
  formatCurrency: (amount: number) => string;
}

export const AdditionalFeesSection = ({ details, visible, formatCurrency }: AdditionalFeesSectionProps) => {
  if (!visible) return null;

  return (
    <div className="space-y-2 border-b pb-4">
      <h2 className="font-semibold text-lg border-b pb-2 mb-3">Additional Fees:</h2>
      <div className="space-y-2 pl-4">
        <div className="flex justify-between items-center text-sm">
          <span className="text-gray-600">Compliance & Audit:</span>
          <span className="font-medium">{formatCurrency(details.complianceAudit)}</span>
        </div>
        <div className="flex justify-between items-center text-sm">
          <span className="text-gray-600">Service & Tech:</span>
          <span className="font-medium">{formatCurrency(details.serviceTech)}</span>
        </div>
        <div className="flex justify-between items-center text-sm">
          <span className="text-gray-600">Termite Inspection:</span>
          <span className="font-medium">{formatCurrency(details.termiteInspection)}</span>
        </div>
      </div>
    </div>
  );
};