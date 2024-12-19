import * as React from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { ScrollArea } from "@/components/ui/scroll-area";
import type { PropertyDetails } from "./types";
import { PdfPreview } from "./PdfPreview";

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
  const handleSubmit = () => {
    // Include all fields in the PDF
    const allFields = Object.keys(details) as Array<keyof PropertyDetails>;
    onSubmit(allFields);
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-[900px] h-[90vh]">
        <DialogHeader>
          <DialogTitle>PDF Preview</DialogTitle>
        </DialogHeader>
        <ScrollArea className="flex-1 px-4">
          <PdfPreview details={details} />
        </ScrollArea>
        <DialogFooter>
          <Button onClick={handleSubmit}>Generate PDF</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};