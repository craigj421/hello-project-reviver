import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";
import { Settings } from "lucide-react";
import { NetProceedsCalculator } from "@/components/NetProceedsCalculator";

const Index = () => {
  const navigate = useNavigate();

  return (
    <div className="container mx-auto p-6">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold">Net Proceeds Calculator</h1>
        <Button
          variant="outline"
          onClick={() => navigate("/admin")}
          className="flex items-center gap-2"
        >
          <Settings className="h-4 w-4" />
          Admin
        </Button>
      </div>
      <NetProceedsCalculator />
    </div>
  );
};

export default Index;