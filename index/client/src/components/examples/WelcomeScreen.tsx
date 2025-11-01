import WelcomeScreen from '../WelcomeScreen';

export default function WelcomeScreenExample() {
  return (
    <WelcomeScreen 
      onStartChallenge={(name, addiction, duration) => 
        console.log('Challenge started:', { name, addiction, duration })
      } 
    />
  );
}
