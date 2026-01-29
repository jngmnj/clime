import { useCurrentWeather } from '../model/useCurrentWeather';

import type { Coords } from '@/entities/weather/model/types';
import { SEOUL_COORDS } from '@/shared/lib/constants';
import { formatDegree } from '@/shared/lib/formatDegree';

const CurrentWeather = ({ coords }: { coords: Coords | null }) => {
  const lat = coords?.latitude ?? SEOUL_COORDS.lat;
  const lon = coords?.longitude ?? SEOUL_COORDS.lon;
  const { data: weatherData } = useCurrentWeather(lat, lon);

  return (
    <div>
      <div className="mb-4 text-center">
        <p className="mb-3 text-6xl font-bold">
          {formatDegree(weatherData?.main.temp)}°
        </p>
        <p className="text-2xl">{weatherData?.weather[0].description}</p>
      </div>
      <p className="mb-1 text-center text-lg text-white/80">
        체감 온도: {formatDegree(weatherData?.main.feels_like)}°
      </p>
      <div className="flex justify-center gap-4">
        <p className="text-sm">
          최고 온도: {formatDegree(weatherData?.main.temp_max)}°
        </p>
        <p className="text-sm">
          최저 온도: {formatDegree(weatherData?.main.temp_min)}°
        </p>
      </div>
    </div>
  );
};

export default CurrentWeather;
