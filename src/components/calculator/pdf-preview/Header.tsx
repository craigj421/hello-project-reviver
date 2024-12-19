import { Card } from "@/components/ui/card";

export const Header = () => (
  <div className="flex flex-col items-center space-y-2">
    <img 
      src="/placeholder.svg" 
      alt="Company Logo" 
      className="h-16 w-auto mb-2"
    />
    <h1 className="text-2xl font-bold text-center">Seller's Net Sheet</h1>
  </div>
);