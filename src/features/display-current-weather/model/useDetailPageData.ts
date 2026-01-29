import { useMemo } from 'react';

import { useForecast } from '@/features/display-forecast/model/useForecast';
import { useRegionName } from '@/shared/hooks/useRegionName';
import type { DetailPageData } from './detailPageData';
import { useCurrentWeather } from './useCurrentWeather';

/**
 * 상세 페이지에 필요한 데이터를 한 번에 모아서 반환.
 * - location: 좌표 + Kakao 행정구역명 (regionName 은 비동기라 나중에 채워질 수 있음)
 * - weather: 현재 날씨 (OpenWeatherMap)
 * - forecast: 5일 예보 (OpenWeatherMap)
 *
 * useCurrentWeather, useForecast 는 Suspense 를 쓰므로 이 훅을 쓰는 컴포넌트는
 * 상위에서 Suspense 로 감싸야 한다. regionName 은 비동기라 없으면 null 로 두고
 * 나중에 채워진다.
 */
export function useDetailPageData(lat: number, lon: number): DetailPageData {
  const { data: weather } = useCurrentWeather(lat, lon);
  const { data: forecast } = useForecast(lat, lon);
  const { data: regionName } = useRegionName(lat, lon);

  return useMemo<DetailPageData>(
    () => ({
      location: {
        lat,
        lon,
        regionName: regionName ?? null,
      },
      weather,
      forecast,
    }),
    [lat, lon, regionName, weather, forecast],
  );
}
