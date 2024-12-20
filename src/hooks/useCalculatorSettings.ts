import { useEffect, useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import { useAuth } from "@/contexts/AuthContext";
import { useToast } from "@/components/ui/use-toast";

interface TitleRate {
  min_amount: number;
  max_amount: number;
  rate_per_thousand: number;
}

export const useCalculatorSettings = () => {
  const { user } = useAuth();
  const { toast } = useToast();
  const [settings, setSettings] = useState<any>(null);
  const [titleRates, setTitleRates] = useState<TitleRate[]>([]);

  useEffect(() => {
    const fetchSettings = async () => {
      if (!user) return;

      console.log("Fetching settings for user:", user.id);

      const { data: settingsData, error: settingsError } = await supabase
        .from('settings')
        .select(`
          *,
          title_insurance_rates (
            min_amount,
            max_amount,
            rate_per_thousand
          )
        `)
        .eq('user_id', user.id)
        .order('created_at', { ascending: false })
        .limit(1)
        .maybeSingle();

      if (settingsError) {
        console.error('Error fetching settings:', settingsError);
        toast({
          title: "Error",
          description: "Failed to load calculator settings",
          variant: "destructive",
        });
        return;
      }

      if (settingsData) {
        console.log('Fetched settings with title rates:', settingsData);
        setSettings(settingsData);
        setTitleRates(settingsData.title_insurance_rates || []);
      } else {
        console.log('No settings found for user');
        toast({
          title: "No Settings Found",
          description: "Please configure your settings in the admin area",
          variant: "destructive",
        });
      }
    };

    fetchSettings();
  }, [user, toast]);

  return { settings, titleRates };
};