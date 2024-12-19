import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { useState } from "react";

type User = {
  id: string;
  name: string;
  email: string;
  role: string;
  status: string;
};

const mockUsers: User[] = [
  { id: "1", name: "John Doe", email: "john@example.com", role: "Admin", status: "Active" },
  { id: "2", name: "Jane Smith", email: "jane@example.com", role: "User", status: "Active" },
];

export const UserManagement = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [users, setUsers] = useState<User[]>(mockUsers);

  const filteredUsers = users.filter(
    (user) =>
      user.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      user.email.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <Card className="p-6">
      <h2 className="text-xl font-semibold mb-4">User Management</h2>
      <div className="space-y-4">
        <div className="flex gap-2">
          <Input 
            placeholder="Search users..." 
            className="w-full"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
          <Button>Add User</Button>
        </div>
        <div className="border rounded-md">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Name</TableHead>
                <TableHead>Email</TableHead>
                <TableHead>Role</TableHead>
                <TableHead>Status</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredUsers.map((user) => (
                <TableRow key={user.id}>
                  <TableCell>{user.name}</TableCell>
                  <TableCell>{user.email}</TableCell>
                  <TableCell>{user.role}</TableCell>
                  <TableCell>{user.status}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      </div>
    </Card>
  );
};