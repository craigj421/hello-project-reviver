import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";

const Pricing = () => {
  const navigate = useNavigate();

  const handleCheckout = async (priceId: string) => {
    try {
      const { data: { session }, error: sessionError } = await supabase.auth.getSession();
      
      if (!session) {
        navigate('/login');
        return;
      }

      const response = await fetch('/.netlify/functions/create-checkout', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${session.access_token}`,
        },
        body: JSON.stringify({
          priceId,
          successUrl: `${window.location.origin}/`,
          cancelUrl: `${window.location.origin}/pricing`,
        }),
      });

      const { url } = await response.json();
      window.location.href = url;
    } catch (error) {
      console.error('Error creating checkout session:', error);
    }
  };

  return (
    <div className="min-h-screen bg-background">
      <div className="container mx-auto px-4 py-16">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold mb-4">Simple, transparent pricing</h1>
          <p className="text-xl text-muted-foreground">
            Choose the plan that's right for you
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-8 max-w-5xl mx-auto">
          {/* Free Tier */}
          <div className="rounded-lg border bg-card text-card-foreground shadow-sm">
            <div className="p-6 space-y-4">
              <h3 className="text-2xl font-bold">Free</h3>
              <div className="text-4xl font-bold">$0</div>
              <p className="text-sm text-muted-foreground">Perfect for trying out our service</p>
            </div>
            <div className="p-6 space-y-4 border-t">
              <ul className="space-y-2">
                <li className="flex items-center">
                  <svg
                    className="mr-2 h-4 w-4"
                    fill="none"
                    height="24"
                    stroke="currentColor"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    viewBox="0 0 24 24"
                    width="24"
                  >
                    <polyline points="20 6 9 17 4 12"></polyline>
                  </svg>
                  5 templates per month
                </li>
                <li className="flex items-center">
                  <svg
                    className="mr-2 h-4 w-4"
                    fill="none"
                    height="24"
                    stroke="currentColor"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    viewBox="0 0 24 24"
                    width="24"
                  >
                    <polyline points="20 6 9 17 4 12"></polyline>
                  </svg>
                  Basic support
                </li>
              </ul>
              <Button
                className="w-full"
                variant="outline"
                onClick={() => navigate('/')}
              >
                Get Started
              </Button>
            </div>
          </div>

          {/* Pro Tier */}
          <div className="rounded-lg border bg-card text-card-foreground shadow-sm relative">
            <div className="absolute -top-4 left-0 right-0 mx-auto w-fit px-4 py-1 rounded-full bg-primary text-primary-foreground text-sm font-medium">
              Popular
            </div>
            <div className="p-6 space-y-4">
              <h3 className="text-2xl font-bold">Pro</h3>
              <div className="text-4xl font-bold">$10</div>
              <p className="text-sm text-muted-foreground">Perfect for professionals</p>
            </div>
            <div className="p-6 space-y-4 border-t">
              <ul className="space-y-2">
                <li className="flex items-center">
                  <svg
                    className="mr-2 h-4 w-4"
                    fill="none"
                    height="24"
                    stroke="currentColor"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    viewBox="0 0 24 24"
                    width="24"
                  >
                    <polyline points="20 6 9 17 4 12"></polyline>
                  </svg>
                  50 templates per month
                </li>
                <li className="flex items-center">
                  <svg
                    className="mr-2 h-4 w-4"
                    fill="none"
                    height="24"
                    stroke="currentColor"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    viewBox="0 0 24 24"
                    width="24"
                  >
                    <polyline points="20 6 9 17 4 12"></polyline>
                  </svg>
                  Priority support
                </li>
                <li className="flex items-center">
                  <svg
                    className="mr-2 h-4 w-4"
                    fill="none"
                    height="24"
                    stroke="currentColor"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    viewBox="0 0 24 24"
                    width="24"
                  >
                    <polyline points="20 6 9 17 4 12"></polyline>
                  </svg>
                  Advanced features
                </li>
              </ul>
              <Button
                className="w-full"
                onClick={() => handleCheckout('price_1OWvmqKMoCL2K7BtJxv4cjnx')}
              >
                Subscribe
              </Button>
            </div>
          </div>

          {/* Enterprise Tier */}
          <div className="rounded-lg border bg-card text-card-foreground shadow-sm">
            <div className="p-6 space-y-4">
              <h3 className="text-2xl font-bold">Enterprise</h3>
              <div className="text-4xl font-bold">$50</div>
              <p className="text-sm text-muted-foreground">For large organizations</p>
            </div>
            <div className="p-6 space-y-4 border-t">
              <ul className="space-y-2">
                <li className="flex items-center">
                  <svg
                    className="mr-2 h-4 w-4"
                    fill="none"
                    height="24"
                    stroke="currentColor"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    viewBox="0 0 24 24"
                    width="24"
                  >
                    <polyline points="20 6 9 17 4 12"></polyline>
                  </svg>
                  Unlimited templates
                </li>
                <li className="flex items-center">
                  <svg
                    className="mr-2 h-4 w-4"
                    fill="none"
                    height="24"
                    stroke="currentColor"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    viewBox="0 0 24 24"
                    width="24"
                  >
                    <polyline points="20 6 9 17 4 12"></polyline>
                  </svg>
                  24/7 support
                </li>
                <li className="flex items-center">
                  <svg
                    className="mr-2 h-4 w-4"
                    fill="none"
                    height="24"
                    stroke="currentColor"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    viewBox="0 0 24 24"
                    width="24"
                  >
                    <polyline points="20 6 9 17 4 12"></polyline>
                  </svg>
                  Custom features
                </li>
              </ul>
              <Button
                className="w-full"
                onClick={() => handleCheckout('price_1OWvnVKMoCL2K7BtbfmUQA5e')}
              >
                Subscribe
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Pricing;