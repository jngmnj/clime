import { MapPin } from 'lucide-react';
import { Suspense, useEffect, useMemo } from 'react';
import { Link } from 'react-router';
import { toast } from 'sonner';

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import type { Coords } from '@/entities/weather/model/types';
import CurrentDateAndTime from '@/features/display-current-weather/ui/CurrentDateAndTime';
import CurrentWeather from '@/features/display-current-weather/ui/CurrentWeather';
import { CurrentWeatherSkeleton } from '@/features/display-current-weather/ui/CurrentWeatherSkeleton';
import { FavoriteList } from '@/features/favorite-location';
import { useCurrentPosition } from '@/shared/hooks/useCurrentPosition';
import { useRegionName } from '@/shared/hooks/useRegionName';
import { SEOUL_COORDS } from '@/shared/lib/constants';

const HomePage = () => {
  const { location, error, isLoading } = useCurrentPosition();
  const coords: Coords | null = useMemo(() => {
    return location
      ? { latitude: location.latitude, longitude: location.longitude }
      : null;
  }, [location]);

  useEffect(() => {
    if (!error) return;
    if (error.code === -1) {
      toast.error(error.message);
      return;
    }
    // 권한 거부/타임아웃 등 모든 케이스는 서울로 폴백
    toast.error('위치 정보를 가져올 수 없어 서울 기준으로 보여드립니다.');
  }, [error]);

  const lat = coords?.latitude ?? SEOUL_COORDS.lat;
  const lon = coords?.longitude ?? SEOUL_COORDS.lon;
  const { data: regionName, isPending: isRegionPending } = useRegionName(
    lat,
    lon,
  );
  const locationLabel = useMemo(() => {
    if (isLoading) return '위치 확인중...';
    if (!coords) return '서울(기본값)';
    if (isRegionPending || !regionName) return '현재 위치';
    return regionName;
  }, [coords, isLoading, isRegionPending, regionName]);

  return (
    <div className="relative">
      <div className="container mx-auto px-4 py-10">
        <div className="mx-auto max-w-2xl space-y-8">
          <Link to={`/detail?lat=${lat}&lon=${lon}`} className="block">
            <Card className="border-white/10 bg-white/10 transition-shadow hover:shadow-lg">
              <CardHeader>
                <CardTitle className="flex items-center justify-between text-white">
                  <span>현재 날씨</span>
                  <span className="flex items-center gap-1 text-sm font-normal text-white/80">
                    <MapPin className="h-4 w-4" />
                    {locationLabel}
                  </span>
                </CardTitle>
              </CardHeader>
              <CardContent className="pt-6 text-white">
                <Suspense fallback={<CurrentWeatherSkeleton />}>
                  <CurrentWeather coords={coords} />
                </Suspense>
              </CardContent>
            </Card>
          </Link>

          <FavoriteList />

          <CurrentDateAndTime />
        </div>
      </div>
    </div>
  );
};

export default HomePage;
