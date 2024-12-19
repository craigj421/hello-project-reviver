import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { useToast } from "@/components/ui/use-toast";
import { supabase } from "@/integrations/supabase/client";
import { useAuth } from "@/contexts/AuthContext";

interface CustomFee {
  id: string;
  name: string;
  amount: number;
  description: string;
  is_percentage: boolean;
}

export const CustomFeesSection = () => {
  const { user } = useAuth();
  const { toast } = useToast();
  const [fees, setFees] = useState<CustomFee[]>([]);
  const [newFee, setNewFee] = useState<Omit<CustomFee, 'id'>>({
    name: '',
    amount: 0,
    description: '',
    is_percentage: false,
  });
  
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
  
  const addFee = async () => {
    if (!user || !newFee.name || newFee.amount < 0) return;
    
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
    
    setNewFee({
      name: '',
      amount: 0,
      description: '',
      is_percentage: false,
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
  
  useState(() => {
    fetchFees();
  }, [user]);

  return (
    <div className="space-y-4">
      <Label>Custom Fees</Label>
      
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Name</TableHead>
            <TableHead>Amount</TableHead>
            <TableHead>Type</TableHead>
            <TableHead>Description</TableHead>
            <TableHead>Actions</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {fees.map((fee) => (
            <TableRow key={fee.id}>
              <TableCell>{fee.name}</TableCell>
              <TableCell>{fee.amount}</TableCell>
              <TableCell>{fee.is_percentage ? '%' : '$'}</TableCell>
              <TableCell>{fee.description}</TableCell>
              <TableCell>
                <Button
                  variant="destructive"
                  size="sm"
                  onClick={() => deleteFee(fee.id)}
                >
                  Delete
                </Button>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>

      <div className="grid grid-cols-5 gap-4">
        <div>
          <Label>Name</Label>
          <Input
            value={newFee.name}
            onChange={(e) => setNewFee({ ...newFee, name: e.target.value })}
            placeholder="Fee name"
          />
        </div>
        <div>
          <Label>Amount</Label>
          <Input
            type="number"
            value={newFee.amount}
            onChange={(e) => setNewFee({ ...newFee, amount: parseFloat(e.target.value) || 0 })}
            placeholder="Amount"
          />
        </div>
        <div className="flex items-center space-x-2 pt-6">
          <Switch
            id="is-percentage"
            checked={newFee.is_percentage}
            onCheckedChange={(checked) => setNewFee({ ...newFee, is_percentage: checked })}
          />
          <Label htmlFor="is-percentage">Is Percentage?</Label>
        </div>
        <div>
          <Label>Description</Label>
          <Input
            value={newFee.description}
            onChange={(e) => setNewFee({ ...newFee, description: e.target.value })}
            placeholder="Description"
          />
        </div>
        <div className="flex items-end">
          <Button onClick={addFee} className="w-full">Add Fee</Button>
        </div>
      </div>
    </div>
  );
};