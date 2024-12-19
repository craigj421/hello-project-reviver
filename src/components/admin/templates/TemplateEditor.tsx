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
import { FileText, Save, Plus, GripVertical } from "lucide-react";
import { DragDropContext, Droppable, Draggable } from "@hello-pangea/dnd";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

interface Template {
  id: string;
  name: string;
  description: string;
  sections: Section[];
  template_data: any;
}

interface Section {
  id: string;
  name: string;
  fields: Field[];
}

interface Field {
  id: string;
  name: string;
  type: "text" | "number" | "date" | "select";
  required: boolean;
  options?: string[];
}

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
      setTemplate({
        ...templateData,
        sections: templateData.sections || [],
      });
    }
  }, [templateData]);

  const handleSave = async () => {
    if (!template) return;

    updateTemplateMutation.mutate({
      ...template,
      sections: template.sections,
    });
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
                        className="p-4"
                      >
                        <div className="flex items-center gap-4 mb-4">
                          <div {...provided.dragHandleProps}>
                            <GripVertical className="h-5 w-5 text-gray-400" />
                          </div>
                          <Input
                            value={section.name}
                            onChange={(e) => {
                              const newSections = [...template.sections];
                              newSections[index] = {
                                ...section,
                                name: e.target.value
                              };
                              setTemplate({
                                ...template,
                                sections: newSections
                              });
                            }}
                          />
                          <Button
                            variant="outline"
                            onClick={() => addField(section.id)}
                          >
                            Add Field
                          </Button>
                          <Button
                            variant="destructive"
                            onClick={() => {
                              setTemplate({
                                ...template,
                                sections: template.sections.filter(s => s.id !== section.id)
                              });
                            }}
                          >
                            Delete
                          </Button>
                        </div>

                        <div className="space-y-4 pl-9">
                          {section.fields.map((field) => (
                            <div key={field.id} className="flex items-center gap-4">
                              <Input
                                value={field.name}
                                onChange={(e) => updateField(section.id, field.id, { name: e.target.value })}
                                placeholder="Field name"
                              />
                              <Select
                                value={field.type}
                                onValueChange={(value: "text" | "number" | "date" | "select") => 
                                  updateField(section.id, field.id, { type: value })
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
                                onClick={() => {
                                  setTemplate({
                                    ...template,
                                    sections: template.sections.map(s =>
                                      s.id === section.id
                                        ? {
                                            ...s,
                                            fields: s.fields.filter(f => f.id !== field.id)
                                          }
                                        : s
                                    )
                                  });
                                }}
                              >
                                Delete
                              </Button>
                            </div>
                          ))}
                        </div>
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