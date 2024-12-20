import { useState, useEffect } from "react";
import { useToast } from "@/components/ui/use-toast";
import { supabase } from "@/integrations/supabase/client";
import { useAuth } from "@/contexts/AuthContext";
import { FeesTable } from "./FeesTable";
import { NewFeeForm } from "./NewFeeForm";

interface CustomFee {
  id: string;
  name: string;
  amount: number;
  description: string;
  is_percentage: boolean;
}

interface CustomFeesContentProps {
  fees: CustomFee[];
  onDelete: (id: string) => void;
  onAdd: (fee: Omit<CustomFee, 'id'>) => void;
}

export const CustomFeesContent = ({ fees, onDelete, onAdd }: CustomFeesContentProps) => {
  return (
    <>
      <FeesTable fees={fees} onDelete={onDelete} />
      <NewFeeForm onSubmit={onAdd} />
    </>
  );
};