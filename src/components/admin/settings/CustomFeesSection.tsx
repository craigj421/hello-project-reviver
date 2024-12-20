import { useState, useEffect } from "react";
import { Label } from "@/components/ui/label";
import { useToast } from "@/components/ui/use-toast";
import { supabase } from "@/integrations/supabase/client";
import { useAuth } from "@/contexts/AuthContext";
import { CustomFeesContent } from "./custom-fees/CustomFeesContent";

interface CustomFee {
  id: string;
  name: string;
  amount: number;
  description: string;
  is_percentage: boolean;
}

interface NewFee {
  name: string;
  amount: number;
  description: string;
  is_percentage: boolean;
}

export const CustomFeesSection = () => {
  const { user } = useAuth();
  const { toast } = useToast();
  const [fees, setFees] = useState<CustomFee[]>([]);
  
  const fetchFees = async () => {
    if (!user) return;
    
    const { data, error } = await supabase
      .from('custom_fees')
      .select('*')
      .order('created_at', { ascending: true });
      
    if (error) {
      console.error('Error fetching custom fees:', error);
      toast({
        title: "Error",
        description: "Failed to load custom fees",
        variant: "destructive",
      });
      return;
    }
    
    setFees(data || []);
  };
  
  const addFee = async (newFee: NewFee) => {
    if (!user) return;
    
    const { error } = await supabase
      .from('custom_fees')
      .insert([{
        ...newFee,
        user_id: user.id,
      }]);
      
    if (error) {
      console.error('Error adding custom fee:', error);
      toast({
        title: "Error",
        description: "Failed to add custom fee",
        variant: "destructive",
      });
      return;
    }
    
    toast({
      title: "Success",
      description: "Custom fee added successfully",
    });
    
    fetchFees();
  };
  
  const deleteFee = async (id: string) => {
    const { error } = await supabase
      .from('custom_fees')
      .delete()
      .eq('id', id);
      
    if (error) {
      console.error('Error deleting custom fee:', error);
      toast({
        title: "Error",
        description: "Failed to delete custom fee",
        variant: "destructive",
      });
      return;
    }
    
    toast({
      title: "Success",
      description: "Custom fee deleted successfully",
    });
    
    fetchFees();
  };
  
  useEffect(() => {
    fetchFees();
  }, [user]);

  return (
    <div className="space-y-4">
      <Label>Custom Fees</Label>
      <CustomFeesContent 
        fees={fees}
        onDelete={deleteFee}
        onAdd={addFee}
      />
    </div>
  );
};