import { Button } from "@/components/ui/button";
import { LogOut } from "lucide-react";

interface SignOutButtonProps {
  onSignOut: () => void;
}

export const SignOutButton = ({ onSignOut }: SignOutButtonProps) => {
  return (
    <div className="border-t pt-4">
      <Button 
        variant="destructive" 
        className="w-full" 
        onClick={onSignOut}
      >
        <LogOut className="mr-2" />
        Sign Out
      </Button>
    </div>
  );
};