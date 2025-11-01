import { motion } from "framer-motion";
import { Sparkles, Info } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";

const tips = [
  {
    title: "Recognize Triggers",
    description: "Identify situations, emotions, or people that trigger urges. Awareness is the first step to control."
  },
  {
    title: "Deep Breathing",
    description: "When urges hit, take 10 deep breaths. Inhale for 4 counts, hold for 4, exhale for 4. This calms your nervous system."
  },
  {
    title: "Delay Technique",
    description: "Tell yourself to wait 10 minutes. Often, urges pass within this time. Distract yourself with a different activity."
  },
  {
    title: "Physical Activity",
    description: "Exercise releases endorphins. A quick walk, pushups, or stretching can redirect your energy positively."
  },
  {
    title: "Call Someone",
    description: "Reach out to a trusted friend or family member. Talking about your struggle reduces its power."
  },
  {
    title: "Remind Yourself Why",
    description: "Review your motivational promise. Remember the reasons you started this journey and the life you're building."
  }
];

interface AnimatedHeaderProps {
  userName?: string;
}

export default function AnimatedHeader({ userName }: AnimatedHeaderProps) {
  return (
    <motion.header 
      initial={{ y: -20, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.5 }}
      className="bg-gradient-to-r from-primary via-primary/90 to-secondary p-6 shadow-lg sticky top-0 z-50"
    >
      <div className="max-w-7xl mx-auto flex items-center justify-between">
        <div className="flex items-center gap-4">
          <motion.div
            animate={{ 
              rotate: [0, 5, -5, 0],
              scale: [1, 1.05, 1]
            }}
            transition={{ 
              duration: 3,
              repeat: Infinity,
              repeatDelay: 2
            }}
            className="w-12 h-12 md:w-14 md:h-14 bg-white rounded-full flex items-center justify-center shadow-md"
          >
            <Sparkles className="w-7 h-7 md:w-8 md:h-8 text-primary" />
          </motion.div>
          
          <div>
            <motion.h1 
              className="text-2xl md:text-3xl font-bold text-white tracking-wide"
              animate={{ 
                textShadow: [
                  "0 0 10px rgba(255,255,255,0.5)",
                  "0 0 20px rgba(255,255,255,0.8)",
                  "0 0 10px rgba(255,255,255,0.5)"
                ]
              }}
              transition={{ duration: 2, repeat: Infinity }}
            >
              आज़ादी • AAZADI
            </motion.h1>
            {userName && (
              <p className="text-white/90 text-sm">Welcome back, {userName}!</p>
            )}
          </div>
        </div>

        <Popover>
          <PopoverTrigger asChild>
            <Button 
              variant="secondary" 
              size="sm"
              className="gap-2"
              data-testid="button-tips"
            >
              <Info className="w-4 h-4" />
              <span className="hidden md:inline">Tips</span>
            </Button>
          </PopoverTrigger>
          <PopoverContent className="w-80 md:w-96 max-h-96 overflow-y-auto">
            <div className="space-y-4">
              <h3 className="font-bold text-lg">Tips to Control Urges</h3>
              {tips.map((tip, index) => (
                <div key={index} className="space-y-1 pb-3 border-b last:border-0">
                  <h4 className="font-semibold text-primary">{tip.title}</h4>
                  <p className="text-sm text-muted-foreground">{tip.description}</p>
                </div>
              ))}
            </div>
          </PopoverContent>
        </Popover>
      </div>
    </motion.header>
  );
}
