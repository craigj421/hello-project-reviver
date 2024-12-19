export interface TitleRate {
  minAmount: number;
  maxAmount: number;
  ratePerThousand: number;
  id?: string;
  settings_id?: string;
}

export interface Settings {
  id?: string;
  emailNotifications: boolean;
  darkMode: boolean;
  maintenanceMode: boolean;
  agentName: string;
  commission: string;
  logo: File | null;
  logo_url?: string;
  propertyTaxRate: string;
  searchExamClosingFee: string;
  titleInsuranceRates: TitleRate[];
}