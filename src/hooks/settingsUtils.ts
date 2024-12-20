import { supabase } from "@/integrations/supabase/client";
import { Settings, TitleRate } from "./settingsTypes";

export const fetchUserSettings = async (userId: string | undefined) => {
  if (!userId) {
    console.error("No user ID available");
    return null;
  }

  console.log("Fetching settings for user:", userId);

  // Get the most recent settings entry for the user
  const { data: settingsData, error: settingsError } = await supabase
    .from('settings')
    .select('*, title_insurance_rates(*)')
    .eq('user_id', userId)
    .order('created_at', { ascending: false })
    .limit(1)
    .maybeSingle();

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
  
  // First, update the main settings
  const { data: updatedSettings, error: settingsError } = await supabase
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
    .select()
    .single();

  if (settingsError) {
    console.error("Error updating settings:", settingsError);
    throw settingsError;
  }

  // Then, handle title insurance rates
  if (settings.titleInsuranceRates && settings.titleInsuranceRates.length > 0) {
    console.log("Updating title insurance rates:", settings.titleInsuranceRates);
    
    // Delete existing rates for this settings entry
    const { error: deleteError } = await supabase
      .from('title_insurance_rates')
      .delete()
      .eq('settings_id', updatedSettings.id);

    if (deleteError) {
      console.error("Error deleting existing rates:", deleteError);
      throw deleteError;
    }

    // Insert new rates
    const ratesToInsert = settings.titleInsuranceRates.map(rate => ({
      settings_id: updatedSettings.id,
      min_amount: rate.minAmount,
      max_amount: rate.maxAmount,
      rate_per_thousand: rate.ratePerThousand
    }));

    const { error: insertError } = await supabase
      .from('title_insurance_rates')
      .insert(ratesToInsert);

    if (insertError) {
      console.error("Error inserting title insurance rates:", insertError);
      throw insertError;
    }
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