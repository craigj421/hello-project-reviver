import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

export const UserManagement = () => {
  return (
    <Card className="p-6">
      <h2 className="text-xl font-semibold mb-4">User Management</h2>
      <div className="space-y-4">
        <div>
          <Input placeholder="Search users..." className="w-full" />
        </div>
        <div className="border rounded-md p-4">
          <p className="text-muted-foreground">No users found</p>
        </div>
      </div>
    </Card>
  );
};