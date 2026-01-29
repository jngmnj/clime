// useQuery 훅
import { useSuspenseQuery } from '@tanstack/react-query';

import { fetchCurrentWeather } from '@/entities/weather/api/currentWeather';
import { weatherQueryKey } from '@/entities/weather/model/query';

export const useCurrentWeather = (latitude: number, longitude: number) => {
  return useSuspenseQuery({
    queryKey: weatherQueryKey(latitude, longitude),
    queryFn: () => fetchCurrentWeather(latitude, longitude),
  });
};
