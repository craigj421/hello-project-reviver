import { Card } from "@/components/ui/card";
import { TemplatesList } from "./templates/TemplatesList";
import { NewTemplateForm } from "./templates/NewTemplateForm";

export const DocumentTemplatesManagement = () => {
  return (
    <Card className="p-6">
      <h2 className="text-xl font-semibold mb-4">Document Templates</h2>
      <div className="space-y-6">
        <NewTemplateForm />
        <TemplatesList />
      </div>
    </Card>
  );
};