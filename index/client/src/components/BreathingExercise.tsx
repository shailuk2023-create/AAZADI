import { useState, useEffect } from "react";
import { Card, CardHeader, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { motion, AnimatePresence } from "framer-motion";
import { Play, Pause, RotateCcw, Eye, Focus, Target } from "lucide-react";

interface BreathingExerciseProps {
  exerciseType?: "calm" | "energize" | "focus" | "blink" | "visualtrack" | "focushold";
}

const exercises = {
  calm: {
    name: "4-4-4 Calming Breath",
    icon: Focus,
    phases: [
      { label: "Breathe In", duration: 4000, color: "from-primary to-primary/80" },
      { label: "Hold", duration: 4000, color: "from-gold to-gold/80" },
      { label: "Breathe Out", duration: 4000, color: "from-secondary to-secondary/80" },
    ]
  },
  energize: {
    name: "Box Breathing",
    icon: Target,
    phases: [
      { label: "Breathe In", duration: 4000, color: "from-primary to-primary/80" },
      { label: "Hold", duration: 4000, color: "from-gold to-gold/80" },
      { label: "Breathe Out", duration: 4000, color: "from-secondary to-secondary/80" },
      { label: "Hold", duration: 4000, color: "from-accent to-accent/80" },
    ]
  },
  focus: {
    name: "4-7-8 Relaxation",
    icon: Focus,
    phases: [
      { label: "Breathe In", duration: 4000, color: "from-primary to-primary/80" },
      { label: "Hold", duration: 7000, color: "from-gold to-gold/80" },
      { label: "Breathe Out", duration: 8000, color: "from-secondary to-secondary/80" },
    ]
  },
  blink: {
    name: "Mindfulness Blink",
    icon: Eye,
    phases: [
      { label: "Close Eyes", duration: 2000, color: "from-secondary to-secondary/80" },
      { label: "Feel Present", duration: 3000, color: "from-primary to-primary/80" },
      { label: "Open Slowly", duration: 2000, color: "from-gold to-gold/80" },
      { label: "Observe", duration: 3000, color: "from-accent to-accent/80" },
    ]
  },
  focushold: {
    name: "5-Second Focus Hold",
    icon: Target,
    phases: [
      { label: "Focus Point", duration: 5000, color: "from-primary to-gold" },
      { label: "Rest Eyes", duration: 3000, color: "from-secondary to-accent" },
    ]
  },
  visualtrack: {
    name: "Visual Tracking",
    icon: Eye,
    phases: [
      { label: "Look Left", duration: 2000, color: "from-primary to-primary/80" },
      { label: "Look Right", duration: 2000, color: "from-secondary to-secondary/80" },
      { label: "Look Up", duration: 2000, color: "from-gold to-gold/80" },
      { label: "Look Down", duration: 2000, color: "from-accent to-accent/80" },
      { label: "Center", duration: 2000, color: "from-primary to-gold" },
    ]
  }
};

export default function BreathingExercise({ exerciseType = "calm" }: BreathingExerciseProps) {
  const [isActive, setIsActive] = useState(false);
  const [currentPhase, setCurrentPhase] = useState(0);
  const [timeRemaining, setTimeRemaining] = useState(0);

  const exercise = exercises[exerciseType];
  const phase = exercise.phases[currentPhase];
  const Icon = exercise.icon;

  useEffect(() => {
    let interval: NodeJS.Timeout;

    if (isActive) {
      setTimeRemaining(phase.duration);
      
      interval = setInterval(() => {
        setTimeRemaining((prev) => {
          if (prev <= 100) {
            setCurrentPhase((p) => (p + 1) % exercise.phases.length);
            return phase.duration;
          }
          return prev - 100;
        });
      }, 100);
    }

    return () => clearInterval(interval);
  }, [isActive, currentPhase, phase.duration, exercise.phases.length]);

  const handleReset = () => {
    setIsActive(false);
    setCurrentPhase(0);
    setTimeRemaining(0);
  };

  return (
    <Card className="shadow-md">
      <CardHeader className="pb-3">
        <div className="flex items-center gap-2">
          <Icon className="w-5 h-5 text-primary" />
          <h3 className="text-base font-bold">{exercise.name}</h3>
        </div>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="relative flex items-center justify-center h-40">
          <AnimatePresence mode="wait">
            <motion.div
              key={currentPhase}
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ 
                scale: isActive ? [0.8, 1.1, 0.8] : 1,
                opacity: 1
              }}
              exit={{ scale: 0.8, opacity: 0 }}
              transition={{ 
                duration: phase.duration / 1000,
                repeat: 0,
                ease: "easeInOut"
              }}
              className={`w-28 h-28 rounded-full bg-gradient-to-br ${phase.color} flex items-center justify-center shadow-xl`}
            >
              <div className="text-center text-white">
                <div className="text-sm font-semibold">{phase.label}</div>
                {isActive && (
                  <div className="text-2xl font-bold mt-1">
                    {Math.ceil(timeRemaining / 1000)}
                  </div>
                )}
              </div>
            </motion.div>
          </AnimatePresence>
        </div>

        <div className="flex items-center justify-center gap-2">
          <Button
            size="sm"
            onClick={() => setIsActive(!isActive)}
            className="gap-2"
            data-testid="button-breathing-toggle"
          >
            {isActive ? <Pause className="w-4 h-4" /> : <Play className="w-4 h-4" />}
            {isActive ? 'Pause' : 'Start'}
          </Button>
          <Button
            size="sm"
            variant="outline"
            onClick={handleReset}
            data-testid="button-breathing-reset"
          >
            <RotateCcw className="w-4 h-4" />
          </Button>
        </div>

        <div className="text-center text-xs text-muted-foreground">
          {exercise.phases.map((p, i) => (
            <span key={i} className={i === currentPhase && isActive ? 'text-primary font-semibold' : ''}>
              {p.label}{i < exercise.phases.length - 1 ? ' → ' : ''}
            </span>
          ))}
        </div>
      </CardContent>
    </Card>
  );
}
