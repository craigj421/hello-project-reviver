import { PropertyDetails } from "../types";

interface AdditionalFeesSectionProps {
  details: PropertyDetails;
  visible: boolean;
  formatCurrency: (amount: number) => string;
}

export const AdditionalFeesSection = ({ details, visible, formatCurrency }: AdditionalFeesSectionProps) => {
  if (!visible) return null;

  return (
    <div className="space-y-2">
      <h2 className="font-semibold">Additional Fees:</h2>
      <div className="space-y-1 pl-4">
        <div className="flex justify-between">
          <span>Compliance & Audit:</span>
          <span>{formatCurrency(details.complianceAudit)}</span>
        </div>
        <div className="flex justify-between">
          <span>Service & Tech:</span>
          <span>{formatCurrency(details.serviceTech)}</span>
        </div>
        <div className="flex justify-between">
          <span>Termite Inspection:</span>
          <span>{formatCurrency(details.termiteInspection)}</span>
        </div>
      </div>
    </div>
  );
};