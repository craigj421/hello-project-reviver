import { Button } from "@/components/ui/button";
import { useNavigate, useLocation } from "react-router-dom";
import { Users, Settings as SettingsIcon, Home } from "lucide-react";

export const Navigation = () => {
  const navigate = useNavigate();
  const location = useLocation();

  return (
    <div className="flex gap-2 mb-6">
      <Button
        variant={location.pathname === "/" ? "default" : "outline"}
        onClick={() => navigate("/")}
      >
        <Home className="mr-2 h-4 w-4" />
        Home
      </Button>
      <Button
        variant={location.pathname === "/admin" ? "default" : "outline"}
        onClick={() => navigate("/admin")}
      >
        <Users className="mr-2 h-4 w-4" />
        Users
      </Button>
      <Button
        variant={location.pathname === "/admin/settings" ? "default" : "outline"}
        onClick={() => navigate("/admin/settings")}
      >
        <SettingsIcon className="mr-2 h-4 w-4" />
        Settings
      </Button>
    </div>
  );
};