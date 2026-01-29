import { useMemo } from 'react';
import { useSearchParams } from 'react-router';

import type { ForecastListItem } from '@/entities/weather/model/types';
import { useDetailPageData } from '@/features/display-current-weather/model/useDetailPageData';
import CurrentWeatherDetail from '@/features/display-current-weather/ui/CurrentWeatherDetail';
import CurrentWeatherHero from '@/features/display-current-weather/ui/CurrentWeatherHero';
import NextDaysForecast from '@/features/display-forecast/ui/NextDaysForecast';
import TodayTempChart from '@/features/display-forecast/ui/TodayTempChart';
import { FavoriteActionButton } from '@/features/favorite-location';
import { SEOUL_COORDS } from '@/shared/lib/constants';

const getTodayAndTomorrowItems = (
  list: ForecastListItem[],
): ForecastListItem[] => {
  const now = new Date();
  const today = now.toDateString();
  const tomorrow = new Date(now);
  tomorrow.setDate(tomorrow.getDate() + 1);

  return list.filter(
    (item) =>
      new Date(item.dt * 1000).toDateString() === today ||
      new Date(item.dt * 1000).toDateString() === tomorrow.toDateString(),
  );
};

const DetailContent = () => {
  const [searchParams] = useSearchParams();
  const lat = Number(searchParams.get('lat')) || SEOUL_COORDS.lat;
  const lon = Number(searchParams.get('lon')) || SEOUL_COORDS.lon;

  const { location, weather, forecast } = useDetailPageData(lat, lon);

  const todayItems = useMemo(
    () => getTodayAndTomorrowItems(forecast.list),
    [forecast.list],
  );
  const locationLabel = location.regionName ?? weather.name ?? '날씨';

  return (
    <div className="space-y-10">
      <section>
        <div className="mb-6 flex flex-wrap items-center justify-between gap-2">
          <h1 className="text-2xl font-bold text-white">
            {locationLabel}의 날씨
          </h1>
          <FavoriteActionButton
            lat={lat}
            lon={lon}
            regionName={location.regionName}
            className="shrink-0"
          />
        </div>
        <CurrentWeatherHero location={location} weather={weather} />
      </section>

      <section>
        <h2 className="mb-4 text-xl font-semibold text-white">상세 날씨</h2>
        <CurrentWeatherDetail data={weather} />
      </section>

      <section className="bg-card border-card-border rounded-xl border p-6">
        <TodayTempChart todayItems={todayItems} />
      </section>

      <section>
        <NextDaysForecast list={forecast.list} />
      </section>
    </div>
  );
};

export default DetailContent;
