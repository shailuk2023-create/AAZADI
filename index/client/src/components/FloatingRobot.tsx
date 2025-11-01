import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Bot, X } from "lucide-react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

const motivationalTips = [
  "You're stronger than your urges. Every 'no' makes you more powerful!",
  "One day at a time. Focus on today, and tomorrow will take care of itself.",
  "Your future self is thanking you right now for this choice.",
  "Urges are temporary, but your freedom is permanent. Hold on!",
  "Every moment you resist is a victory. Celebrate the small wins!",
  "You didn't come this far to only come this far. Keep going!",
  "The pain of discipline is less than the pain of regret.",
  "You're not giving up something, you're gaining everything.",
  "Your mind is like the sky, and urges are just passing clouds.",
  "Progress, not perfection. Every step counts!",
  "You are breaking chains, not just habits.",
  "Believe in the process. Freedom is worth the fight!",
  "When it gets hard, remember why you started.",
  "You've already proven you can do this. Trust yourself!",
  "The best time to start was yesterday. The next best time is now.",
];

export default function FloatingRobot() {
  // सीमित रेंज: right लगभग 4%–10% (टॉप-राइट में), top लगभग 1%–4% (ऊपर)
  const [position, setPosition] = useState<{ right: number; top: number }>({
    right: 6,
    top: 2,
  });
  const [showTip, setShowTip] = useState(false);
  const [currentTip, setCurrentTip] = useState("");

  useEffect(() => {
    const moveRobot = setInterval(() => {
      // right और top को केवल छोटे रेंज में बदलो ताकि robot header/near-header में रहे
      const newRight = Math.random() * 10 + 15; // 4% to 10%
      const newTop = Math.random() * 10 + 10; // 1% to 4%
      setPosition({ right: newRight, top: newTop });
    }, 6000);

    return () => clearInterval(moveRobot);
  }, []);

  const handleClick = () => {
    const randomTip =
      motivationalTips[Math.floor(Math.random() * motivationalTips.length)];
    setCurrentTip(randomTip);
    setShowTip(true);
  };

  return (
    <>
      <motion.div
        // अब left नहीं — right और top इस्तेमाल कर रहे हैं ताकि टॉप-राइट फिक्स रहे
        animate={{
          right: `${position.right}%`,
          top: `${position.top}%`,
        }}
        transition={{
          duration: 4,
          ease: "easeInOut",
        }}
        className="fixed z-50 cursor-pointer"
        onClick={handleClick}
        data-testid="floating-robot"
        // inline style fallback ताकि initial render पर भी सही रहे
        style={{
          width: "40px",
          height: "40px",
          right: `${position.right}%`,
          top: `${position.top}%`,
        }}
      >
        <motion.div
          animate={{
            rotate: [0, 8, -8, 0],
            scale: [1, 1.08, 1],
          }}
          transition={{
            duration: 2,
            repeat: Infinity,
            repeatDelay: 1,
          }}
          className="w-10 h-10 bg-gradient-to-br from-primary to-secondary rounded-full flex items-center justify-center shadow-2xl hover-elevate"
        >
          <Bot className="w-5 h-5 text-white" />
        </motion.div>
      </motion.div>

      {showTip && (
        <motion.div
          initial={{ opacity: 0, scale: 0.8, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.8 }}
          className="fixed inset-0 z-[60] flex items-center justify-center p-4 bg-black/50"
          onClick={() => setShowTip(false)}
        >
          <Card
            className="p-6 max-w-md relative"
            onClick={(e) => e.stopPropagation()}
          >
            <Button
              variant="ghost"
              size="icon"
              className="absolute top-2 right-2 h-8 w-8"
              onClick={() => setShowTip(false)}
              data-testid="button-close-tip"
            >
              <X className="w-4 h-4" />
            </Button>

            <div className="flex items-start gap-4 mt-2">
              <div className="w-12 h-12 bg-gradient-to-br from-primary to-secondary rounded-full flex items-center justify-center flex-shrink-0">
                <Bot className="w-6 h-6 text-white" />
              </div>
              <div className="space-y-2">
                <h3 className="font-bold text-lg">Your Freedom Friend Says:</h3>
                <p className="text-foreground leading-relaxed">{currentTip}</p>
              </div>
            </div>
          </Card>
        </motion.div>
      )}
    </>
  );
}
