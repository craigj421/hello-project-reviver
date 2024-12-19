import { Card } from "@/components/ui/card";
import { useSettings } from "@/hooks/useSettings";

export const Header = () => {
  const { settings } = useSettings();
  
  return (
    <div className="flex flex-col items-center space-y-2">
      {settings.logo_url ? (
        <img 
          src={settings.logo_url} 
          alt="Company Logo" 
          className="h-16 w-auto mb-2 object-contain"
        />
      ) : (
        <img 
          src="/placeholder.svg" 
          alt="Company Logo" 
          className="h-16 w-auto mb-2"
        />
      )}
      <h1 className="text-2xl font-bold text-center">Seller's Net Sheet</h1>
    </div>
  );
};