import { DialogFooter as ShadcnDialogFooter } from "@/components/ui/dialog";
import { PdfActions } from "./PdfActions";
import { RefObject } from "react";

interface DialogFooterProps {
  pdfRef: RefObject<HTMLDivElement>;
  onComplete: () => void;
}

export const DialogFooter = ({ pdfRef, onComplete }: DialogFooterProps) => {
  return (
    <ShadcnDialogFooter className="mt-4">
      <PdfActions 
        pdfRef={pdfRef}
        onComplete={onComplete}
      />
    </ShadcnDialogFooter>
  );
};