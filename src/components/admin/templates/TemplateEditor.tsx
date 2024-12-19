import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/components/ui/use-toast";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Card } from "@/components/ui/card";
import { FileText, Save } from "lucide-react";

interface Template {
  id: string;
  name: string;
  description: string;
  sections: any;
  template_data: any;
}

export const TemplateEditor = () => {
  const { id } = useParams();
  const { toast } = useToast();
  const queryClient = useQueryClient();
  
  const [template, setTemplate] = useState<Template | null>(null);
  const [sections, setSections] = useState<any[]>([]);

  const { data: templateData, isLoading } = useQuery({
    queryKey: ['template', id],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('document_templates')
        .select('*')
        .eq('id', id)
        .single();

      if (error) {
        console.error('Error fetching template:', error);
        throw error;
      }

      return data;
    },
  });

  const updateTemplateMutation = useMutation({
    mutationFn: async (updatedTemplate: Partial<Template>) => {
      const { error } = await supabase
        .from('document_templates')
        .update(updatedTemplate)
        .eq('id', id);

      if (error) throw error;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['template', id] });
      toast({
        title: "Success",
        description: "Template updated successfully",
      });
    },
    onError: (error) => {
      console.error('Error updating template:', error);
      toast({
        title: "Error",
        description: "Failed to update template",
        variant: "destructive",
      });
    },
  });

  useEffect(() => {
    if (templateData) {
      setTemplate(templateData);
      setSections(templateData.sections || []);
    }
  }, [templateData]);

  const handleSave = async () => {
    if (!template) return;

    updateTemplateMutation.mutate({
      ...template,
      sections,
    });
  };

  const addSection = () => {
    setSections([...sections, {
      id: crypto.randomUUID(),
      name: "New Section",
      fields: []
    }]);
  };

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (!template) {
    return <div>Template not found</div>;
  }

  return (
    <div className="space-y-6">
      <Card className="p-6">
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center gap-2">
            <FileText className="h-5 w-5" />
            <h2 className="text-xl font-semibold">Edit Template</h2>
          </div>
          <Button onClick={handleSave}>
            <Save className="mr-2" />
            Save Changes
          </Button>
        </div>

        <div className="space-y-4">
          <div>
            <Label htmlFor="name">Template Name</Label>
            <Input
              id="name"
              value={template.name}
              onChange={(e) => setTemplate({ ...template, name: e.target.value })}
            />
          </div>

          <div>
            <Label htmlFor="description">Description</Label>
            <Textarea
              id="description"
              value={template.description}
              onChange={(e) => setTemplate({ ...template, description: e.target.value })}
            />
          </div>
        </div>
      </Card>

      <Card className="p-6">
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-lg font-medium">Template Sections</h3>
          <Button onClick={addSection}>Add Section</Button>
        </div>

        <div className="space-y-4">
          {sections.map((section, index) => (
            <Card key={section.id} className="p-4">
              <div className="flex items-center gap-4">
                <Input
                  value={section.name}
                  onChange={(e) => {
                    const newSections = [...sections];
                    newSections[index] = {
                      ...section,
                      name: e.target.value
                    };
                    setSections(newSections);
                  }}
                />
                <Button
                  variant="destructive"
                  onClick={() => {
                    setSections(sections.filter(s => s.id !== section.id));
                  }}
                >
                  Delete
                </Button>
              </div>
            </Card>
          ))}
        </div>
      </Card>
    </div>
  );
};