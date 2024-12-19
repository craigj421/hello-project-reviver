import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { DragDropContext, Droppable, Draggable } from "@hello-pangea/dnd";
import { Plus } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Template, Section, Field } from "@/types/template";
import { TemplateHeader } from "./editor/TemplateHeader";
import { TemplateSection } from "./editor/TemplateSection";
import { useTemplateData } from "./hooks/useTemplateData";
import {
  addSection,
  updateSection,
  deleteSection,
  addField,
  updateField,
  deleteField,
  reorderSections
} from "./utils/templateOperations";

export const TemplateEditor = () => {
  console.log("TemplateEditor component mounted");
  const { id } = useParams();
  console.log("Template ID from params:", id);
  
  const [template, setTemplate] = useState<Template | null>(null);
  const { templateData, isLoading, updateTemplate } = useTemplateData(id!);

  useEffect(() => {
    console.log("useEffect triggered with templateData:", templateData);
    
    if (templateData) {
      try {
        console.log("Starting to parse template sections");
        // Parse sections from JSON if needed
        const parsedSections: Section[] = Array.isArray(templateData.sections) 
          ? templateData.sections.map((section: any) => {
              console.log("Parsing section:", section);
              return {
                id: section.id || crypto.randomUUID(),
                name: section.name || '',
                fields: Array.isArray(section.fields) 
                  ? section.fields.map((field: any) => {
                      console.log("Parsing field:", field);
                      return {
                        id: field.id || crypto.randomUUID(),
                        name: field.name || '',
                        type: field.type || 'text',
                        required: field.required || false,
                        options: field.options || []
                      };
                    })
                  : []
              };
            })
          : [];
        
        console.log("Parsed sections:", parsedSections);

        setTemplate({
          ...templateData,
          sections: parsedSections,
          description: templateData.description || '',
        });
        console.log("Template state updated successfully");
      } catch (error) {
        console.error('Error parsing template data:', error);
      }
    }
  }, [templateData]);

  const handleSave = async () => {
    console.log("Save triggered with template:", template);
    if (!template) return;
    updateTemplate(template);
  };

  const handleDragEnd = (result: any) => {
    console.log("Drag end triggered with result:", result);
    if (!result.destination || !template) return;
    
    const updatedTemplate = reorderSections(
      template,
      result.source.index,
      result.destination.index
    );
    setTemplate(updatedTemplate);
  };

  if (isLoading) {
    console.log("Template editor is loading");
    return <div>Loading...</div>;
  }

  if (!template) {
    console.log("No template found");
    return <div>Template not found</div>;
  }

  console.log("Rendering template:", template);
  return (
    <div className="space-y-6">
      <Card className="p-6">
        <TemplateHeader
          template={template}
          onTemplateChange={(updates) => {
            console.log("Template header updates:", updates);
            setTemplate({ ...template, ...updates });
          }}
          onSave={handleSave}
        />
      </Card>

      <Card className="p-6">
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-lg font-medium">Template Sections</h3>
          <Button onClick={() => {
            console.log("Adding new section");
            setTemplate(addSection(template));
          }}>
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
                          onUpdate={(updates) => setTemplate(updateSection(template, section.id, updates))}
                          onDelete={() => setTemplate(deleteSection(template, section.id))}
                          onAddField={() => setTemplate(addField(template, section.id))}
                          onUpdateField={(fieldId, updates) => setTemplate(updateField(template, section.id, fieldId, updates))}
                          onDeleteField={(fieldId) => setTemplate(deleteField(template, section.id, fieldId))}
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