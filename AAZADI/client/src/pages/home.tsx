import { useState, useEffect } from "react";
import { format, addDays, differenceInDays } from "date-fns";
import WelcomeScreen from "@/components/WelcomeScreen";
import AnimatedHeader from "@/components/AnimatedHeader";
import FloatingRobot from "@/components/FloatingRobot";
import CalendarView from "@/components/CalendarView";
import StatsCard from "@/components/StatsCard";
import DailyCheckIn from "@/components/DailyCheckIn";
import ResetModal from "@/components/ResetModal";
import CelebrationScreen from "@/components/CelebrationScreen";
import ProgressBar from "@/components/ProgressBar";
import HardnessChart from "@/components/HardnessChart";
import BreathingExercise from "@/components/BreathingExercise";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { Flame, Target, TrendingUp, RotateCcw, Info } from "lucide-react";
import { FaTelegram } from "react-icons/fa";

interface DailyEntry {
  date: string;
  hardnessLevel: number;
  notes: string;
  hadUrges: boolean;
}

interface Challenge {
  userName: string;
  addictionType: string;
  duration: number;
  startDate: string;
  dailyEntries: DailyEntry[];
  isCompleted: boolean;
}

export default function Home() {
  const [challenge, setChallenge] = useState<Challenge | null>(null);
  const [currentMonth, setCurrentMonth] = useState(new Date());
  const [showResetModal, setShowResetModal] = useState(false);
  const [showCelebration, setShowCelebration] = useState(false);

  useEffect(() => {
    const saved = localStorage.getItem('aazadi-challenge');
    if (saved) {
      const parsedChallenge = JSON.parse(saved);
      setChallenge(parsedChallenge);
      
      if (parsedChallenge.isCompleted) {
        setShowCelebration(true);
      }
    }
  }, []);

  useEffect(() => {
    if (challenge) {
      localStorage.setItem('aazadi-challenge', JSON.stringify(challenge));
      
      if (challenge.dailyEntries.length === challenge.duration && !challenge.isCompleted) {
        setChallenge({ ...challenge, isCompleted: true });
        setShowCelebration(true);
      }
    }
  }, [challenge]);

  const handleStartChallenge = (userName: string, addictionType: string, duration: number) => {
    const newChallenge: Challenge = {
      userName,
      addictionType,
      duration,
      startDate: format(new Date(), 'yyyy-MM-dd'),
      dailyEntries: [],
      isCompleted: false,
    };
    setChallenge(newChallenge);
  };

  const handleCheckIn = (hardnessLevel: number, notes: string, hadUrges: boolean) => {
    if (!challenge) return;
    
    const yesterday = format(addDays(new Date(), -1), 'yyyy-MM-dd');
    
    const existingEntry = challenge.dailyEntries.find(e => e.date === yesterday);
    if (existingEntry) return;
    
    const newEntry: DailyEntry = {
      date: yesterday,
      hardnessLevel,
      notes,
      hadUrges,
    };
    
    setChallenge({
      ...challenge,
      dailyEntries: [...challenge.dailyEntries, newEntry].sort((a, b) => 
        new Date(a.date).getTime() - new Date(b.date).getTime()
      ),
    });
  };

  const handleReset = (promise: string) => {
    if (!challenge) return;
    
    setChallenge({
      ...challenge,
      startDate: format(new Date(), 'yyyy-MM-dd'),
      dailyEntries: [],
      isCompleted: false,
    });
    setShowCelebration(false);
    console.log('Challenge reset with promise:', promise);
  };

  const handleExtendChallenge = () => {
    if (!challenge) return;
    
    setChallenge({
      ...challenge,
      duration: challenge.duration + 30,
      isCompleted: false,
    });
    setShowCelebration(false);
  };

  const handleStartNewChallenge = () => {
    setChallenge(null);
    setShowCelebration(false);
    localStorage.removeItem('aazadi-challenge');
  };

  if (!challenge) {
    return <WelcomeScreen onStartChallenge={handleStartChallenge} />;
  }

  if (showCelebration && challenge.isCompleted) {
    return (
      <CelebrationScreen
        challengeName={`Freedom from ${challenge.addictionType}`}
        daysCompleted={challenge.dailyEntries.length}
        onStartNew={handleStartNewChallenge}
        onExtend={handleExtendChallenge}
      />
    );
  }

  const yesterday = format(addDays(new Date(), -1), 'yyyy-MM-dd');
  const isYesterdayCompleted = challenge.dailyEntries.some(e => e.date === yesterday);
  
  const startDate = new Date(challenge.startDate);
  const currentDay = differenceInDays(new Date(), startDate) + 1;
  const daysRemaining = challenge.duration - challenge.dailyEntries.length;
  
  const completedDates = challenge.dailyEntries.map(e => e.date);
  
  const currentStreak = (() => {
    let streak = 0;
    let checkDate = addDays(new Date(), -1);
    
    while (true) {
      const dateStr = format(checkDate, 'yyyy-MM-dd');
      if (challenge.dailyEntries.some(e => e.date === dateStr)) {
        streak++;
        checkDate = addDays(checkDate, -1);
      } else {
        break;
      }
    }
    return streak;
  })();

  const canCheckIn = currentDay > 1 && !isYesterdayCompleted;

  return (
    <div className="min-h-screen bg-background">
      <AnimatedHeader userName={challenge.userName} />
      <FloatingRobot />
      
      <div className="max-w-7xl mx-auto p-4 md:p-8 space-y-6">
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
          <div>
            <h2 className="text-3xl font-bold mb-2">Freedom from {challenge.addictionType}</h2>
            <p className="text-muted-foreground">
              {challenge.duration}-day journey • Started {format(new Date(challenge.startDate), 'MMM d, yyyy')}
            </p>
          </div>
          <Button 
            variant="outline" 
            onClick={() => setShowResetModal(true)}
            data-testid="button-reset"
          >
            <RotateCcw className="w-4 h-4 mr-2" />
            Reset
          </Button>
        </div>

        {challenge.dailyEntries.length === 0 && (
          <Alert className="bg-primary/10 border-primary">
            <Info className="h-4 w-4" />
            <AlertDescription>
              Complete today's challenge with full effort; tomorrow's challenge will unlock next.
            </AlertDescription>
          </Alert>
        )}

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <StatsCard
            title="Current Streak"
            value={`${currentStreak} days`}
            subtitle={currentStreak > 0 ? "Keep going!" : "Start today"}
            icon={Flame}
            iconColor="text-secondary"
          />
          <StatsCard
            title="Days Remaining"
            value={daysRemaining}
            subtitle={`${challenge.dailyEntries.length} of ${challenge.duration} done`}
            icon={Target}
          />
          <StatsCard
            title="Completion"
            value={`${Math.round((challenge.dailyEntries.length / challenge.duration) * 100)}%`}
            subtitle={daysRemaining === 0 ? "Complete!" : `${daysRemaining} to go`}
            icon={TrendingUp}
            iconColor="text-primary"
          />
        </div>

        <ProgressBar 
          value={challenge.dailyEntries.length} 
          max={challenge.duration} 
        />

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div className="lg:col-span-2 space-y-6">
            {canCheckIn && (
              <DailyCheckIn
                dayNumber={Math.min(currentDay, challenge.duration)}
                totalDays={challenge.duration}
                isCompleted={isYesterdayCompleted}
                onCheckIn={handleCheckIn}
              />
            )}
            
            {challenge.dailyEntries.length > 0 && (
              <HardnessChart data={challenge.dailyEntries} />
            )}

            <div className="space-y-3">
              <h3 className="text-xl font-bold">Quick Calm Exercises</h3>
              <Tabs defaultValue="calm" className="w-full">
                <TabsList className="grid w-full grid-cols-3 lg:grid-cols-6">
                  <TabsTrigger value="calm">Calm</TabsTrigger>
                  <TabsTrigger value="box">Box</TabsTrigger>
                  <TabsTrigger value="focus">4-7-8</TabsTrigger>
                  <TabsTrigger value="blink">Blink</TabsTrigger>
                  <TabsTrigger value="focushold">Focus</TabsTrigger>
                  <TabsTrigger value="track">Track</TabsTrigger>
                </TabsList>
                <TabsContent value="calm" className="mt-3">
                  <BreathingExercise exerciseType="calm" />
                </TabsContent>
                <TabsContent value="box" className="mt-3">
                  <BreathingExercise exerciseType="energize" />
                </TabsContent>
                <TabsContent value="focus" className="mt-3">
                  <BreathingExercise exerciseType="focus" />
                </TabsContent>
                <TabsContent value="blink" className="mt-3">
                  <BreathingExercise exerciseType="blink" />
                </TabsContent>
                <TabsContent value="focushold" className="mt-3">
                  <BreathingExercise exerciseType="focushold" />
                </TabsContent>
                <TabsContent value="track" className="mt-3">
                  <BreathingExercise exerciseType="visualtrack" />
                </TabsContent>
              </Tabs>
            </div>
          </div>

          <div className="space-y-4">
            <CalendarView
              completedDays={completedDates}
              currentDate={currentMonth}
              startDate={startDate}
              onMonthChange={setCurrentMonth}
            />
          </div>
        </div>

        <footer className="text-center pt-8 pb-4 border-t space-y-3">
          <p className="text-base font-serif italic text-foreground">
            Created with purpose and persistence by Mr. Shailendra Kushwah
          </p>
          <a 
            href="https://t.me/shailuk7" 
            target="_blank" 
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 text-primary hover:text-primary/80 transition-colors"
            data-testid="link-telegram"
          >
            <FaTelegram className="w-6 h-6" />
            <span className="font-medium">Connect on Telegram</span>
          </a>
        </footer>
      </div>

      <ResetModal
        open={showResetModal}
        onOpenChange={setShowResetModal}
        onReset={handleReset}
      />
    </div>
  );
}
