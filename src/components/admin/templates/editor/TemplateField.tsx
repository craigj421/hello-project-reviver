import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Field } from "@/types/template";

interface TemplateFieldProps {
  field: Field;
  onUpdate: (updates: Partial<Field>) => void;
  onDelete: () => void;
}

export const TemplateField = ({ field, onUpdate, onDelete }: TemplateFieldProps) => {
  return (
    <div className="flex items-center gap-4">
      <Input
        value={field.name}
        onChange={(e) => onUpdate({ name: e.target.value })}
        placeholder="Field name"
      />
      <Select
        value={field.type}
        onValueChange={(value: "text" | "number" | "date" | "select") => 
          onUpdate({ type: value })
        }
      >
        <SelectTrigger className="w-[180px]">
          <SelectValue placeholder="Field type" />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="text">Text</SelectItem>
          <SelectItem value="number">Number</SelectItem>
          <SelectItem value="date">Date</SelectItem>
          <SelectItem value="select">Select</SelectItem>
        </SelectContent>
      </Select>
      <Button
        variant="destructive"
        onClick={onDelete}
      >
        Delete
      </Button>
    </div>
  );
};