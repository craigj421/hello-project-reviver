import { supabase } from "@/integrations/supabase/client";

export const createLogosBucket = async () => {
  const { data, error } = await supabase.storage.createBucket('logos', {
    public: true,
    fileSizeLimit: 1024 * 1024 * 2, // 2MB
    allowedMimeTypes: ['image/png', 'image/jpeg', 'image/gif']
  });

  if (error) {
    console.error("Error creating logos bucket:", error);
    throw error;
  }

  return data;
};