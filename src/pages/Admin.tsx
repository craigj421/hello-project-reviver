import { Card } from "@/components/ui/card";

const Admin = () => {
  return (
    <div className="container mx-auto p-6">
      <h1 className="text-2xl font-bold mb-6">Admin Dashboard</h1>
      <div className="grid gap-6 md:grid-cols-2">
        <Card className="p-6">
          <h2 className="text-xl font-semibold mb-4">User Management</h2>
          {/* User management content will go here */}
        </Card>
        <Card className="p-6">
          <h2 className="text-xl font-semibold mb-4">Settings</h2>
          {/* Settings content will go here */}
        </Card>
      </div>
    </div>
  );
};

export default Admin;