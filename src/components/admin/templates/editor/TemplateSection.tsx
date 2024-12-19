import { GripVertical, Plus } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Section, Field } from "@/types/template";
import { TemplateField } from "./TemplateField";

interface TemplateSectionProps {
  section: Section;
  dragHandleProps?: any;
  onUpdate: (updates: Partial<Section>) => void;
  onDelete: () => void;
  onAddField: () => void;
  onUpdateField: (fieldId: string, updates: Partial<Field>) => void;
  onDeleteField: (fieldId: string) => void;
}

export const TemplateSection = ({
  section,
  dragHandleProps,
  onUpdate,
  onDelete,
  onAddField,
  onUpdateField,
  onDeleteField,
}: TemplateSectionProps) => {
  return (
    <div className="p-4">
      <div className="flex items-center gap-4 mb-4">
        <div {...dragHandleProps}>
          <GripVertical className="h-5 w-5 text-gray-400" />
        </div>
        <Input
          value={section.name}
          onChange={(e) => onUpdate({ name: e.target.value })}
        />
        <Button
          variant="outline"
          onClick={onAddField}
        >
          <Plus className="h-4 w-4 mr-1" />
          Add Field
        </Button>
        <Button
          variant="destructive"
          onClick={onDelete}
        >
          Delete
        </Button>
      </div>

      <div className="space-y-4 pl-9">
        {section.fields.map((field) => (
          <TemplateField
            key={field.id}
            field={field}
            onUpdate={(updates) => onUpdateField(field.id, updates)}
            onDelete={() => onDeleteField(field.id)}
          />
        ))}
      </div>
    </div>
  );
};