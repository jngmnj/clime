import { MapPin } from 'lucide-react';

import { useCurrentWeather } from '../model/useCurrentWeather';

import type { Coords } from '@/entities/weather/model/type';
import { SEOUL_COORDS } from '@/shared/lib/constants';
import { formatDegree } from '@/shared/lib/formatDegree';

const CurrentWeather = ({ coords }: { coords: Coords | null }) => {
  const { data } = useCurrentWeather(
    coords?.latitude ?? SEOUL_COORDS.lat,
    coords?.longitude ?? SEOUL_COORDS.lon,
  );

  return (
    <div>
      <div className="text-muted-foreground mb-4 flex items-center justify-center gap-2">
        <MapPin className="h-5 w-5" />
        <p>{data?.name}</p>
      </div>

      <div className="mb-4 text-center">
        <p className="mb-3 text-6xl font-bold">
          {formatDegree(data?.main.temp)}°
        </p>
        <p className="text-2xl">{data?.weather[0].main}</p>
      </div>
      <p className="text-muted-foreground mb-1 text-center text-sm">
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
