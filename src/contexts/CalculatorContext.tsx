import { createContext, useContext, useState, useEffect } from "react";
import { PropertyDetails } from "@/components/calculator/types";
import { useCalculatorSettings } from "@/hooks/useCalculatorSettings";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/components/ui/use-toast";
import { 
  calculateCommission,
  calculateTotalClosingCosts,
  calculateNetProceeds
} from "@/utils/netProceedsCalculations";

interface CustomFee {
  id: string;
  name: string;
  amount: number;
  is_percentage: boolean;
}

interface CalculatorContextType {
  details: PropertyDetails;
  customFees: CustomFee[];
  onInputChange: (field: keyof PropertyDetails, value: string | number | boolean) => void;
  calculateResults: () => void;
  dialogOpen: boolean;
  setDialogOpen: (open: boolean) => void;
  handlePdfFieldsSubmit: (selectedFields: Array<keyof PropertyDetails>) => void;
}

const CalculatorContext = createContext<CalculatorContextType | undefined>(undefined);

export const CalculatorProvider = ({ children }: { children: React.ReactNode }) => {
  const { toast } = useToast();
  const { settings } = useCalculatorSettings();
  const [customFees, setCustomFees] = useState<CustomFee[]>([]);
  const [dialogOpen, setDialogOpen] = useState(false);
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

  useEffect(() => {
    if (settings) {
      if (settings.commission) {
        const commissionRate = parseFloat(settings.commission);
        if (!isNaN(commissionRate)) {
          setDetails(prev => ({
            ...prev,
            commissionRate: commissionRate
          }));
        }
      }

      if (settings.search_exam_closing_fee) {
        const searchExamFee = parseFloat(settings.search_exam_closing_fee);
        if (!isNaN(searchExamFee)) {
          setDetails(prev => ({
            ...prev,
            searchExamClosingFee: searchExamFee
          }));
        }
      }
    }
  }, [settings]);

  useEffect(() => {
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

    fetchCustomFees();
  }, []);

  useEffect(() => {
    if (details.purchasePrice > 0) {
      const calculatedCommission = calculateCommission(details.purchasePrice, details.commissionRate);
      console.log("Updating commission amount:", calculatedCommission);
      onInputChange("commission", calculatedCommission);
    }
  }, [details.purchasePrice, details.commissionRate]);

  const onInputChange = (field: keyof PropertyDetails, value: string | number | boolean) => {
    setDetails(prev => ({
      ...prev,
      [field]: value,
    }));
  };

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

  const handlePdfFieldsSubmit = (selectedFields: Array<keyof PropertyDetails>) => {
    console.log("Selected fields for PDF:", selectedFields);
    console.log("Details to include:", selectedFields.map(field => ({ [field]: details[field] })));
    
    toast({
      title: "PDF Generation Started",
      description: `Generating PDF with ${selectedFields.length} selected fields.`,
    });
  };

  return (
    <CalculatorContext.Provider 
      value={{ 
        details, 
        customFees, 
        onInputChange, 
        calculateResults, 
        dialogOpen, 
        setDialogOpen,
        handlePdfFieldsSubmit 
      }}
    >
      {children}
    </CalculatorContext.Provider>
  );
};

export const useCalculator = () => {
  const context = useContext(CalculatorContext);
  if (context === undefined) {
    throw new Error('useCalculator must be used within a CalculatorProvider');
  }
  return context;
};