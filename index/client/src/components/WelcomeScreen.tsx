import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card } from "@/components/ui/card";
import { motion } from "framer-motion";
import { Sparkles } from "lucide-react";
import welcomeBg from "@assets/generated_images/Meditation_sunrise_inspiration_image_7ed3d82b.png";

interface WelcomeScreenProps {
  onStartChallenge: (userName: string, addictionType: string, duration: number) => void;
}

const durations = [
  { days: 21, label: "21 Days", description: "Foundation" },
  { days: 45, label: "45 Days", description: "Habit Formation" },
  { days: 90, label: "90 Days", description: "Life Change" },
  { days: 180, label: "6 Months", description: "Major Milestone" },
  { days: 365, label: "1 Year", description: "Freedom" },
];

const commonAddictions = [
  "Smoking/Tobacco",
  "Alcohol",
  "Social Media",
  "Pornography",
  "Junk Food",
  "Gaming",
  "Shopping",
  "Other"
];

export default function WelcomeScreen({ onStartChallenge }: WelcomeScreenProps) {
  const [selectedDuration, setSelectedDuration] = useState<number | null>(null);
  const [userName, setUserName] = useState("");
  const [selectedAddiction, setSelectedAddiction] = useState("");
  const [customAddiction, setCustomAddiction] = useState("");

  const handleStart = () => {
    const addiction = selectedAddiction === "Other" ? customAddiction : selectedAddiction;
    if (userName && addiction && selectedDuration) {
      onStartChallenge(userName, addiction, selectedDuration);
    }
  };

  const isFormValid = userName && selectedAddiction && selectedDuration && 
    (selectedAddiction !== "Other" || customAddiction);

  return (
    <div className="min-h-screen relative flex flex-col items-center justify-center p-4">
      <div 
        className="absolute inset-0 bg-cover bg-center"
        style={{ backgroundImage: `url(${welcomeBg})` }}
      />
      <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-black/50 to-black/70" />
      
      <div className="relative z-10 w-full max-w-2xl text-center space-y-8">
        <motion.div
          initial={{ scale: 0.8, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ duration: 0.6 }}
          className="flex flex-col items-center mb-4"
        >
          <motion.div 
            className="w-24 h-24 bg-gradient-to-br from-primary to-secondary rounded-full flex items-center justify-center mb-4 shadow-2xl"
            animate={{ 
              rotate: [0, 5, -5, 0],
              scale: [1, 1.05, 1]
            }}
            transition={{ duration: 3, repeat: Infinity }}
          >
            <Sparkles className="w-12 h-12 text-white" />
          </motion.div>

          <h1 className="text-5xl md:text-7xl font-bold text-white mb-4 leading-tight">
            आज़ादी • AAZADI
          </h1>
          <p className="text-xl md:text-2xl text-white/90 max-w-xl mx-auto">
            Your journey to freedom starts here. Take control, one day at a time.
          </p>
        </motion.div>

        <Card className="p-6 md:p-8 space-y-6 bg-background/95 backdrop-blur-sm">
          <div className="space-y-2">
            <Label htmlFor="user-name" className="text-base">What's your name?</Label>
            <Input
              id="user-name"
              placeholder="Enter your name..."
              value={userName}
              onChange={(e) => setUserName(e.target.value)}
              className="text-base"
              data-testid="input-user-name"
            />
          </div>

          <div className="space-y-3">
            <Label className="text-base">What are you overcoming?</Label>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-2">
              {commonAddictions.map((addiction) => (
                <button
                  key={addiction}
                  onClick={() => setSelectedAddiction(addiction)}
                  data-testid={`button-addiction-${addiction.toLowerCase().replace(/\s/g, '-')}`}
                  className={`
                    p-3 rounded-md text-sm font-medium border-2 transition-all hover-elevate active-elevate-2
                    ${selectedAddiction === addiction 
                      ? 'border-primary bg-primary/10' 
                      : 'border-border bg-card'
                    }
                  `}
                >
                  {addiction}
                </button>
              ))}
            </div>
            
            {selectedAddiction === "Other" && (
              <Input
                placeholder="Specify your addiction..."
                value={customAddiction}
                onChange={(e) => setCustomAddiction(e.target.value)}
                className="mt-2"
                data-testid="input-custom-addiction"
              />
            )}
          </div>

          <div className="space-y-3">
            <Label className="text-base">Choose your commitment duration</Label>
            <div className="grid grid-cols-2 md:grid-cols-5 gap-3">
              {durations.map((duration) => (
                <button
                  key={duration.days}
                  onClick={() => setSelectedDuration(duration.days)}
                  data-testid={`button-duration-${duration.days}`}
                  className={`
                    p-4 rounded-md border-2 transition-all hover-elevate active-elevate-2
                    ${selectedDuration === duration.days 
                      ? 'border-primary bg-primary/10' 
                      : 'border-border bg-card'
                    }
                  `}
                >
                  <div className="font-bold text-base">{duration.label}</div>
                  <div className="text-xs text-muted-foreground mt-1">{duration.description}</div>
                </button>
              ))}
            </div>
          </div>

          <Button
            size="lg"
            className="w-full text-lg shadow-lg"
            onClick={handleStart}
            disabled={!isFormValid}
            data-testid="button-start-challenge"
          >
            <Sparkles className="w-5 h-5 mr-2" />
            Begin My Journey to Freedom
          </Button>
        </Card>

        <p className="text-white/70 text-sm">
          App made by Mr. Shailendra Kushwah
        </p>
      </div>
    </div>
  );
}
