import StatsCard from '../StatsCard';
import { Flame, Target, TrendingUp } from 'lucide-react';

export default function StatsCardExample() {
  return (
    <div className="p-4 grid grid-cols-1 md:grid-cols-3 gap-4">
      <StatsCard 
        title="Current Streak"
        value="7 days"
        subtitle="Keep it going!"
        icon={Flame}
        iconColor="text-secondary"
      />
      <StatsCard 
        title="Days Remaining"
        value="38"
        subtitle="You're halfway there"
        icon={Target}
      />
      <StatsCard 
        title="Completion"
        value="52%"
        subtitle="23 of 45 days"
        icon={TrendingUp}
        iconColor="text-primary"
      />
    </div>
  );
}
