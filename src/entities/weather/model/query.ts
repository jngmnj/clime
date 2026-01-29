// entities/weather/model/query.ts

import { QUERY_KEYS } from '@/shared/lib/constants';

export const weatherQueryKey = (lat: number, lon: number) =>
  [QUERY_KEYS.weather, lat, lon] as const;

export const forecastQueryKey = (lat: number, lon: number) =>
  [QUERY_KEYS.forecast, lat, lon] as const;
