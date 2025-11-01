import CelebrationScreen from '../CelebrationScreen';

export default function CelebrationScreenExample() {
  return (
    <CelebrationScreen 
      challengeName="Daily Exercise"
      daysCompleted={90}
      onStartNew={() => console.log('Start new challenge')}
      onExtend={() => console.log('Extend challenge')}
    />
  );
}
