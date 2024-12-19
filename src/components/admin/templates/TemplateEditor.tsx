import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/components/ui/use-toast";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Plus } from "lucide-react";
import { DragDropContext, Droppable, Draggable } from "@hello-pangea/dnd";
import { Template, Section, Field, TemplateData } from "@/types/template";
import { TemplateHeader } from "./editor/TemplateHeader";
import { TemplateSection } from "./editor/TemplateSection";

export const TemplateEditor = () => {
  const { id } = useParams();
  const { toast } = useToast();
  const queryClient = useQueryClient();
  
  const [template, setTemplate] = useState<Template | null>(null);

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
      // Convert sections to JSON-compatible format before saving
      const templateDataToSave: Partial<TemplateData> = {
        ...updatedTemplate,
        sections: JSON.parse(JSON.stringify(updatedTemplate.sections)),
      };

      const { error } = await supabase
        .from('document_templates')
        .update(templateDataToSave)
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
      try {
        // Parse sections from JSON if needed
        const parsedSections: Section[] = Array.isArray(templateData.sections) 
          ? templateData.sections.map((section: any) => ({
              id: section.id || crypto.randomUUID(),
              name: section.name || '',
              fields: Array.isArray(section.fields) 
                ? section.fields.map((field: any) => ({
                    id: field.id || crypto.randomUUID(),
                    name: field.name || '',
                    type: field.type || 'text',
                    required: field.required || false,
                    options: field.options || []
                  }))
                : []
            }))
          : [];

        setTemplate({
          ...templateData,
          sections: parsedSections,
          description: templateData.description || '',
        });
      } catch (error) {
        console.error('Error parsing template data:', error);
        toast({
          title: "Error",
          description: "Failed to parse template data",
          variant: "destructive",
        });
      }
    }
  }, [templateData, toast]);

  const handleSave = async () => {
    if (!template) return;

    updateTemplateMutation.mutate(template);
  };

  const addSection = () => {
    if (!template) return;
    
    const newSection: Section = {
      id: crypto.randomUUID(),
      name: "New Section",
      fields: []
    };
    
    setTemplate({
      ...template,
      sections: [...template.sections, newSection]
    });
  };

  const updateSection = (sectionId: string, updates: Partial<Section>) => {
    if (!template) return;
    
    setTemplate({
      ...template,
      sections: template.sections.map(section =>
        section.id === sectionId
          ? { ...section, ...updates }
          : section
      )
    });
  };

  const deleteSection = (sectionId: string) => {
    if (!template) return;
    
    setTemplate({
      ...template,
      sections: template.sections.filter(s => s.id !== sectionId)
    });
  };

  const addField = (sectionId: string) => {
    if (!template) return;
    
    const newField: Field = {
      id: crypto.randomUUID(),
      name: "New Field",
      type: "text",
      required: false
    };
    
    setTemplate({
      ...template,
      sections: template.sections.map(section => 
        section.id === sectionId 
          ? { ...section, fields: [...section.fields, newField] }
          : section
      )
    });
  };

  const updateField = (sectionId: string, fieldId: string, updates: Partial<Field>) => {
    if (!template) return;
    
    setTemplate({
      ...template,
      sections: template.sections.map(section => 
        section.id === sectionId 
          ? {
              ...section,
              fields: section.fields.map(field =>
                field.id === fieldId
                  ? { ...field, ...updates }
                  : field
              )
            }
          : section
      )
    });
  };

  const deleteField = (sectionId: string, fieldId: string) => {
    if (!template) return;
    
    setTemplate({
      ...template,
      sections: template.sections.map(section =>
        section.id === sectionId
          ? {
              ...section,
              fields: section.fields.filter(f => f.id !== fieldId)
            }
          : section
      )
    });
  };

  const handleDragEnd = (result: any) => {
    if (!result.destination || !template) return;

    const sections = Array.from(template.sections);
    const [reorderedSection] = sections.splice(result.source.index, 1);
    sections.splice(result.destination.index, 0, reorderedSection);

    setTemplate({
      ...template,
      sections
    });
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
        <TemplateHeader
          template={template}
          onTemplateChange={(updates) => setTemplate({ ...template, ...updates })}
          onSave={handleSave}
        />
      </Card>

      <Card className="p-6">
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-lg font-medium">Template Sections</h3>
          <Button onClick={addSection}>
            <Plus className="mr-2 h-4 w-4" />
            Add Section
          </Button>
        </div>

        <DragDropContext onDragEnd={handleDragEnd}>
          <Droppable droppableId="sections">
            {(provided) => (
              <div
                {...provided.droppableProps}
                ref={provided.innerRef}
                className="space-y-4"
              >
                {template.sections.map((section, index) => (
                  <Draggable
                    key={section.id}
                    draggableId={section.id}
                    index={index}
                  >
                    {(provided) => (
                      <Card
                        ref={provided.innerRef}
                        {...provided.draggableProps}
                      >
                        <TemplateSection
                          section={section}
                          dragHandleProps={provided.dragHandleProps}
                          onUpdate={(updates) => updateSection(section.id, updates)}
                          onDelete={() => deleteSection(section.id)}
                          onAddField={() => addField(section.id)}
                          onUpdateField={(fieldId, updates) => updateField(section.id, fieldId, updates)}
                          onDeleteField={(fieldId) => deleteField(section.id, fieldId)}
                        />
                      </Card>
                    )}
                  </Draggable>
                ))}
                {provided.placeholder}
              </div>
            )}
          </Droppable>
        </DragDropContext>
      </Card>
    </div>
  );
};
