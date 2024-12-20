import { useEffect, useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import { useAuth } from "@/contexts/AuthContext";

interface TitleRate {
  min_amount: number;
  max_amount: number;
  rate_per_thousand: number;
}

export const useCalculatorSettings = () => {
  const { user } = useAuth();
  const [settings, setSettings] = useState<any>(null);
  const [titleRates, setTitleRates] = useState<TitleRate[]>([]);

  useEffect(() => {
    const fetchSettings = async () => {
      if (!user) return;

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
        .single();

      if (settingsError) {
        console.error('Error fetching settings:', settingsError);
        return;
      }

      if (settingsData) {
        console.log('Fetched settings with title rates:', settingsData);
        setSettings(settingsData);
        setTitleRates(settingsData.title_insurance_rates || []);
      }
    };

    fetchSettings();
  }, [user]);

  return { settings, titleRates };
};