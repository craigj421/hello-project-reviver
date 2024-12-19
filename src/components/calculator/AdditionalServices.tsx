import { Card } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { PropertyDetails } from "./types";

interface AdditionalServicesProps {
  details: PropertyDetails;
  onInputChange: (field: keyof PropertyDetails, value: string | number | boolean) => void;
}

export const AdditionalServices = ({ details, onInputChange }: AdditionalServicesProps) => {
  return (
    <Card className="p-4">
      <h3 className="text-lg font-semibold mb-4">Additional Services</h3>
      <div className="space-y-4">
        <div>
          <Label htmlFor="fhaVaFees">FHA/VA Fees</Label>
          <Input
            id="fhaVaFees"
            type="number"
            value={details.fhaVaFees || ""}
            onChange={(e) => onInputChange("fhaVaFees", parseFloat(e.target.value) || 0)}
            placeholder="Enter FHA/VA fees"
          />
        </div>
        <div>
          <Label htmlFor="survey">Survey</Label>
          <Input
            id="survey"
            type="number"
            value={details.survey || ""}
            onChange={(e) => onInputChange("survey", parseFloat(e.target.value) || 0)}
            placeholder="Enter survey cost"
          />
        </div>
        <div>
          <Label htmlFor="hoa">HOA</Label>
          <Input
            id="hoa"
            type="number"
            value={details.hoa || ""}
            onChange={(e) => onInputChange("hoa", parseFloat(e.target.value) || 0)}
            placeholder="Enter HOA fees"
          />
        </div>
      </div>
    </Card>
  );
};