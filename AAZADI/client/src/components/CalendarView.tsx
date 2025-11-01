import { ChevronLeft, ChevronRight, Check } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { format, startOfMonth, endOfMonth, eachDayOfInterval, isSameMonth, isSameDay, addMonths, subMonths, startOfWeek, endOfWeek } from "date-fns";

interface CalendarViewProps {
  completedDays: string[];
  currentDate?: Date;
  startDate: Date;
  onMonthChange?: (date: Date) => void;
}

export default function CalendarView({ 
  completedDays, 
  currentDate = new Date(),
  startDate,
  onMonthChange 
}: CalendarViewProps) {
  const monthStart = startOfMonth(currentDate);
  const monthEnd = endOfMonth(currentDate);
  const calendarStart = startOfWeek(monthStart);
  const calendarEnd = endOfWeek(monthEnd);
  
  const days = eachDayOfInterval({ start: calendarStart, end: calendarEnd });
  const weekDays = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];

  const isCompleted = (date: Date) => {
    return completedDays.includes(format(date, 'yyyy-MM-dd'));
  };

  const isToday = (date: Date) => {
    return isSameDay(date, new Date());
  };

  const isFutureDay = (date: Date) => {
    return date > new Date();
  };

  const isBeforeStart = (date: Date) => {
    return date < startDate;
  };

  return (
    <Card className="p-4 space-y-3 shadow-lg">
      <div className="flex items-center justify-between">
        <h3 className="text-lg font-bold">
          {format(currentDate, 'MMM yyyy')}
        </h3>
        <div className="flex gap-1">
          <Button
            variant="ghost"
            size="icon"
            className="h-8 w-8"
            onClick={() => onMonthChange?.(subMonths(currentDate, 1))}
            data-testid="button-prev-month"
          >
            <ChevronLeft className="w-4 h-4" />
          </Button>
          <Button
            variant="ghost"
            size="icon"
            className="h-8 w-8"
            onClick={() => onMonthChange?.(addMonths(currentDate, 1))}
            data-testid="button-next-month"
          >
            <ChevronRight className="w-4 h-4" />
          </Button>
        </div>
      </div>

      <div className="grid grid-cols-7 gap-1">
        {weekDays.map((day, idx) => (
          <div key={`weekday-${idx}`} className="text-center text-xs font-semibold text-muted-foreground py-1">
            {day.charAt(0)}
          </div>
        ))}
        
        {days.map((day, index) => {
          const completed = isCompleted(day);
          const today = isToday(day);
          const future = isFutureDay(day);
          const beforeStart = isBeforeStart(day);
          const currentMonth = isSameMonth(day, currentDate);
          
          return (
            <div
              key={index}
              data-testid={`calendar-day-${format(day, 'yyyy-MM-dd')}`}
              className={`
                aspect-square flex items-center justify-center rounded text-xs relative
                ${!currentMonth ? 'opacity-20' : ''}
                ${completed ? 'bg-primary text-primary-foreground font-semibold' : ''}
                ${!completed && !future && !beforeStart && currentMonth ? 'bg-accent' : ''}
                ${today ? 'ring-2 ring-secondary' : ''}
                ${future || beforeStart ? 'opacity-30' : ''}
              `}
            >
              <span>{format(day, 'd')}</span>
              {completed && (
                <Check className="w-2 h-2 absolute bottom-0.5 right-0.5" data-testid={`check-${format(day, 'yyyy-MM-dd')}`} />
              )}
            </div>
          );
        })}
      </div>

      <div className="flex flex-wrap gap-2 text-xs pt-2 border-t">
        <div className="flex items-center gap-1">
          <div className="w-3 h-3 rounded bg-primary" />
          <span>Done</span>
        </div>
        <div className="flex items-center gap-1">
          <div className="w-3 h-3 rounded ring-2 ring-secondary" />
          <span>Today</span>
        </div>
      </div>
    </Card>
  );
}
