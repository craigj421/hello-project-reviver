export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export type Database = {
  public: {
    Tables: {
      custom_fees: {
        Row: {
          amount: number | null
          created_at: string
          description: string | null
          id: string
          is_percentage: boolean | null
          name: string
          updated_at: string
          user_id: string
        }
        Insert: {
          amount?: number | null
          created_at?: string
          description?: string | null
          id?: string
          is_percentage?: boolean | null
          name: string
          updated_at?: string
          user_id: string
        }
        Update: {
          amount?: number | null
          created_at?: string
          description?: string | null
          id?: string
          is_percentage?: boolean | null
          name?: string
          updated_at?: string
          user_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "custom_fees_user_id_fkey"
            columns: ["user_id"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
        ]
      }
      doc_stamp_cities: {
        Row: {
          created_at: string
          has_special_rules: boolean | null
          id: string
          name: string
          special_rules: Json | null
          state_id: string
          surtax_rate: number | null
          updated_at: string
          user_id: string
        }
        Insert: {
          created_at?: string
          has_special_rules?: boolean | null
          id?: string
          name: string
          special_rules?: Json | null
          state_id: string
          surtax_rate?: number | null
          updated_at?: string
          user_id: string
        }
        Update: {
          created_at?: string
          has_special_rules?: boolean | null
          id?: string
          name?: string
          special_rules?: Json | null
          state_id?: string
          surtax_rate?: number | null
          updated_at?: string
          user_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "doc_stamp_cities_state_id_fkey"
            columns: ["state_id"]
            isOneToOne: false
            referencedRelation: "doc_stamp_states"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "doc_stamp_cities_user_id_fkey"
            columns: ["user_id"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
        ]
      }
      doc_stamp_examples: {
        Row: {
          amount: number
          calculation_details: string
          city_id: string | null
          created_at: string
          exemption_id: string | null
          id: string
          result: number
          scenario: string
          state_id: string
          updated_at: string
          user_id: string
        }
        Insert: {
          amount: number
          calculation_details: string
          city_id?: string | null
          created_at?: string
          exemption_id?: string | null
          id?: string
          result: number
          scenario: string
          state_id: string
          updated_at?: string
          user_id: string
        }
        Update: {
          amount?: number
          calculation_details?: string
          city_id?: string | null
          created_at?: string
          exemption_id?: string | null
          id?: string
          result?: number
          scenario?: string
          state_id?: string
          updated_at?: string
          user_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "doc_stamp_examples_city_id_fkey"
            columns: ["city_id"]
            isOneToOne: false
            referencedRelation: "doc_stamp_cities"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "doc_stamp_examples_exemption_id_fkey"
            columns: ["exemption_id"]
            isOneToOne: false
            referencedRelation: "doc_stamp_exemptions"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "doc_stamp_examples_state_id_fkey"
            columns: ["state_id"]
            isOneToOne: false
            referencedRelation: "doc_stamp_states"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "doc_stamp_examples_user_id_fkey"
            columns: ["user_id"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
        ]
      }
      doc_stamp_exemptions: {
        Row: {
          conditions: Json | null
          created_at: string
          description: string | null
          id: string
          name: string
          state_id: string
          updated_at: string
          user_id: string
        }
        Insert: {
          conditions?: Json | null
          created_at?: string
          description?: string | null
          id?: string
          name: string
          state_id: string
          updated_at?: string
          user_id: string
        }
        Update: {
          conditions?: Json | null
          created_at?: string
          description?: string | null
          id?: string
          name?: string
          state_id?: string
          updated_at?: string
          user_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "doc_stamp_exemptions_state_id_fkey"
            columns: ["state_id"]
            isOneToOne: false
            referencedRelation: "doc_stamp_states"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "doc_stamp_exemptions_user_id_fkey"
            columns: ["user_id"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
        ]
      }
      doc_stamp_states: {
        Row: {
          base_rate: number
          calculation_method: string
          created_at: string
          id: string
          minimum_fee: number
          name: string
          updated_at: string
          user_id: string
        }
        Insert: {
          base_rate: number
          calculation_method?: string
          created_at?: string
          id?: string
          minimum_fee?: number
          name: string
          updated_at?: string
          user_id: string
        }
        Update: {
          base_rate?: number
          calculation_method?: string
          created_at?: string
          id?: string
          minimum_fee?: number
          name?: string
          updated_at?: string
          user_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "doc_stamp_states_user_id_fkey"
            columns: ["user_id"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
        ]
      }
      document_templates: {
        Row: {
          created_at: string
          custom_fees: string[] | null
          description: string | null
          id: string
          is_default: boolean
          name: string
          sections: Json
          template_data: Json
          updated_at: string
          user_id: string
        }
        Insert: {
          created_at?: string
          custom_fees?: string[] | null
          description?: string | null
          id?: string
          is_default?: boolean
          name: string
          sections?: Json
          template_data?: Json
          updated_at?: string
          user_id: string
        }
        Update: {
          created_at?: string
          custom_fees?: string[] | null
          description?: string | null
          id?: string
          is_default?: boolean
          name?: string
          sections?: Json
          template_data?: Json
          updated_at?: string
          user_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "document_templates_user_id_fkey"
            columns: ["user_id"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
        ]
      }
      profiles: {
        Row: {
          avatar_url: string | null
          created_at: string
          full_name: string | null
          id: string
          updated_at: string
        }
        Insert: {
          avatar_url?: string | null
          created_at?: string
          full_name?: string | null
          id: string
          updated_at?: string
        }
        Update: {
          avatar_url?: string | null
          created_at?: string
          full_name?: string | null
          id?: string
          updated_at?: string
        }
        Relationships: []
      }
      settings: {
        Row: {
          agent_name: string | null
          api_key: string | null
          commission: string | null
          created_at: string
          dark_mode: boolean | null
          email_notifications: boolean | null
          id: string
          logo_url: string | null
          maintenance_mode: boolean | null
          property_tax_rate: string | null
          search_exam_closing_fee: string | null
          updated_at: string
          user_id: string
        }
        Insert: {
          agent_name?: string | null
          api_key?: string | null
          commission?: string | null
          created_at?: string
          dark_mode?: boolean | null
          email_notifications?: boolean | null
          id?: string
          logo_url?: string | null
          maintenance_mode?: boolean | null
          property_tax_rate?: string | null
          search_exam_closing_fee?: string | null
          updated_at?: string
          user_id: string
        }
        Update: {
          agent_name?: string | null
          api_key?: string | null
          commission?: string | null
          created_at?: string
          dark_mode?: boolean | null
          email_notifications?: boolean | null
          id?: string
          logo_url?: string | null
          maintenance_mode?: boolean | null
          property_tax_rate?: string | null
          search_exam_closing_fee?: string | null
          updated_at?: string
          user_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "settings_user_id_fkey"
            columns: ["user_id"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
        ]
      }
      title_insurance_rates: {
        Row: {
          created_at: string
          id: string
          max_amount: number
          min_amount: number
          rate_per_thousand: number
          settings_id: string
          updated_at: string
        }
        Insert: {
          created_at?: string
          id?: string
          max_amount: number
          min_amount: number
          rate_per_thousand: number
          settings_id: string
          updated_at?: string
        }
        Update: {
          created_at?: string
          id?: string
          max_amount?: number
          min_amount?: number
          rate_per_thousand?: number
          settings_id?: string
          updated_at?: string
        }
        Relationships: [
          {
            foreignKeyName: "title_insurance_rates_settings_id_fkey"
            columns: ["settings_id"]
            isOneToOne: false
            referencedRelation: "settings"
            referencedColumns: ["id"]
          },
        ]
      }
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      initialize_florida_data: {
        Args: {
          user_id_param: string
        }
        Returns: undefined
      }
    }
    Enums: {
      [_ in never]: never
    }
    CompositeTypes: {
      [_ in never]: never
    }
  }
}

type PublicSchema = Database[Extract<keyof Database, "public">]

export type Tables<
  PublicTableNameOrOptions extends
    | keyof (PublicSchema["Tables"] & PublicSchema["Views"])
    | { schema: keyof Database },
  TableName extends PublicTableNameOrOptions extends { schema: keyof Database }
    ? keyof (Database[PublicTableNameOrOptions["schema"]]["Tables"] &
        Database[PublicTableNameOrOptions["schema"]]["Views"])
    : never = never,
> = PublicTableNameOrOptions extends { schema: keyof Database }
  ? (Database[PublicTableNameOrOptions["schema"]]["Tables"] &
      Database[PublicTableNameOrOptions["schema"]]["Views"])[TableName] extends {
      Row: infer R
    }
    ? R
    : never
  : PublicTableNameOrOptions extends keyof (PublicSchema["Tables"] &
        PublicSchema["Views"])
    ? (PublicSchema["Tables"] &
        PublicSchema["Views"])[PublicTableNameOrOptions] extends {
        Row: infer R
      }
      ? R
      : never
    : never

export type TablesInsert<
  PublicTableNameOrOptions extends
    | keyof PublicSchema["Tables"]
    | { schema: keyof Database },
  TableName extends PublicTableNameOrOptions extends { schema: keyof Database }
    ? keyof Database[PublicTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = PublicTableNameOrOptions extends { schema: keyof Database }
  ? Database[PublicTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Insert: infer I
    }
    ? I
    : never
  : PublicTableNameOrOptions extends keyof PublicSchema["Tables"]
    ? PublicSchema["Tables"][PublicTableNameOrOptions] extends {
        Insert: infer I
      }
      ? I
      : never
    : never

export type TablesUpdate<
  PublicTableNameOrOptions extends
    | keyof PublicSchema["Tables"]
    | { schema: keyof Database },
  TableName extends PublicTableNameOrOptions extends { schema: keyof Database }
    ? keyof Database[PublicTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = PublicTableNameOrOptions extends { schema: keyof Database }
  ? Database[PublicTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Update: infer U
    }
    ? U
    : never
  : PublicTableNameOrOptions extends keyof PublicSchema["Tables"]
    ? PublicSchema["Tables"][PublicTableNameOrOptions] extends {
        Update: infer U
      }
      ? U
      : never
    : never

export type Enums<
  PublicEnumNameOrOptions extends
    | keyof PublicSchema["Enums"]
    | { schema: keyof Database },
  EnumName extends PublicEnumNameOrOptions extends { schema: keyof Database }
    ? keyof Database[PublicEnumNameOrOptions["schema"]]["Enums"]
    : never = never,
> = PublicEnumNameOrOptions extends { schema: keyof Database }
  ? Database[PublicEnumNameOrOptions["schema"]]["Enums"][EnumName]
  : PublicEnumNameOrOptions extends keyof PublicSchema["Enums"]
    ? PublicSchema["Enums"][PublicEnumNameOrOptions]
    : never

export type CompositeTypes<
  PublicCompositeTypeNameOrOptions extends
    | keyof PublicSchema["CompositeTypes"]
    | { schema: keyof Database },
  CompositeTypeName extends PublicCompositeTypeNameOrOptions extends {
    schema: keyof Database
  }
    ? keyof Database[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"]
    : never = never,
> = PublicCompositeTypeNameOrOptions extends { schema: keyof Database }
  ? Database[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"][CompositeTypeName]
  : PublicCompositeTypeNameOrOptions extends keyof PublicSchema["CompositeTypes"]
    ? PublicSchema["CompositeTypes"][PublicCompositeTypeNameOrOptions]
    : never
