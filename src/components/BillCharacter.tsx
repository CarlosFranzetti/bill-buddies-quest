import { useEffect, useState } from "react";
import billCharacter from "@/assets/bill-character.png";

export const BillCharacter = () => {
  const [isVisible, setIsVisible] = useState(false);
  const [position, setPosition] = useState({ x: 0, y: 0 });

  useEffect(() => {
    const showCharacter = () => {
      // Random chance to appear (20%)
      if (Math.random() > 0.8) {
        // Random position on screen
        const x = Math.random() * (window.innerWidth - 100);
        const y = Math.random() * (window.innerHeight - 100);
        setPosition({ x, y });
        setIsVisible(true);

        // Hide after 3 seconds
        setTimeout(() => {
          setIsVisible(false);
        }, 3000);
      }
    };

    // Check every 15 seconds
    const interval = setInterval(showCharacter, 15000);
    
    // Show on first load after 5 seconds
    const initialTimeout = setTimeout(showCharacter, 5000);

    return () => {
      clearInterval(interval);
      clearTimeout(initialTimeout);
    };
  }, []);

  if (!isVisible) return null;

  return (
    <div
      className="fixed z-50 pointer-events-none animate-in fade-in zoom-in duration-500"
      style={{
        left: `${position.x}px`,
        top: `${position.y}px`,
      }}
    >
      <img
        src={billCharacter}
        alt="Bill the friendly bill"
        className="w-20 h-20 md:w-24 md:h-24 drop-shadow-lg"
        style={{ imageRendering: "pixelated" }}
      />
      <div className="absolute -top-12 left-1/2 -translate-x-1/2 whitespace-nowrap">
        <div className="bg-card border-2 border-primary px-3 py-1 rounded text-xs font-semibold">
          {getRandomMessage()}
        </div>
      </div>
    </div>
  );
};

const getRandomMessage = () => {
  const messages = [
    "Keep saving! 💪",
    "You're doing great! ⭐",
    "Almost there! 🎯",
    "Nice streak! 🔥",
    "Level up! 🚀",
  ];
  return messages[Math.floor(Math.random() * messages.length)];
};
