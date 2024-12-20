import { Button } from "@/components/ui/button";

interface SaveButtonProps {
  onSave: () => void;
}

export const SaveButton = ({ onSave }: SaveButtonProps) => {
  return (
    <Button onClick={onSave} className="w-full">
      Save Settings
    </Button>
  );
};