import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Upload } from "lucide-react";

interface LogoSectionProps {
  logoPreview: string | null;
  onLogoChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
}

export const LogoSection = ({ logoPreview, onLogoChange }: LogoSectionProps) => {
  console.log("LogoSection rendering with logoPreview:", logoPreview);
  
  return (
    <div className="space-y-2">
      <Label>Company Logo</Label>
      <div className="flex flex-col items-center p-4 border-2 border-dashed rounded-md">
        {logoPreview ? (
          <div className="mb-4">
            <img 
              src={logoPreview} 
              alt="Logo preview" 
              className="max-w-[200px] max-h-[200px] object-contain"
              onLoad={() => console.log("Logo image loaded successfully:", logoPreview)}
              onError={(e) => console.error("Error loading logo image:", e)}
            />
          </div>
        ) : (
          <div className="w-32 h-32 bg-gray-100 flex items-center justify-center rounded-md mb-4">
            <Upload className="w-8 h-8 text-gray-400" />
          </div>
        )}
        <Input
          id="logo"
          type="file"
          accept="image/*"
          onChange={(e) => {
            console.log("File input change detected");
            onLogoChange(e);
          }}
          className="hidden"
        />
        <Label
          htmlFor="logo"
          className="cursor-pointer inline-flex items-center px-4 py-2 bg-primary text-primary-foreground rounded-md hover:bg-primary/90"
        >
          {logoPreview ? "Change Logo" : "Upload Logo"}
        </Label>
      </div>
    </div>
  );
};