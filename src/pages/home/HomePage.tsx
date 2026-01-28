import { Suspense, useEffect, useState } from 'react';
import { toast } from 'sonner';

import type { Coords } from '@/entities/weather/model/type';
import CurrentDateAndTime from '@/features/display-current-weather/ui/CurrentDateAndTime';
import CurrentWeather from '@/features/display-current-weather/ui/CurrentWeather';
import { CurrentWeatherSkeleton } from '@/features/display-current-weather/ui/CurrentWeatherSkeleton';
import { SEOUL_COORDS } from '@/shared/lib/constants';

const HomePage = () => {
  const [coords, setCoords] = useState<Coords | null>(null);

  useEffect(() => {
    if (typeof navigator === 'undefined' || !navigator.geolocation) {
      queueMicrotask(() => {
        toast.error('브라우저에서 위치 정보를 지원하지 않습니다.');
        setCoords({
          latitude: SEOUL_COORDS.lat,
          longitude: SEOUL_COORDS.lon,
        });
      });
      return;
    }

    navigator.geolocation.getCurrentPosition(
      (position) => {
        setCoords({
          latitude: position.coords.latitude,
          longitude: position.coords.longitude,
        });
      },
      (error) => {
        console.error(error);
        toast.error('위치 정보를 가져올 수 없어 서울 기준으로 보여드립니다.');
        setCoords({
          latitude: SEOUL_COORDS.lat,
          longitude: SEOUL_COORDS.lon,
        });
      },
      {
        enableHighAccuracy: false,
        timeout: 5000,
        maximumAge: 1000 * 60 * 5,
      },
    );
  }, []);

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="mx-auto max-w-2xl space-y-8">
        <Suspense fallback={<CurrentWeatherSkeleton />}>
          <CurrentWeather coords={coords} />
        </Suspense>

        <CurrentDateAndTime />
      </div>
    </div>
  );
};

export default HomePage;
