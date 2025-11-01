import FloatingRobot from '../FloatingRobot';

export default function FloatingRobotExample() {
  return (
    <div className="h-screen bg-background relative">
      <FloatingRobot />
      <div className="flex items-center justify-center h-full">
        <p className="text-muted-foreground">Click the floating robot for motivation!</p>
      </div>
    </div>
  );
}
