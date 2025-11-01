import { useState } from "react";
import { Card, CardHeader, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Slider } from "@/components/ui/slider";
import { Checkbox } from "@/components/ui/checkbox";
import { CheckCircle2, Circle } from "lucide-react";

interface DailyCheckInProps {
  dayNumber: number;
  totalDays: number;
  isCompleted: boolean;
  motivationalQuote?: string;
  onCheckIn: (hardnessLevel: number, notes: string, hadUrges: boolean) => void;
}

const defaultQuotes = [
  "Every day is a new opportunity to grow stronger.",
  "Small steps lead to big changes.",
  "You're building something amazing, one day at a time.",
  "Consistency is the key to transformation.",
  "Believe in yourself and keep going!",
];

const hardnessLabels = ["Easy", "Manageable", "Moderate", "Challenging", "Very Hard"];

export default function DailyCheckIn({ 
  dayNumber, 
  totalDays, 
  isCompleted, 
  motivationalQuote,
  onCheckIn 
}: DailyCheckInProps) {
  const [hardnessLevel, setHardnessLevel] = useState(2);
  const [notes, setNotes] = useState("");
  const [hadUrges, setHadUrges] = useState(false);
  const [showFeedback, setShowFeedback] = useState(false);

  const quote = motivationalQuote || defaultQuotes[Math.floor(Math.random() * defaultQuotes.length)];

  const handleCheckIn = () => {
    setShowFeedback(true);
  };

  const handleSubmit = () => {
    onCheckIn(hardnessLevel, notes, hadUrges);
    setShowFeedback(false);
    setNotes("");
    setHardnessLevel(2);
    setHadUrges(false);
  };

  return (
    <Card className="overflow-hidden shadow-lg">
      <CardHeader className="bg-gradient-to-r from-primary/10 to-secondary/10 pb-4">
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-2xl font-bold">Today's Progress</h2>
            <p className="text-muted-foreground">
              Day {dayNumber} of {totalDays}
            </p>
          </div>
          <Badge variant={isCompleted ? "default" : "secondary"} className="text-base px-4 py-2">
            {Math.round((dayNumber / totalDays) * 100)}%
          </Badge>
        </div>
      </CardHeader>
      
      <CardContent className="pt-6 space-y-6">
        <div className="bg-accent/50 rounded-md p-4 border-l-4 border-primary">
          <p className="italic text-foreground">&ldquo;{quote}&rdquo;</p>
        </div>

        {isCompleted ? (
          <div className="text-center py-8 space-y-4">
            <CheckCircle2 className="w-16 h-16 text-primary mx-auto" data-testid="icon-completed" />
            <div>
              <h3 className="text-2xl font-bold text-primary">Great job!</h3>
              <p className="text-muted-foreground">You've completed today's challenge</p>
            </div>
          </div>
        ) : !showFeedback ? (
          <div className="text-center py-4 space-y-4">
            <Circle className="w-16 h-16 text-muted-foreground mx-auto" />
            <Button 
              size="lg" 
              className="w-full max-w-md text-lg shadow-lg bg-gradient-to-r from-primary to-primary/90 hover:from-primary/90 hover:to-primary"
              onClick={handleCheckIn}
              data-testid="button-check-in"
            >
              <CheckCircle2 className="w-5 h-5 mr-2" />
              Mark Today Complete
            </Button>
          </div>
        ) : (
          <div className="space-y-6 py-4">
            <div className="space-y-3">
              <Label>How challenging was today? (1-5)</Label>
              <div className="space-y-2">
                <Slider
                  value={[hardnessLevel]}
                  onValueChange={(value) => setHardnessLevel(value[0])}
                  min={0}
                  max={4}
                  step={1}
                  className="w-full"
                  data-testid="slider-hardness"
                />
                <div className="flex justify-between text-xs text-muted-foreground">
                  {hardnessLabels.map((label, idx) => (
                    <span key={idx} className={hardnessLevel === idx ? 'text-primary font-semibold' : ''}>
                      {label}
                    </span>
                  ))}
                </div>
              </div>
            </div>

            <div className="flex items-center space-x-2">
              <Checkbox
                id="had-urges"
                checked={hadUrges}
                onCheckedChange={(checked) => setHadUrges(checked as boolean)}
                data-testid="checkbox-urges"
              />
              <Label 
                htmlFor="had-urges" 
                className="text-sm font-normal cursor-pointer"
              >
                I experienced urges or cravings today
              </Label>
            </div>

            <div className="space-y-2">
              <Label htmlFor="notes">How did you feel today? (Optional)</Label>
              <Textarea
                id="notes"
                placeholder="Share your thoughts, feelings, or what helped you stay strong today..."
                value={notes}
                onChange={(e) => setNotes(e.target.value)}
                className="min-h-24 resize-none"
                data-testid="textarea-notes"
              />
            </div>

            <Button 
              size="lg" 
              className="w-full text-lg shadow-lg"
              onClick={handleSubmit}
              data-testid="button-submit-feedback"
            >
              <CheckCircle2 className="w-5 h-5 mr-2" />
              Complete Day {dayNumber}
            </Button>
          </div>
        )}
      </CardContent>
    </Card>
  );
}
