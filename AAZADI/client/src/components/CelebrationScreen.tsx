import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Trophy, Sparkles, RotateCcw, ArrowRight } from "lucide-react";
import { motion } from "framer-motion";
import trophyImage from "@assets/generated_images/Gold_achievement_trophy_icon_039e833f.png";

interface CelebrationScreenProps {
  challengeName: string;
  daysCompleted: number;
  onStartNew: () => void;
  onExtend: () => void;
}

export default function CelebrationScreen({ 
  challengeName, 
  daysCompleted,
  onStartNew,
  onExtend 
}: CelebrationScreenProps) {
  return (
    <div className="min-h-screen bg-gradient-to-br from-gold/20 via-primary/10 to-background flex items-center justify-center p-4">
      <motion.div
        initial={{ scale: 0.8, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ duration: 0.5 }}
        className="w-full max-w-2xl"
      >
        <Card className="p-8 md:p-12 text-center space-y-8 relative overflow-hidden">
          <motion.div
            initial={{ y: -20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.2, duration: 0.5 }}
          >
            <div className="flex justify-center mb-6">
              <motion.div
                animate={{ 
                  rotate: [0, -10, 10, -10, 0],
                  scale: [1, 1.1, 1]
                }}
                transition={{ 
                  duration: 1.5,
                  repeat: Infinity,
                  repeatDelay: 2
                }}
              >
                <img 
                  src={trophyImage} 
                  alt="Achievement Trophy" 
                  className="w-32 h-32 md:w-40 md:h-40"
                />
              </motion.div>
            </div>
            
            <div className="inline-block">
              <motion.div
                animate={{ scale: [1, 1.05, 1] }}
                transition={{ duration: 2, repeat: Infinity }}
              >
                <h1 className="text-4xl md:text-6xl font-bold text-gold mb-2">
                  Congratulations!
                </h1>
              </motion.div>
            </div>
            
            <p className="text-xl md:text-2xl text-foreground font-medium">
              You completed your challenge!
            </p>
          </motion.div>

          <motion.div
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.4, duration: 0.5 }}
            className="space-y-4"
          >
            <div className="bg-gradient-to-r from-primary/10 to-gold/10 rounded-lg p-6 border border-primary/20">
              <h2 className="text-2xl font-bold mb-2">{challengeName}</h2>
              <div className="flex items-center justify-center gap-2 text-lg text-muted-foreground">
                <Trophy className="w-5 h-5 text-gold" />
                <span>{daysCompleted} days completed</span>
              </div>
            </div>

            <p className="text-muted-foreground italic max-w-md mx-auto">
              You've proven your commitment and built lasting habits. This achievement is a testament to your dedication and perseverance.
            </p>
          </motion.div>

          <motion.div
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.6, duration: 0.5 }}
            className="flex flex-col sm:flex-row gap-4 pt-4"
          >
            <Button
              size="lg"
              variant="outline"
              className="flex-1 text-lg"
              onClick={onStartNew}
              data-testid="button-start-new"
            >
              <RotateCcw className="w-5 h-5 mr-2" />
              Start New Challenge
            </Button>
            <Button
              size="lg"
              className="flex-1 text-lg"
              onClick={onExtend}
              data-testid="button-extend"
            >
              <Sparkles className="w-5 h-5 mr-2" />
              Extend Challenge
              <ArrowRight className="w-5 h-5 ml-2" />
            </Button>
          </motion.div>
        </Card>
      </motion.div>

      {/* Confetti effect */}
      <div className="fixed inset-0 pointer-events-none">
        {[...Array(20)].map((_, i) => (
          <motion.div
            key={i}
            initial={{ 
              y: -20, 
              x: Math.random() * window.innerWidth,
              rotate: 0,
              opacity: 1
            }}
            animate={{ 
              y: window.innerHeight + 20,
              rotate: 360,
              opacity: 0
            }}
            transition={{ 
              duration: 3 + Math.random() * 2,
              delay: Math.random() * 2,
              repeat: Infinity
            }}
            className={`absolute w-2 h-2 ${
              i % 3 === 0 ? 'bg-gold' : i % 3 === 1 ? 'bg-primary' : 'bg-secondary'
            } rounded-full`}
          />
        ))}
      </div>
    </div>
  );
}
