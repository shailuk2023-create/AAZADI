import CalendarView from '../CalendarView';
import { subDays } from 'date-fns';

export default function CalendarViewExample() {
  const today = new Date();
  const completedDays = [
    subDays(today, 1).toISOString().split('T')[0],
    subDays(today, 2).toISOString().split('T')[0],
    subDays(today, 3).toISOString().split('T')[0],
    subDays(today, 5).toISOString().split('T')[0],
    subDays(today, 7).toISOString().split('T')[0],
  ];

  return (
    <div className="p-4">
      <CalendarView 
        completedDays={completedDays}
        startDate={subDays(today, 10)}
        onMonthChange={(date) => console.log('Month changed:', date)}
      />
    </div>
  );
}
