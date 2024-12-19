import { PropertyDetails } from "../types";

interface AdditionalFeesSectionProps {
  details: PropertyDetails;
  visible: boolean;
}

export const AdditionalFeesSection = ({ details, visible }: AdditionalFeesSectionProps) => {
  if (!visible) return null;

  return (
    <div className="space-y-2">
      <h2 className="font-semibold">Additional Fees:</h2>
      <div className="space-y-1 pl-4">
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
      </div>
    </div>
  );
};