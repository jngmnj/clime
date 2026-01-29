import type { ForecastListItem } from '@/entities/weather/model/types';
import { formatDegree } from '@/shared/lib/formatDegree';

const OWM_ICON_URL = 'https://openweathermap.org/img/wn';

const formatDayLabel = (dt: number) =>
  new Date(dt * 1000).toLocaleDateString('ko-KR', {
    month: 'short',
    day: 'numeric',
    weekday: 'short',
  });

interface DayForecast {
  dateKey: string;
  items: ForecastListItem[];
  minTemp: number;
  maxTemp: number;
  morningItem: ForecastListItem;
  afternoonItem: ForecastListItem;
}

function buildDayForecasts(
  list: ForecastListItem[],
  skipFirstDay = true,
): DayForecast[] {
  const byDate: Record<string, ForecastListItem[]> = {};
  for (const item of list) {
    const date = new Date(item.dt * 1000).toDateString();
    if (!byDate[date]) byDate[date] = [];
    byDate[date].push(item);
  }
  const entries = Object.entries(byDate);
  const daysToShow = skipFirstDay ? entries.slice(1, 5) : entries.slice(0, 4);

  return daysToShow.map(([dateKey, items]) => {
    const temps = items.map((i) => i.main.temp);
    const minTemp = Math.min(...temps);
    const maxTemp = Math.max(...temps);
    const morningItem =
      items.find((i) => {
        const h = new Date(i.dt * 1000).getHours();
        return h >= 6 && h < 12;
      }) ?? items[0];
    const afternoonItem =
      items.find((i) => {
        const h = new Date(i.dt * 1000).getHours();
        return h >= 12 && h < 18;
      }) ??
      items[Math.min(2, items.length - 1)] ??
      items[0];

    return {
      dateKey,
      items,
      minTemp,
      maxTemp,
      morningItem,
      afternoonItem,
    };
  });
}

interface NextDaysForecastProps {
  list: ForecastListItem[];
}

const NextDaysForecast = ({ list }: NextDaysForecastProps) => {
  const days = buildDayForecasts(list);

  if (days.length === 0) return null;

  return (
    <div className="space-y-4">
      <h3 className="text-xl font-semibold text-white">주간 예보</h3>
      <div className="flex flex-col gap-4 md:flex-row md:justify-between">
        {days.map((day) => (
          <div
            key={day.dateKey}
            className="bg-card border-card-border flex-1 rounded-xl border p-4 shadow-sm"
          >
            <p className="text-muted-foreground mb-3 text-center font-medium">
              {formatDayLabel(day.items[0].dt)}
            </p>
            <div className="flex flex-row justify-center gap-3 md:flex-col">
              <div className="flex items-center justify-between text-sm">
                <span className="text-muted-foreground">오전</span>
                <div className="flex items-center gap-2">
                  <img
                    src={`${OWM_ICON_URL}/${day.morningItem.weather[0].icon}@2x.png`}
                    alt=""
                    className="h-8 w-8"
                  />
                </div>
              </div>
              <div className="flex items-center justify-between text-sm">
                <span className="text-muted-foreground">오후</span>
                <div className="flex items-center gap-2">
                  <img
                    src={`${OWM_ICON_URL}/${day.afternoonItem.weather[0].icon}@2x.png`}
                    alt=""
                    className="h-8 w-8"
                  />
                </div>
              </div>
              <div className="flex items-center justify-center gap-2 pt-2 text-sm md:border-t">
                <span className="text-blue-500">
                  최저 {formatDegree(day.minTemp)}°
                </span>
                /
                <span className="text-red-500">
                  최고 {formatDegree(day.maxTemp)}°
                </span>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default NextDaysForecast;
