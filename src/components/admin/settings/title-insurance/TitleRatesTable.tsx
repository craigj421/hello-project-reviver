import { Button } from "@/components/ui/button";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { TitleRate } from "@/hooks/settingsTypes";

interface TitleRatesTableProps {
  rates: TitleRate[];
  onDelete: (index: number) => void;
}

export const TitleRatesTable = ({ rates, onDelete }: TitleRatesTableProps) => {
  return (
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead>Min Amount ($)</TableHead>
          <TableHead>Max Amount ($)</TableHead>
          <TableHead>Rate per $1,000</TableHead>
          <TableHead>Actions</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {rates.map((rate, index) => (
          <TableRow key={index}>
            <TableCell>{rate.minAmount.toLocaleString()}</TableCell>
            <TableCell>{rate.maxAmount.toLocaleString()}</TableCell>
            <TableCell>${rate.ratePerThousand}</TableCell>
            <TableCell>
              <Button
                variant="destructive"
                size="sm"
                onClick={() => onDelete(index)}
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