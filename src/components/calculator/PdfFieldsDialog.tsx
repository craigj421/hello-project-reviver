import React, { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog";
import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { ScrollArea } from "@/components/ui/scroll-area";
import type { PropertyDetails } from "./types";

interface PdfFieldsDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  details: PropertyDetails;
  onSubmit: (selectedFields: Array<keyof PropertyDetails>) => void;
}

export const PdfFieldsDialog = ({
  open,
  onOpenChange,
  details,
  onSubmit,
}: PdfFieldsDialogProps) => {
  const [selectedFields, setSelectedFields] = useState<Array<keyof PropertyDetails>>([]);

  const handleSubmit = () => {
    onSubmit(selectedFields);
    onOpenChange(false);
  };

  const toggleField = (field: keyof PropertyDetails) => {
    setSelectedFields((prev) =>
      prev.includes(field)
        ? prev.filter((f) => f !== field)
        : [...prev, field]
    );
  };

  const fieldLabels: Record<keyof PropertyDetails, string> = {
    sellerName: "Seller Name",
    propertyAddress: "Property Address",
    purchasePrice: "Purchase Price",
    taxesApprox: "Approximate Taxes",
    docStampsDeed: "Documentary Stamps on Deed",
    ownersTitleInsurance: "Owner's Title Insurance",
    commissionRate: "Commission Rate",
    commission: "Commission Amount",
    complianceAudit: "Compliance & Audit Fee",
    serviceTech: "Service & Tech Fee",
    termiteInspection: "Termite Inspection",
    fhaVaFees: "FHA/VA Fees",
    survey: "Survey",
    hoa: "HOA Fees",
    homeWarranty: "Home Warranty",
    buyersClosingCost: "Buyer's Closing Cost",
    repairs: "Repairs",
    searchExamClosingFee: "Search, Exam & Closing Fee",
    sellerPayingTitle: "Seller Paying Title",
    firstMortgage: "First Mortgage",
    secondMortgage: "Second Mortgage",
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-md">
        <DialogHeader>
          <DialogTitle>Select Fields for PDF Export</DialogTitle>
        </DialogHeader>
        <ScrollArea className="h-[400px] pr-4">
          <div className="space-y-4">
            {Object.entries(fieldLabels).map(([field, label]) => (
              <div key={field} className="flex items-center space-x-2">
                <Checkbox
                  id={field}
                  checked={selectedFields.includes(field as keyof PropertyDetails)}
                  onCheckedChange={() => toggleField(field as keyof PropertyDetails)}
                />
                <Label htmlFor={field}>{label}</Label>
              </div>
            ))}
          </div>
        </ScrollArea>
        <DialogFooter>
          <Button onClick={handleSubmit}>Generate PDF</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};