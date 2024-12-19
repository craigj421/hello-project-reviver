import { UserManagement } from "@/components/admin/UserManagement";
import { Settings } from "@/components/admin/Settings";
import { Navigation } from "@/components/admin/Navigation";
import { Button } from "@/components/ui/button";
import { useToast } from "@/components/ui/use-toast";
import { supabase } from "@/lib/supabase";

const Admin = () => {
  const { toast } = useToast();

  const handleSubscribe = async () => {
    try {
      const { data: { session } } = await supabase.auth.getSession();
      const { data, error } = await supabase.functions.invoke('create-checkout', {
        headers: {
          Authorization: `Bearer ${session?.access_token}`,
        },
      });

      if (error) throw error;
      if (data?.url) {
        window.location.href = data.url;
      }
    } catch (error) {
      console.error('Error:', error);
      toast({
        title: "Error",
        description: error.message || "Failed to start checkout process",
        variant: "destructive",
      });
    }
  };

  return (
    <div className="container mx-auto p-6">
      <h1 className="text-2xl font-bold mb-6">Admin Dashboard</h1>
      <Navigation />
      <div className="mb-6">
        <Button onClick={handleSubscribe} variant="default">
          Upgrade to Pro
        </Button>
      </div>
      <div className="grid gap-6 md:grid-cols-2">
        <UserManagement />
        <Settings />
      </div>
    </div>
  );
};

export default Admin;