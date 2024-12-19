import { supabase } from "@/integrations/supabase/client";
import { Settings, TitleRate } from "./settingsTypes";

export const fetchUserSettings = async (userId: string | undefined) => {
  if (!userId) {
    console.error("No user ID available");
    return null;
  }

  console.log("Fetching settings for user:", userId);

  const { data: settingsData, error: settingsError } = await supabase
    .from('settings')
    .select('*, title_insurance_rates(*)')
    .eq('user_id', userId)
    .single(); // Use single() to ensure we get exactly one row

  if (settingsError) {
    console.error("Error fetching settings:", settingsError);
    return null;
  }

  if (settingsData) {
    console.log("Retrieved settings:", settingsData);
    const transformedRates = settingsData.title_insurance_rates?.map((rate: any) => ({
      minAmount: rate.min_amount,
      maxAmount: rate.max_amount,
      ratePerThousand: rate.rate_per_thousand,
      id: rate.id,
      settings_id: rate.settings_id
    })) || [];

    return {
      id: settingsData.id,
      emailNotifications: settingsData.email_notifications || false,
      darkMode: settingsData.dark_mode || false,
      maintenanceMode: settingsData.maintenance_mode || false,
      agentName: settingsData.agent_name || "",
      commission: settingsData.commission || "",
      logo: null,
      logo_url: settingsData.logo_url || "",
      propertyTaxRate: settingsData.property_tax_rate || "",
      searchExamClosingFee: settingsData.search_exam_closing_fee || "",
      titleInsuranceRates: transformedRates,
    };
  }

  return null;
};

export const updateUserSettings = async (userId: string, settings: Settings) => {
  console.log("Updating settings for user:", userId, "with data:", settings);
  
  const { error } = await supabase
    .from('settings')
    .upsert({
      user_id: userId,
      email_notifications: settings.emailNotifications,
      dark_mode: settings.darkMode,
      maintenance_mode: settings.maintenanceMode,
      agent_name: settings.agentName,
      commission: settings.commission,
      logo_url: settings.logo_url,
      property_tax_rate: settings.propertyTaxRate,
      search_exam_closing_fee: settings.searchExamClosingFee,
    })
    .eq('user_id', userId);

  if (error) {
    console.error("Error updating settings:", error);
    throw error;
  }
  
  console.log("Settings updated successfully in database");
};

export const handleLogoUpload = async (file: File, userId: string) => {
  const fileExt = file.name.split('.').pop();
  const fileName = `${Math.random()}.${fileExt}`;
  const filePath = `${userId}/${fileName}`;

  console.log("Uploading logo to path:", filePath);

  const { error: uploadError, data } = await supabase.storage
    .from('logos')
    .upload(filePath, file);

  if (uploadError) {
    console.error("Error uploading logo:", uploadError);
    throw uploadError;
  }

  if (data) {
    const { data: urlData } = supabase.storage
      .from('logos')
      .getPublicUrl(filePath);

    const publicUrl = urlData.publicUrl;
    console.log("Logo uploaded successfully, public URL:", publicUrl);
    return publicUrl;
  }

  throw new Error("Failed to get public URL for uploaded logo");
};