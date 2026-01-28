// entities/weather/model/query.ts

import { QUERY_KEYS } from '@/shared/lib/constants';

// 쿼리 키 정의
export const weatherQueryKey = (lat: number, lon: number) =>
  [QUERY_KEYS.weather, lat, lon] as const;
