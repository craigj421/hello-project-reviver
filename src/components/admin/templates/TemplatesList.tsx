import { useQuery } from "@tanstack/react-query";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/components/ui/use-toast";
import { Star, Trash2, FileEdit } from "lucide-react";
import { useNavigate } from "react-router-dom";

interface Template {
  id: string;
  name: string;
  description: string | null;
  is_default: boolean;
  created_at: string;
}

export const TemplatesList = () => {
  const { toast } = useToast();
  const navigate = useNavigate();
  
  const { data: templates, refetch } = useQuery({
    queryKey: ['templates'],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('document_templates')
        .select('*')
        .order('created_at', { ascending: false });
        
      if (error) {
        console.error('Error fetching templates:', error);
        toast({
          title: "Error",
          description: "Failed to load templates",
          variant: "destructive",
        });
        return [];
      }
      
      return data as Template[];
    },
  });

  const handleDelete = async (id: string) => {
    const template = templates?.find(t => t.id === id);
    
    if (template?.is_default) {
      toast({
        title: "Cannot Delete",
        description: "Default templates cannot be deleted",
        variant: "destructive",
      });
      return;
    }

    const { error } = await supabase
      .from('document_templates')
      .delete()
      .eq('id', id);
      
    if (error) {
      console.error('Error deleting template:', error);
      toast({
        title: "Error",
        description: "Failed to delete template",
        variant: "destructive",
      });
      return;
    }
    
    toast({
      title: "Success",
      description: "Template deleted successfully",
    });
    refetch();
  };

  const setAsDefault = async (id: string) => {
    // First, remove default status from all templates
    const { error: updateError } = await supabase
      .from('document_templates')
      .update({ is_default: false })
      .neq('id', id);
      
    if (updateError) {
      console.error('Error updating other templates:', updateError);
      return;
    }

    // Then set the selected template as default
    const { error } = await supabase
      .from('document_templates')
      .update({ is_default: true })
      .eq('id', id);
      
    if (error) {
      console.error('Error setting default template:', error);
      toast({
        title: "Error",
        description: "Failed to set default template",
        variant: "destructive",
      });
      return;
    }
    
    toast({
      title: "Success",
      description: "Default template updated successfully",
    });
    refetch();
  };

  return (
    <div className="border rounded-md">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Name</TableHead>
            <TableHead>Description</TableHead>
            <TableHead>Default</TableHead>
            <TableHead>Actions</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {templates?.map((template) => (
            <TableRow key={template.id}>
              <TableCell>{template.name}</TableCell>
              <TableCell>{template.description}</TableCell>
              <TableCell>{template.is_default ? "Yes" : "No"}</TableCell>
              <TableCell className="space-x-2">
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => navigate(`/admin/templates/${template.id}`)}
                >
                  <FileEdit className="h-4 w-4 mr-1" />
                  Edit
                </Button>
                {!template.is_default && (
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => setAsDefault(template.id)}
                  >
                    <Star className="h-4 w-4 mr-1" />
                    Set Default
                  </Button>
                )}
                {!template.is_default && (
                  <Button
                    variant="destructive"
                    size="sm"
                    onClick={() => handleDelete(template.id)}
                  >
                    <Trash2 className="h-4 w-4" />
                  </Button>
                )}
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
};