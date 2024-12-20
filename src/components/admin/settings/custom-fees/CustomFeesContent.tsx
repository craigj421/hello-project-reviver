import { CustomFee, NewFee } from "@/hooks/useCustomFees";
import { FeesTable } from "./FeesTable";
import { NewFeeForm } from "./NewFeeForm";

interface CustomFeesContentProps {
  fees: CustomFee[];
  onDelete: (id: string) => void;
  onAdd: (fee: NewFee) => void;
}

export const CustomFeesContent = ({ fees, onDelete, onAdd }: CustomFeesContentProps) => {
  return (
    <>
      <FeesTable fees={fees} onDelete={onDelete} />
      <NewFeeForm onSubmit={onAdd} />
    </>
  );
};