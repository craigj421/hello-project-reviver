import { Card } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { PropertyDetails } from "./types";

interface AdditionalFeesProps {
  details: PropertyDetails;
  onInputChange: (field: keyof PropertyDetails, value: string | number | boolean) => void;
}

export const AdditionalFees = ({ details, onInputChange }: AdditionalFeesProps) => {
  return (
    <Card className="p-4">
      <h3 className="text-lg font-semibold mb-4">Additional Fees</h3>
      <div className="space-y-4">
        <div>
          <Label htmlFor="complianceAudit">Compliance & Audit</Label>
          <Input
            id="complianceAudit"
            type="number"
            value={details.complianceAudit || ""}
            onChange={(e) => onInputChange("complianceAudit", parseFloat(e.target.value) || 0)}
            placeholder="Enter compliance & audit fee"
          />
        </div>
        <div>
          <Label htmlFor="serviceTech">Service & Tech</Label>
          <Input
            id="serviceTech"
            type="number"
            value={details.serviceTech || ""}
            onChange={(e) => onInputChange("serviceTech", parseFloat(e.target.value) || 0)}
            placeholder="Enter service & tech fee"
          />
        </div>
        <div>
          <Label htmlFor="termiteInspection">Termite Inspection</Label>
          <Input
            id="termiteInspection"
            type="number"
            value={details.termiteInspection || ""}
            onChange={(e) => onInputChange("termiteInspection", parseFloat(e.target.value) || 0)}
            placeholder="Enter termite inspection fee"
          />
        </div>
      </div>
    </Card>
  );
};