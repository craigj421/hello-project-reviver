import { FileText, Save } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Template } from "@/types/template";

interface TemplateHeaderProps {
  template: Template;
  onTemplateChange: (updates: Partial<Template>) => void;
  onSave: () => void;
}

export const TemplateHeader = ({ template, onTemplateChange, onSave }: TemplateHeaderProps) => {
  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center gap-2">
          <FileText className="h-5 w-5" />
          <h2 className="text-xl font-semibold">Edit Template</h2>
        </div>
        <Button onClick={onSave}>
          <Save className="mr-2 h-4 w-4" />
          Save Changes
        </Button>
      </div>

      <div className="space-y-4">
        <div>
          <Label htmlFor="name">Template Name</Label>
          <Input
            id="name"
            value={template.name}
            onChange={(e) => onTemplateChange({ name: e.target.value })}
          />
        </div>

        <div>
          <Label htmlFor="description">Description</Label>
          <Textarea
            id="description"
            value={template.description}
            onChange={(e) => onTemplateChange({ description: e.target.value })}
          />
        </div>
      </div>
    </div>
  );
};