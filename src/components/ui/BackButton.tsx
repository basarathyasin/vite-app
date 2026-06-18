import { Button } from "@/components/ui/button";

export default function BackButton() {
  const handleBack = () => {
    window.history.back();
  };

  return (
    <Button
    className="flex m-2"
      variant="outline"
      onClick={handleBack}
    >
      ← Back
    </Button>
  );
}