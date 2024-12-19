import { Json } from "@/integrations/supabase/types";

export interface Field {
  id: string;
  name: string;
  type: "text" | "number" | "date" | "select";
  required: boolean;
  options?: string[];
}

export interface Section {
  id: string;
  name: string;
  fields: Field[];
}

export interface Template {
  id: string;
  name: string;
  description: string;
  sections: Section[];
  template_data: Json;
  is_default: boolean;
}

export interface TemplateData {
  created_at?: string;
  custom_fees?: string[];
  description?: string;
  id?: string;
  is_default?: boolean;
  name: string;
  sections: Section[];
  template_data?: Json;
  updated_at?: string;
  user_id: string;
}