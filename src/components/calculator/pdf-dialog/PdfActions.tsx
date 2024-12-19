import * as React from "react";
import { Button } from "@/components/ui/button";
import { Download, Printer } from "lucide-react";
import html2pdf from "html2pdf.js";

interface PdfActionsProps {
  pdfRef: React.RefObject<HTMLDivElement>;
  onComplete: () => void;
}

export const PdfActions = ({ pdfRef, onComplete }: PdfActionsProps) => {
  const handleGeneratePdf = async (action: 'download' | 'print') => {
    if (!pdfRef.current) return;

    const element = pdfRef.current;
    const opt = {
      margin: [0.3, 0.3],
      filename: 'net-proceeds-calculation.pdf',
      image: { type: 'jpeg', quality: 0.98 },
      html2canvas: { 
        scale: 1.5,
        useCORS: true,
        letterRendering: true,
      },
      jsPDF: { 
        unit: 'in', 
        format: 'letter', 
        orientation: 'portrait',
        compress: true,
      }
    };

    try {
      if (action === 'download') {
        await html2pdf().set(opt).from(element).save();
      } else {
        const pdfBlob = await html2pdf().set(opt).from(element).output('blob');
        const pdfUrl = URL.createObjectURL(pdfBlob);
        const printWindow = window.open(pdfUrl);
        if (printWindow) {
          printWindow.onload = function() {
            printWindow.print();
            URL.revokeObjectURL(pdfUrl);
          };
        }
      }
      onComplete();
    } catch (error) {
      console.error('Error generating PDF:', error);
    }
  };

  return (
    <div className="space-x-2">
      <Button 
        onClick={() => handleGeneratePdf('print')} 
        variant="outline"
        className="gap-2"
      >
        <Printer className="h-4 w-4" />
        Print PDF
      </Button>
      <Button 
        onClick={() => handleGeneratePdf('download')}
        className="gap-2"
      >
        <Download className="h-4 w-4" />
        Download PDF
      </Button>
    </div>
  );
};