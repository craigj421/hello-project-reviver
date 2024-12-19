import { PropertyDetails } from "../types";

interface ClosingCostsSectionProps {
  details: PropertyDetails;
  visible: boolean;
}

export const ClosingCostsSection = ({ details, visible }: ClosingCostsSectionProps) => {
  if (!visible) return null;

  return (
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
          <span>Taxes Approx:</span>
          <span>${details.taxesApprox.toLocaleString()}</span>
        </div>
      </div>
    </div>
  );
};