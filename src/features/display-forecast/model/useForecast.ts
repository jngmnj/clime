import { useSuspenseQuery } from '@tanstack/react-query';

import { fetchForecast } from '@/entities/weather/api/forecast';
import { forecastQueryKey } from '@/entities/weather/model/query';

export const useForecast = (latitude: number, longitude: number) => {
  return useSuspenseQuery({
    queryKey: forecastQueryKey(latitude, longitude),
    queryFn: () => fetchForecast(latitude, longitude),
  });
};
