import { Card, CardHeader, CardContent } from "@/components/ui/card";
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Area, AreaChart } from "recharts";

interface DailyData {
  date: string;
  hardnessLevel: number;
  hadUrges: boolean;
}

interface HardnessChartProps {
  data: DailyData[];
}

const hardnessLabels = ["Easy", "Manageable", "Moderate", "Challenging", "Very Hard"];

export default function HardnessChart({ data }: HardnessChartProps) {
  const chartData = data.map((entry, index) => ({
    day: `Day ${index + 1}`,
    hardness: entry.hardnessLevel + 1,
    urges: entry.hadUrges ? entry.hardnessLevel + 1 : 0,
  }));

  return (
    <Card className="shadow-lg">
      <CardHeader>
        <h3 className="text-xl font-bold">Challenge Difficulty Tracker</h3>
        <p className="text-sm text-muted-foreground">Track how challenging each day has been</p>
      </CardHeader>
      <CardContent>
        <ResponsiveContainer width="100%" height={250}>
          <AreaChart data={chartData}>
            <defs>
              <linearGradient id="colorHardness" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="hsl(var(--primary))" stopOpacity={0.3}/>
                <stop offset="95%" stopColor="hsl(var(--primary))" stopOpacity={0}/>
              </linearGradient>
            </defs>
            <CartesianGrid strokeDasharray="3 3" opacity={0.3} />
            <XAxis 
              dataKey="day" 
              tick={{ fontSize: 12 }}
              interval={Math.floor(chartData.length / 7)}
            />
            <YAxis 
              domain={[0, 5]} 
              ticks={[1, 2, 3, 4, 5]}
              tick={{ fontSize: 12 }}
            />
            <Tooltip 
              content={({ active, payload }) => {
                if (active && payload && payload.length) {
                  const data = payload[0].payload;
                  return (
                    <div className="bg-background border border-border rounded-md p-3 shadow-lg">
                      <p className="font-semibold">{data.day}</p>
                      <p className="text-sm text-muted-foreground">
                        Difficulty: {hardnessLabels[data.hardness - 1]}
                      </p>
                      {data.urges > 0 && (
                        <p className="text-sm text-secondary">Had urges</p>
                      )}
                    </div>
                  );
                }
                return null;
              }}
            />
            <Area 
              type="monotone" 
              dataKey="hardness" 
              stroke="hsl(var(--primary))" 
              fill="url(#colorHardness)"
              strokeWidth={2}
            />
            {chartData.some(d => d.urges > 0) && (
              <Line 
                type="monotone" 
                dataKey="urges" 
                stroke="hsl(var(--secondary))" 
                strokeWidth={2}
                dot={{ fill: "hsl(var(--secondary))", r: 4 }}
                activeDot={{ r: 6 }}
              />
            )}
          </AreaChart>
        </ResponsiveContainer>
        
        <div className="flex flex-wrap gap-4 mt-4 text-sm">
          <div className="flex items-center gap-2">
            <div className="w-4 h-4 rounded bg-primary" />
            <span>Difficulty Level</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-4 h-4 rounded-full bg-secondary" />
            <span>Had Urges</span>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
