import { Button } from "@/components/ui/button";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";

interface CustomFee {
  id: string;
  name: string;
  amount: number;
  description: string;
  is_percentage: boolean;
}

interface FeesTableProps {
  fees: CustomFee[];
  onDelete: (id: string) => void;
}

export const FeesTable = ({ fees, onDelete }: FeesTableProps) => {
  return (
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
                onClick={() => onDelete(fee.id)}
              >
                Delete
              </Button>
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
};