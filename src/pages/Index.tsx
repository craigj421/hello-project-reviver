import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";
import { Settings } from "lucide-react";
import { NetProceedsCalculator } from "@/components/NetProceedsCalculator";

const Index = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen w-full bg-background">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
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
        <div className="w-full max-w-4xl mx-auto">
          <NetProceedsCalculator />
        </div>
      </div>
    </div>
  );
};

export default Index;