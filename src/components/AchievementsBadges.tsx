import { Card } from "@/components/ui/card";
import goldMedal from "@/assets/achievement-gold.png";
import silverMedal from "@/assets/achievement-silver.png";
import bronzeMedal from "@/assets/achievement-bronze.png";

interface Achievement {
  id: string;
  title: string;
  description: string;
  type: "gold" | "silver" | "bronze";
  unlocked: boolean;
}

interface AchievementsBadgesProps {
  achievements: Achievement[];
}

export const AchievementsBadges = ({ achievements }: AchievementsBadgesProps) => {
  const getMedalImage = (type: string) => {
    switch (type) {
      case "gold":
        return goldMedal;
      case "silver":
        return silverMedal;
      case "bronze":
        return bronzeMedal;
      default:
        return bronzeMedal;
    }
  };

  return (
    <div className="space-y-4">
      <h3 className="text-xl font-semibold">Achievements</h3>
      <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
        {achievements.map((achievement) => (
          <Card
            key={achievement.id}
            className={`p-4 text-center transition-all ${
              achievement.unlocked
                ? "bg-gradient-to-br from-accent/10 to-accent/5 border-accent/30"
                : "opacity-50 grayscale"
            }`}
          >
            <img
              src={getMedalImage(achievement.type)}
              alt={achievement.title}
              className="w-16 h-16 mx-auto mb-2"
            />
            <h4 className="font-semibold text-sm mb-1">{achievement.title}</h4>
            <p className="text-xs text-muted-foreground">{achievement.description}</p>
          </Card>
        ))}
      </div>
    </div>
  );
};
