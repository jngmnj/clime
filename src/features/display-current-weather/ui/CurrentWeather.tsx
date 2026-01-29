import { MapPin } from 'lucide-react';

import { useCurrentWeather } from '../model/useCurrentWeather';

import type { Coords } from '@/entities/weather/model/types';
import { SEOUL_COORDS } from '@/shared/lib/constants';
import { formatDegree } from '@/shared/lib/formatDegree';

const CurrentWeather = ({ coords }: { coords: Coords | null }) => {
  const { data } = useCurrentWeather(
    coords?.latitude ?? SEOUL_COORDS.lat,
    coords?.longitude ?? SEOUL_COORDS.lon,
  );

  return (
    <div>
      <div className="mb-4 flex items-center justify-center gap-2 text-white/80">
        <MapPin className="h-5 w-5" />
        <p>{data?.name}</p>
      </div>

      <div className="mb-4 text-center">
        <p className="mb-3 text-6xl font-bold">
          {formatDegree(data?.main.temp)}°
        </p>
        <p className="text-2xl">{data?.weather[0].description}</p>
      </div>
      <p className="mb-1 text-center text-lg text-white/80">
        체감 온도: {formatDegree(data?.main.feels_like)}°
      </p>
      <div className="flex justify-center gap-4">
        <p className="text-sm">
          최고 온도: {formatDegree(data?.main.temp_max)}°
        </p>
        <p className="text-sm">
          최저 온도: {formatDegree(data?.main.temp_min)}°
        </p>
      </div>
    </div>
  );
};

export default CurrentWeather;
