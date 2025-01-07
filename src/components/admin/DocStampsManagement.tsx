import { Card } from "@/components/ui/card";
import { useEffect, useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import { useAuth } from "@/contexts/AuthContext";
import { Button } from "@/components/ui/button";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { useToast } from "@/components/ui/use-toast";

interface DocStampState {
  id: string;
  name: string;
  base_rate: number;
  calculation_method: string;
  minimum_fee: number;
}

export const DocStampsManagement = () => {
  const { user } = useAuth();
  const { toast } = useToast();
  const [states, setStates] = useState<DocStampState[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchStates();
  }, [user]);

  const fetchStates = async () => {
    try {
      const { data, error } = await supabase
        .from('doc_stamp_states')
        .select('*');

      if (error) throw error;

      setStates(data || []);
    } catch (error) {
      console.error('Error fetching states:', error);
      toast({
        title: "Error",
        description: "Failed to fetch doc stamp states",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  const initializeFloridaData = async () => {
    try {
      if (!user?.id) return;
      
      const { error } = await supabase.rpc('initialize_florida_data', {
        user_id_param: user.id
      });

      if (error) throw error;

      toast({
        title: "Success",
        description: "Florida data initialized successfully",
      });

      await fetchStates();
    } catch (error) {
      console.error('Error initializing Florida data:', error);
      toast({
        title: "Error",
        description: "Failed to initialize Florida data",
        variant: "destructive",
      });
    }
  };

  return (
    <Card className="p-6">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-xl font-semibold">Doc Stamps Management</h2>
        {states.length === 0 && (
          <Button onClick={initializeFloridaData}>
            Initialize Florida Data
          </Button>
        )}
      </div>

      {loading ? (
        <div>Loading...</div>
      ) : (
        <div className="border rounded-md">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>State</TableHead>
                <TableHead>Base Rate</TableHead>
                <TableHead>Calculation Method</TableHead>
                <TableHead>Minimum Fee</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {states.map((state) => (
                <TableRow key={state.id}>
                  <TableCell>{state.name}</TableCell>
                  <TableCell>${state.base_rate}</TableCell>
                  <TableCell>{state.calculation_method}</TableCell>
                  <TableCell>${state.minimum_fee}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      )}
    </Card>
  );
};