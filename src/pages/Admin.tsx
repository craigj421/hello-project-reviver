import { UserManagement } from "@/components/admin/UserManagement";
import { Settings } from "@/components/admin/Settings";
import { Navigation } from "@/components/admin/Navigation";

const Admin = () => {
  return (
    <div className="container mx-auto p-6">
      <h1 className="text-2xl font-bold mb-6">Admin Dashboard</h1>
      <Navigation />
      <div className="grid gap-6 md:grid-cols-2">
        <UserManagement />
        <Settings />
      </div>
    </div>
  );
};

export default Admin;