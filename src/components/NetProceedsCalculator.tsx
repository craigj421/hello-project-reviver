import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { useToast } from "@/components/ui/use-toast";
import { supabase } from "@/integrations/supabase/client";
import { PropertyInformation } from "./calculator/PropertyInformation";
import { CommissionDetails } from "./calculator/CommissionDetails";
import { ClosingCosts } from "./calculator/ClosingCosts";
import { AdditionalFees } from "./calculator/AdditionalFees";
import { AdditionalServices } from "./calculator/AdditionalServices";
import { OtherCosts } from "./calculator/OtherCosts";
import { CustomFeesSection } from "./calculator/CustomFeesSection";
import { MortgageInformation } from "./calculator/MortgageInformation";
import { PdfFieldsDialog } from "./calculator/PdfFieldsDialog";
import { 
  calculateCommission,
  calculateTotalClosingCosts,
  calculateNetProceeds
} from "@/utils/netProceedsCalculations";
import type { PropertyDetails } from "./calculator/types";
import { useAuth } from "@/contexts/AuthContext";

interface CustomFee {
  id: string;
  name: string;
  amount: number;
  is_percentage: boolean;
}

export const NetProceedsCalculator = () => {
  const { user } = useAuth();
  const { toast } = useToast();
  const [customFees, setCustomFees] = useState<CustomFee[]>([]);
  const [details, setDetails] = useState<PropertyDetails>({
    sellerName: "",
    propertyAddress: "",
    purchasePrice: 0,
    taxesApprox: 0,
    docStampsDeed: 0,
    ownersTitleInsurance: 0,
    commissionRate: 6,
    commission: 0,
    complianceAudit: 0,
    serviceTech: 0,
    termiteInspection: 0,
    fhaVaFees: 0,
    survey: 0,
    hoa: 0,
    homeWarranty: 0,
    buyersClosingCost: 0,
    repairs: 0,
    searchExamClosingFee: 0,
    sellerPayingTitle: false,
    firstMortgage: 0,
    secondMortgage: 0,
  });

  const [dialogOpen, setDialogOpen] = useState(false);

  useEffect(() => {
    const fetchSettings = async () => {
      if (!user) return;

      const { data: settingsData, error: settingsError } = await supabase
        .from('settings')
        .select('*')
        .eq('user_id', user.id)
        .single();

      if (settingsError) {
        console.error('Error fetching settings:', settingsError);
        return;
      }

      if (settingsData) {
        console.log('Fetched settings:', settingsData);
        // Update commission rate if it exists in settings
        if (settingsData.commission) {
          const commissionRate = parseFloat(settingsData.commission);
          if (!isNaN(commissionRate)) {
            setDetails(prev => ({
              ...prev,
              commissionRate: commissionRate
            }));
          }
        }

        // Update search/exam/closing fee if it exists in settings
        if (settingsData.search_exam_closing_fee) {
          const searchExamFee = parseFloat(settingsData.search_exam_closing_fee);
          if (!isNaN(searchExamFee)) {
            setDetails(prev => ({
              ...prev,
              searchExamClosingFee: searchExamFee
            }));
          }
        }

        // Store settings in localStorage for title insurance calculations
        localStorage.setItem('agent_settings', JSON.stringify({
          titleInsuranceRates: settingsData.title_insurance_rates || [],
          state: 'Florida'
        }));
      }
    };

    const fetchCustomFees = async () => {
      const { data, error } = await supabase
        .from('custom_fees')
        .select('*')
        .order('created_at', { ascending: true });

      if (error) {
        console.error('Error fetching custom fees:', error);
        return;
      }

      console.log('Fetched custom fees:', data);
      setCustomFees(data || []);
    };

    fetchSettings();
    fetchCustomFees();
  }, [user]);

  useEffect(() => {
    if (details.purchasePrice > 0) {
      const calculatedCommission = calculateCommission(details.purchasePrice, details.commissionRate);
      console.log("Updating commission amount:", calculatedCommission);
      onInputChange("commission", calculatedCommission);
    }
  }, [details.purchasePrice, details.commissionRate]);

  const calculateResults = () => {
    const calculatedCommission = calculateCommission(details.purchasePrice, details.commissionRate);
    const detailsWithCommission = { ...details, commission: calculatedCommission };
    const totalClosingCosts = calculateTotalClosingCosts(
      detailsWithCommission,
      customFees,
      details.purchasePrice
    );
    const netProceeds = calculateNetProceeds(
      details.purchasePrice,
      totalClosingCosts,
      details.firstMortgage,
      details.secondMortgage
    );

    toast({
      title: "Calculation Complete",
      description: `Estimated Net Proceeds: $${netProceeds.toLocaleString()}`,
    });
  };

  const onInputChange = (field: keyof PropertyDetails, value: string | number | boolean) => {
    setDetails(prev => ({
      ...prev,
      [field]: value,
    }));
  };

  const handlePdfFieldsSubmit = (selectedFields: Array<keyof PropertyDetails>) => {
    console.log("Selected fields for PDF:", selectedFields);
    console.log("Details to include:", selectedFields.map(field => ({ [field]: details[field] })));
    
    toast({
      title: "PDF Generation Started",
      description: `Generating PDF with ${selectedFields.length} selected fields.`,
    });
  };

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <PropertyInformation details={details} onInputChange={onInputChange} />
        <CommissionDetails details={details} onInputChange={onInputChange} />
        <ClosingCosts details={details} onInputChange={onInputChange} />
        <AdditionalFees details={details} onInputChange={onInputChange} />
        <AdditionalServices details={details} onInputChange={onInputChange} />
        <CustomFeesSection details={details} customFees={customFees} />
        <OtherCosts details={details} onInputChange={onInputChange} />
        <MortgageInformation details={details} onInputChange={onInputChange} />
      </div>

      <div className="flex justify-end gap-4 mt-6">
        <Button onClick={calculateResults} variant="outline">
          Calculate Net Proceeds
        </Button>
        <Button onClick={() => setDialogOpen(true)}>
          Generate PDF Report
        </Button>
      </div>

      <PdfFieldsDialog
        open={dialogOpen}
        onOpenChange={setDialogOpen}
        details={details}
        onSubmit={handlePdfFieldsSubmit}
        customFees={customFees}
      />
    </div>
  );
};