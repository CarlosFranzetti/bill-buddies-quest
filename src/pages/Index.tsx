import { useState, useEffect } from "react";
import { DailySavingsCard } from "@/components/DailySavingsCard";
import { BillsList } from "@/components/BillsList";
import { AchievementsBadges } from "@/components/AchievementsBadges";
import { Leaderboard } from "@/components/Leaderboard";
import { WelcomeOnboarding } from "@/components/WelcomeOnboarding";
import { Button } from "@/components/ui/button";
import { Plus } from "lucide-react";

interface Bill {
  id: string;
  name: string;
  amount: number;
  dueDate: string;
  paid: number;
}

const Index = () => {
  const [hasCompletedOnboarding, setHasCompletedOnboarding] = useState(false);
  const [bills, setBills] = useState<Bill[]>([]);
  const [streak, setStreak] = useState(0);

  useEffect(() => {
    const savedBills = localStorage.getItem("billsaver-bills");
    const savedStreak = localStorage.getItem("billsaver-streak");
    const savedOnboarding = localStorage.getItem("billsaver-onboarding");

    if (savedOnboarding && savedBills) {
      setHasCompletedOnboarding(true);
      setBills(JSON.parse(savedBills));
      setStreak(savedStreak ? parseInt(savedStreak) : 0);
    }
  }, []);

  const handleOnboardingComplete = (newBills: Bill[]) => {
    setBills(newBills);
    setHasCompletedOnboarding(true);
    localStorage.setItem("billsaver-bills", JSON.stringify(newBills));
    localStorage.setItem("billsaver-onboarding", "true");
  };

  if (!hasCompletedOnboarding) {
    return <WelcomeOnboarding onComplete={handleOnboardingComplete} />;
  }

  const totalMonthly = bills.reduce((sum, bill) => sum + bill.amount, 0);
  const dailyGoal = totalMonthly / 30;

  const achievements = [
    {
      id: "1",
      title: "First Save",
      description: "Save for 1 day",
      type: "bronze" as const,
      unlocked: true,
    },
    {
      id: "2",
      title: "Week Warrior",
      description: "7 day streak",
      type: "silver" as const,
      unlocked: true,
    },
    {
      id: "3",
      title: "Month Master",
      description: "30 day streak",
      type: "gold" as const,
      unlocked: false,
    },
    {
      id: "4",
      title: "Halfway Hero",
      description: "50% of bills saved",
      type: "silver" as const,
      unlocked: true,
    },
    {
      id: "5",
      title: "Bill Crusher",
      description: "All bills paid",
      type: "gold" as const,
      unlocked: false,
    },
    {
      id: "6",
      title: "Consistency King",
      description: "14 day streak",
      type: "bronze" as const,
      unlocked: false,
    },
  ];

  const leaderboardEntries = [
    { id: "1", name: "You", streak: 7, totalSaved: 1015, rank: 3 },
    { id: "2", name: "Alex M.", streak: 15, totalSaved: 2250, rank: 1 },
    { id: "3", name: "Sarah K.", streak: 12, totalSaved: 1890, rank: 2 },
    { id: "4", name: "Mike R.", streak: 5, totalSaved: 850, rank: 4 },
    { id: "5", name: "Emma L.", streak: 9, totalSaved: 1340, rank: 5 },
  ];

  const handleSave = () => {
    const newStreak = streak + 1;
    setStreak(newStreak);
    localStorage.setItem("billsaver-streak", newStreak.toString());
  };

  return (
    <div className="min-h-screen bg-background">
      <div className="container max-w-6xl mx-auto px-4 py-8">
        <header className="mb-8 text-center">
          <h1 className="text-3xl md:text-4xl mb-4 text-primary">
            💰 BillSaver
          </h1>
          <p className="text-sm md:text-base text-muted-foreground">
            Save daily, earn achievements, and crush your bills!
          </p>
        </header>

        <div className="grid lg:grid-cols-3 gap-6">
          <div className="lg:col-span-2 space-y-6">
            <DailySavingsCard
              dailyAmount={dailyGoal}
              streak={streak}
              onSave={handleSave}
            />

            <BillsList bills={bills} />

            <div className="flex justify-center">
              <Button variant="outline" size="lg" className="gap-2">
                <Plus className="h-5 w-5" />
                Add New Bill
              </Button>
            </div>
          </div>

          <div className="space-y-6">
            <AchievementsBadges achievements={achievements} />
            <Leaderboard entries={leaderboardEntries} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Index;
