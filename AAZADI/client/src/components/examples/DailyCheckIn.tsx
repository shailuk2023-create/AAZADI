import { useState } from 'react';
import DailyCheckIn from '../DailyCheckIn';

export default function DailyCheckInExample() {
  const [isCompleted, setIsCompleted] = useState(false);

  return (
    <div className="p-4 max-w-2xl mx-auto">
      <DailyCheckIn 
        dayNumber={23}
        totalDays={90}
        isCompleted={isCompleted}
        onCheckIn={(hardness, notes, urges) => {
          console.log({ hardness, notes, urges });
          setIsCompleted(true);
        }}
      />
    </div>
  );
}
