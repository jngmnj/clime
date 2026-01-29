import { MapPin } from 'lucide-react';

import type { CurrentWeatherResponse } from '@/entities/weather/model/types';
import type { DetailLocation } from '@/features/display-current-weather/model/detailPageData';
import { formatDegree } from '@/shared/lib/formatDegree';

const OWM_ICON_URL = 'https://openweathermap.org/img/wn';

interface CurrentWeatherHeroProps {
  location: DetailLocation;
  weather: CurrentWeatherResponse;
}

const CurrentWeatherHero = ({ location, weather }: CurrentWeatherHeroProps) => {
  const locationLabel = location.regionName ?? weather.name ?? '—';

  return (
    <div className="relative overflow-hidden rounded-2xl bg-linear-to-br from-sky-500/90 via-blue-600/90 to-indigo-700/90 p-6 text-white shadow-xl dark:from-sky-600/90 dark:via-blue-700/90 dark:to-indigo-800/90">
      <div className="relative space-y-4">
        <div className="flex items-center gap-2 text-white/90">
          <MapPin className="h-5 w-5" />
          <span className="text-lg font-medium">{locationLabel}</span>
        </div>

        <div className="flex items-end justify-between gap-4">
          <div>
            <p className="text-6xl font-bold tracking-tight tabular-nums">
              {formatDegree(weather.main.temp ?? 0)}°
            </p>
            <p className="mt-1 text-xl text-white/95 capitalize">
              {weather.weather[0].description}
            </p>
            <p className="mt-2 flex items-center gap-3 text-sm text-white/80">
              <span>체감 {formatDegree(weather.main.feels_like ?? 0)}°</span>
              <span>최고 {formatDegree(weather.main.temp_max ?? 0)}°</span>
              <span>최저 {formatDegree(weather.main.temp_min ?? 0)}°</span>
            </p>
          </div>
          <img
            src={`${OWM_ICON_URL}/${weather.weather[0].icon}@4x.png`}
            alt={weather.weather[0].description}
            className="h-28 w-28 drop-shadow-lg"
          />
        </div>
      </div>
    </div>
  );
};

export default CurrentWeatherHero;
