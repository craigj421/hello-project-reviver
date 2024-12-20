import { AgentInfoSection } from "./AgentInfoSection";
import { LogoSection } from "./LogoSection";
import { ToggleSection } from "./ToggleSection";
import { TaxSection } from "./TaxSection";
import { TitleInsuranceSection } from "./TitleInsuranceSection";
import { CustomFeesSection } from "./CustomFeesSection";
import { SaveButton } from "./SaveButton";
import { SignOutButton } from "./SignOutButton";

interface SettingsContentProps {
  settings: any;
  updateSettings: (updates: any) => void;
  handleLogoChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
  logoPreview: string | null;
  onSave: () => void;
  onSignOut: () => void;
}

export const SettingsContent = ({
  settings,
  updateSettings,
  handleLogoChange,
  logoPreview,
  onSave,
  onSignOut,
}: SettingsContentProps) => {
  return (
    <div className="space-y-6">
      <AgentInfoSection 
        agentName={settings.agentName}
        commission={settings.commission}
        onSettingChange={(key: string, value: any) => updateSettings({ [key]: value })}
      />

      <TitleInsuranceSection
        rates={settings.titleInsuranceRates}
        onRatesChange={(rates) => updateSettings({ titleInsuranceRates: rates })}
      />

      <TaxSection
        propertyTaxRate={settings.propertyTaxRate}
        searchExamClosingFee={settings.searchExamClosingFee}
        onSettingChange={(key: string, value: any) => updateSettings({ [key]: value })}
      />

      <CustomFeesSection />

      <LogoSection 
        logoPreview={settings.logo_url || logoPreview}
        onLogoChange={handleLogoChange}
      />

      <ToggleSection 
        settings={settings}
        onToggle={(key) => updateSettings({ [key]: !settings[key as keyof typeof settings] })}
      />

      <SaveButton onSave={onSave} />
      <SignOutButton onSignOut={onSignOut} />
    </div>
  );
};