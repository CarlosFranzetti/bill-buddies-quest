import { Card } from "@/components/ui/card";
import { Trophy, Medal, Award } from "lucide-react";

interface LeaderboardEntry {
  id: string;
  name: string;
  streak: number;
  totalSaved: number;
  rank: number;
}

interface LeaderboardProps {
  entries: LeaderboardEntry[];
}

export const Leaderboard = ({ entries }: LeaderboardProps) => {
  const getRankIcon = (rank: number) => {
    switch (rank) {
      case 1:
        return <Trophy className="h-5 w-5 text-achievement-gold" />;
      case 2:
        return <Medal className="h-5 w-5 text-achievement-silver" />;
      case 3:
        return <Award className="h-5 w-5 text-achievement-bronze" />;
      default:
        return <span className="text-sm font-semibold text-muted-foreground">#{rank}</span>;
    }
  };

  return (
    <div className="space-y-4">
      <h3 className="text-xl font-semibold">Leaderboard</h3>
      <Card className="p-4">
        <div className="space-y-3">
          {entries.map((entry) => (
            <div
              key={entry.id}
              className={`flex items-center justify-between p-3 rounded-lg transition-all ${
                entry.rank <= 3 ? "bg-accent/5 border border-accent/20" : "bg-muted/30"
              }`}
            >
              <div className="flex items-center gap-3">
                <div className="w-8 flex justify-center">
                  {getRankIcon(entry.rank)}
                </div>
                <div>
                  <p className="font-semibold">{entry.name}</p>
                  <p className="text-sm text-muted-foreground">
                    {entry.streak} day streak
                  </p>
                </div>
              </div>
              <div className="text-right">
                <p className="font-semibold text-primary">
                  ${entry.totalSaved.toFixed(2)}
                </p>
                <p className="text-xs text-muted-foreground">saved</p>
              </div>
            </div>
          ))}
        </div>
      </Card>
    </div>
  );
};
