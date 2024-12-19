import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/components/ui/use-toast";
import { Template, TemplateData } from "@/types/template";

export const useTemplateData = (id: string) => {
  const { toast } = useToast();
  const queryClient = useQueryClient();

  const { data: templateData, isLoading } = useQuery({
    queryKey: ['template', id],
    queryFn: async () => {
      console.log("Fetching template data for ID:", id);
      const { data, error } = await supabase
        .from('document_templates')
        .select('*')
        .eq('id', id)
        .single();

      if (error) {
        console.error('Error fetching template:', error);
        throw error;
      }

      console.log("Template data received from Supabase:", data);
      return data;
    },
  });

  const updateTemplateMutation = useMutation({
    mutationFn: async (updatedTemplate: Partial<Template>) => {
      console.log("Starting template update with data:", updatedTemplate);
      // Convert sections to JSON-compatible format before saving
      const templateDataToSave = {
        name: updatedTemplate.name,
        description: updatedTemplate.description,
        sections: JSON.parse(JSON.stringify(updatedTemplate.sections)),
        template_data: updatedTemplate.template_data,
        is_default: updatedTemplate.is_default
      };

      console.log("Processed template data to save:", templateDataToSave);

      const { error } = await supabase
        .from('document_templates')
        .update(templateDataToSave)
        .eq('id', id);

      if (error) {
        console.error('Error in mutation:', error);
        throw error;
      }
      
      console.log("Template update successful");
    },
    onSuccess: () => {
      console.log("Mutation successful, invalidating queries");
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

  return {
    templateData,
    isLoading,
    updateTemplate: updateTemplateMutation.mutate
  };
};