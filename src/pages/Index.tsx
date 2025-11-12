import { useState } from "react";
import { DailySavingsCard } from "@/components/DailySavingsCard";
import { BillsList } from "@/components/BillsList";
import { AchievementsBadges } from "@/components/AchievementsBadges";
import { Leaderboard } from "@/components/Leaderboard";
import { Button } from "@/components/ui/button";
import { Plus } from "lucide-react";

const Index = () => {
  const [streak, setStreak] = useState(7);

  // Mock data
  const bills = [
    { id: "1", name: "Rent", amount: 1200, dueDate: "Nov 30", paid: 840 },
    { id: "2", name: "Electric", amount: 150, dueDate: "Nov 25", paid: 75 },
    { id: "3", name: "Internet", amount: 80, dueDate: "Nov 28", paid: 60 },
    { id: "4", name: "Phone", amount: 65, dueDate: "Nov 22", paid: 40 },
  ];

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
    setStreak(streak + 1);
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
