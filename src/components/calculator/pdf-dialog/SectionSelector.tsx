import * as React from "react";
import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";

interface SectionSelectorProps {
  selectedSections: {
    propertyInfo: boolean;
    closingCosts: boolean;
    mortgageInfo: boolean;
    additionalFees: boolean;
    additionalServices: boolean;
    otherCosts: boolean;
    commissionInfo: boolean;
  };
  onSectionChange: (section: string, checked: boolean) => void;
}

export const SectionSelector = ({ selectedSections, onSectionChange }: SectionSelectorProps) => {
  const sections = [
    { id: "propertyInfo", label: "Property Information" },
    { id: "commissionInfo", label: "Commission Information" },
    { id: "closingCosts", label: "Closing Costs" },
    { id: "mortgageInfo", label: "Mortgage Information" },
    { id: "additionalFees", label: "Additional Fees" },
    { id: "additionalServices", label: "Additional Services" },
    { id: "otherCosts", label: "Other Costs" },
  ];

  return (
    <div className="space-y-4">
      <h3 className="font-semibold">Select Sections to Include</h3>
      <div className="space-y-2">
        {sections.map(({ id, label }) => (
          <div key={id} className="flex items-center space-x-2">
            <Checkbox 
              id={id} 
              checked={selectedSections[id as keyof typeof selectedSections]}
              onCheckedChange={(checked) => 
                onSectionChange(id, checked === true)
              }
            />
            <Label htmlFor={id}>{label}</Label>
          </div>
        ))}
      </div>
    </div>
  );
};