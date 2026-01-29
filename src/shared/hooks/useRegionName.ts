import { useQuery } from '@tanstack/react-query';

import { fetchRegionByCoords } from '@/entities/weather/api/kakaoCoord2Region';
import { regionNameQueryKey } from '@/entities/weather/model/query';

/**
 * 좌표로 Kakao coord2regioncode API 호출해 행정구역명 반환
 * - 캐시되어 동일 좌표 재요청 시 API 재호출 안 함
 */
export function useRegionName(lat: number, lon: number) {
  const enabled = Number.isFinite(lat) && Number.isFinite(lon);

  return useQuery({
    queryKey: regionNameQueryKey(lat, lon),
    queryFn: () => fetchRegionByCoords(lat, lon),
    enabled,
    staleTime: 1000 * 60 * 60, // 1시간
  });
}
