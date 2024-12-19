import { Template, Section, Field } from "@/types/template";

export const addSection = (template: Template): Template => {
  const newSection: Section = {
    id: crypto.randomUUID(),
    name: "New Section",
    fields: []
  };
  
  return {
    ...template,
    sections: [...template.sections, newSection]
  };
};

export const updateSection = (template: Template, sectionId: string, updates: Partial<Section>): Template => {
  return {
    ...template,
    sections: template.sections.map(section =>
      section.id === sectionId
        ? { ...section, ...updates }
        : section
    )
  };
};

export const deleteSection = (template: Template, sectionId: string): Template => {
  return {
    ...template,
    sections: template.sections.filter(s => s.id !== sectionId)
  };
};

export const addField = (template: Template, sectionId: string): Template => {
  const newField: Field = {
    id: crypto.randomUUID(),
    name: "New Field",
    type: "text",
    required: false
  };
  
  return {
    ...template,
    sections: template.sections.map(section => 
      section.id === sectionId 
        ? { ...section, fields: [...section.fields, newField] }
        : section
    )
  };
};

export const updateField = (
  template: Template,
  sectionId: string,
  fieldId: string,
  updates: Partial<Field>
): Template => {
  return {
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
  };
};

export const deleteField = (template: Template, sectionId: string, fieldId: string): Template => {
  return {
    ...template,
    sections: template.sections.map(section =>
      section.id === sectionId
        ? {
            ...section,
            fields: section.fields.filter(f => f.id !== fieldId)
          }
        : section
    )
  };
};

export const reorderSections = (template: Template, sourceIndex: number, destinationIndex: number): Template => {
  const sections = Array.from(template.sections);
  const [reorderedSection] = sections.splice(sourceIndex, 1);
  sections.splice(destinationIndex, 0, reorderedSection);

  return {
    ...template,
    sections
  };
};