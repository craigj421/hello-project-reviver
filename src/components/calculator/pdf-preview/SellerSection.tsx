import { PropertyDetails } from "../types";

interface SellerSectionProps {
  details: PropertyDetails;
  visible: boolean;
}

export const SellerSection = ({ details, visible }: SellerSectionProps) => {
  if (!visible) return null;

  return (
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
  );
};