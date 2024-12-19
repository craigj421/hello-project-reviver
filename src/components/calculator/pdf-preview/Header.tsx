import { Card } from "@/components/ui/card";
import { useSettings } from "@/hooks/useSettings";

export const Header = () => {
  const { settings } = useSettings();
  
  console.log("Header rendering with logo_url:", settings.logo_url);
  
  return (
    <div className="flex flex-col items-center space-y-2">
      {settings.logo_url ? (
        <img 
          src={settings.logo_url} 
          alt="Company Logo" 
          className="h-16 w-auto mb-2 object-contain"
          onLoad={() => console.log("Logo loaded successfully in Header:", settings.logo_url)}
          onError={(e) => console.error("Error loading logo in Header:", e)}
        />
      ) : (
        <img 
          src="/placeholder.svg" 
          alt="Company Logo" 
          className="h-16 w-auto mb-2"
          onLoad={() => console.log("Placeholder logo loaded in Header")}
        />
      )}
      <h1 className="text-2xl font-bold text-center">Seller's Net Sheet</h1>
    </div>
  );
};