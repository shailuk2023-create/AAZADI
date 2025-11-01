import { useState, useEffect } from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { AlertTriangle } from "lucide-react";

interface ResetModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onReset: (promise: string) => void;
}

const REQUIRED_PROMISE = `I may fall, but I will rise again.
Each setback will remind me why I started.
I will stay patient, focused, and honest with myself.
This challenge is not about being perfect,
it's about becoming stronger each day.

No matter how many times I slip,
I will always stand back up and keep going.`;

export default function ResetModal({ open, onOpenChange, onReset }: ResetModalProps) {
  const [promise, setPromise] = useState("");
  const [isTypingCorrect, setIsTypingCorrect] = useState(false);

  useEffect(() => {
    const normalized = promise.trim().replace(/\s+/g, ' ');
    const requiredNormalized = REQUIRED_PROMISE.trim().replace(/\s+/g, ' ');
    setIsTypingCorrect(normalized === requiredNormalized);
  }, [promise]);

  const handleReset = () => {
    if (isTypingCorrect) {
      onReset(promise);
      setPromise("");
      onOpenChange(false);
    }
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-2xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <div className="flex items-center gap-3 mb-2">
            <div className="w-12 h-12 rounded-full bg-destructive/10 flex items-center justify-center">
              <AlertTriangle className="w-6 h-6 text-destructive" />
            </div>
            <DialogTitle className="text-2xl">Reset Challenge</DialogTitle>
          </div>
          <DialogDescription className="text-base">
            Falling is part of the journey. To reset, type the following promise to yourself exactly as shown below:
          </DialogDescription>
        </DialogHeader>

        <div className="space-y-4 py-4">
          <div className="bg-muted p-4 rounded-md">
            <p className="text-sm font-mono whitespace-pre-line leading-relaxed">
              {REQUIRED_PROMISE}
            </p>
          </div>

          <div className="space-y-2">
            <Label htmlFor="promise">Type the promise above exactly:</Label>
            <Textarea
              id="promise"
              placeholder="Type the promise here..."
              value={promise}
              onChange={(e) => setPromise(e.target.value)}
              className="min-h-40 resize-none font-mono text-sm"
              data-testid="textarea-promise"
            />
            {promise && (
              <p className={`text-sm ${isTypingCorrect ? 'text-primary' : 'text-muted-foreground'}`}>
                {isTypingCorrect ? '✓ Promise typed correctly' : 'Keep typing...'}
              </p>
            )}
          </div>
        </div>

        <DialogFooter>
          <Button 
            variant="outline" 
            onClick={() => {
              setPromise("");
              onOpenChange(false);
            }}
            data-testid="button-cancel-reset"
          >
            Cancel
          </Button>
          <Button
            variant="destructive"
            onClick={handleReset}
            disabled={!isTypingCorrect}
            data-testid="button-confirm-reset"
          >
            Reset Challenge
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
