import { PropertyDetails } from "../types";

interface AdditionalServicesSectionProps {
  details: PropertyDetails;
  visible: boolean;
}

export const AdditionalServicesSection = ({ details, visible }: AdditionalServicesSectionProps) => {
  if (!visible) return null;

  return (
    <div className="space-y-2">
      <h2 className="font-semibold">Additional Services:</h2>
      <div className="space-y-1 pl-4">
        <div className="flex justify-between">
          <span>FHA/VA Fees:</span>
          <span>${details.fhaVaFees.toLocaleString()}</span>
        </div>
        <div className="flex justify-between">
          <span>Survey:</span>
          <span>${details.survey.toLocaleString()}</span>
        </div>
        <div className="flex justify-between">
          <span>HOA:</span>
          <span>${details.hoa.toLocaleString()}</span>
        </div>
      </div>
    </div>
  );
};