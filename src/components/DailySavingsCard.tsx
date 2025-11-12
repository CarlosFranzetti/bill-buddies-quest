import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Check } from "lucide-react";
import { useState } from "react";

interface DailySavingsCardProps {
  dailyAmount: number;
  streak: number;
  onSave: () => void;
}

export const DailySavingsCard = ({ dailyAmount, streak, onSave }: DailySavingsCardProps) => {
  const [saved, setSaved] = useState(false);

  const handleSave = () => {
    setSaved(true);
    onSave();
    setTimeout(() => setSaved(false), 2000);
  };

  return (
    <Card className="p-6 bg-gradient-to-br from-primary/5 to-primary/10 border-primary/20">
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <div>
            <p className="text-sm text-muted-foreground">Today's Goal</p>
            <h2 className="text-4xl font-bold text-primary">${dailyAmount.toFixed(2)}</h2>
          </div>
          <div className="text-right">
            <p className="text-sm text-muted-foreground">Current Streak</p>
            <div className="flex items-center gap-2">
              <span className="text-3xl">🔥</span>
              <span className="text-3xl font-bold text-accent">{streak}</span>
            </div>
          </div>
        </div>
        
        <Button 
          onClick={handleSave}
          disabled={saved}
          className="w-full h-14 text-lg font-semibold bg-primary hover:bg-primary/90 transition-all"
        >
          {saved ? (
            <>
              <Check className="mr-2 h-5 w-5" />
              Saved!
            </>
          ) : (
            "Mark as Saved Today"
          )}
        </Button>
      </div>
    </Card>
  );
};
