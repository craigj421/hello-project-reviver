import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { NetProceedsCalculator } from "@/components/NetProceedsCalculator";

const Index = () => {
  return (
    <div className="min-h-screen bg-gray-50 py-8 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold text-gray-900 mb-2">
            Seller's Net Proceeds Calculator
          </h1>
          <p className="text-lg text-gray-600">
            Calculate estimated proceeds from your property sale
          </p>
        </div>
        
        <Card className="shadow-lg">
          <CardHeader>
            <CardTitle>Property Details</CardTitle>
            <CardDescription>
              Enter the property and transaction details below to calculate net proceeds
            </CardDescription>
          </CardHeader>
          <CardContent>
            <NetProceedsCalculator />
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default Index;