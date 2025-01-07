import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { PropertyDetails } from "../types";
import { useEffect } from "react";
import { supabase } from "@/integrations/supabase/client";

interface DocStampsInputProps {
  details: PropertyDetails;
  onInputChange: (field: keyof PropertyDetails, value: number) => void;
}

export const DocStampsInput = ({ details, onInputChange }: DocStampsInputProps) => {
  useEffect(() => {
    const calculateDocStamps = async () => {
      try {
        // Get Florida's base rate from doc_stamp_states
        const { data: stateData, error: stateError } = await supabase
          .from('doc_stamp_states')
          .select('base_rate')
          .eq('name', 'Florida')
          .single();

        if (stateError) throw stateError;

        if (stateData) {
          const baseRate = stateData.base_rate;
          // Calculate doc stamps: $0.70 per $100 or fraction thereof
          const docStamps = Math.ceil(details.purchasePrice / 100) * baseRate;
          console.log("Calculating doc stamps:", {
            purchasePrice: details.purchasePrice,
            baseRate,
            docStamps
          });
          onInputChange("docStampsDeed", docStamps);
        }
      } catch (error) {
        console.error('Error calculating doc stamps:', error);
      }
    };

    if (details.purchasePrice > 0) {
      calculateDocStamps();
    }
  }, [details.purchasePrice, onInputChange]);

  return (
    <div>
      <Label htmlFor="docStampsDeed">Doc Stamps Deed</Label>
      <Input
        id="docStampsDeed"
        type="number"
        value={details.docStampsDeed || ""}
        readOnly
        className="bg-gray-100"
        placeholder="Calculated doc stamps deed"
      />
    </div>
  );
};