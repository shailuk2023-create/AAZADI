import HardnessChart from '../HardnessChart';

export default function HardnessChartExample() {
  const sampleData = Array.from({ length: 14 }, (_, i) => ({
    date: new Date(Date.now() - (13 - i) * 24 * 60 * 60 * 1000).toISOString().split('T')[0],
    hardnessLevel: Math.floor(Math.random() * 5),
    hadUrges: Math.random() > 0.6,
  }));

  return (
    <div className="p-4">
      <HardnessChart data={sampleData} />
    </div>
  );
}
