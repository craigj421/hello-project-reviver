import { useState, useEffect } from "react";
import { useToast } from "@/components/ui/use-toast";
import { supabase } from "@/integrations/supabase/client";
import { useAuth } from "@/contexts/AuthContext";

export interface CustomFee {
  id: string;
  name: string;
  amount: number;
  description: string;
  is_percentage: boolean;
}

export interface NewFee {
  name: string;
  amount: number;
  description: string;
  is_percentage: boolean;
}

export const useCustomFees = () => {
  const { user } = useAuth();
  const { toast } = useToast();
  const [fees, setFees] = useState<CustomFee[]>([]);
  const [loading, setLoading] = useState(true);

  const fetchFees = async () => {
    if (!user) return;
    
    console.log("Fetching custom fees for user:", user.id);
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
    
    console.log("Retrieved custom fees:", data);
    setFees(data || []);
    setLoading(false);
  };
  
  const addFee = async (newFee: NewFee) => {
    if (!user) return;
    
    console.log("Adding new custom fee:", newFee);
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
    
    await fetchFees();
  };
  
  const deleteFee = async (id: string) => {
    console.log("Deleting custom fee with ID:", id);
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
    
    await fetchFees();
  };

  useEffect(() => {
    fetchFees();
  }, [user]);

  return {
    fees,
    loading,
    addFee,
    deleteFee,
  };
};