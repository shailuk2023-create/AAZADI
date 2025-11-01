import ProgressBar from '../ProgressBar';

export default function ProgressBarExample() {
  return (
    <div className="p-4 space-y-8 max-w-md">
      <ProgressBar value={45} max={90} />
      <ProgressBar value={21} max={21} />
      <ProgressBar value={7} max={180} showLabel={false} />
    </div>
  );
}
