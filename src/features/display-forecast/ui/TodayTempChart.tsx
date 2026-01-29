import {
  CartesianGrid,
  Line,
  LineChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from 'recharts';

import type { ForecastListItem } from '@/entities/weather/model/types';

interface ChartPoint {
  time: string;
  temp: number;
  fullLabel: string;
}

interface TodayTempChartProps {
  todayItems: ForecastListItem[];
}

const TodayTempChart = ({ todayItems }: TodayTempChartProps) => {
  if (todayItems.length === 0) return null;

  const data: ChartPoint[] = todayItems.map((item) => {
    const timeStr = new Date(item.dt * 1000).toLocaleTimeString('ko-KR', {
      hour: 'numeric',
      minute: '2-digit',
    });
    return {
      time: timeStr,
      temp: Math.round(item.main.temp),
      fullLabel: timeStr,
    };
  });

  return (
    <div className="space-y-4">
      <h3 className="text-lg font-semibold">오늘 시간대별 기온</h3>
      <div className="h-[240px] w-full">
        <ResponsiveContainer width="100%" height="100%">
          <LineChart
            data={data}
            margin={{ top: 8, right: 8, left: 8, bottom: 8 }}
          >
            <CartesianGrid strokeDasharray="3 3" stroke="var(--border)" />
            <XAxis
              dataKey="time"
              tick={{ fontSize: 12 }}
              tickLine={false}
              axisLine={false}
            />
            <YAxis
              dataKey="temp"
              tick={{ fontSize: 12 }}
              tickLine={false}
              axisLine={false}
              tickFormatter={(v) => `${v}°`}
              domain={['dataMin - 1', 'dataMax + 1']}
            />
            <Tooltip
              contentStyle={{
                borderRadius: 'var(--radius-md)',
                border: '1px solid var(--border)',
              }}
              formatter={(value: number) => [`${value}°`, '기온']}
              labelFormatter={(_, payload) =>
                (payload?.[0]?.payload as ChartPoint)?.fullLabel ?? ''
              }
            />
            <Line
              type="monotone"
              dataKey="temp"
              stroke="var(--chart-2)"
              strokeWidth={2}
              dot={{ fill: 'var(--chart-2)', r: 4 }}
              activeDot={{ r: 6 }}
            />
          </LineChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};

export default TodayTempChart;
