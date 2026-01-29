import { useSearchParams } from 'react-router';

import type { ForecastListItem } from '@/entities/weather/model/types';
import { useCurrentWeather } from '@/features/display-current-weather/model/useCurrentWeather';
import CurrentWeatherDetail from '@/features/display-current-weather/ui/CurrentWeatherDetail';
import CurrentWeatherHero from '@/features/display-current-weather/ui/CurrentWeatherHero';
import { useForecast } from '@/features/display-forecast/model/useForecast';
import NextDaysForecast from '@/features/display-forecast/ui/NextDaysForecast';
import TodayTempChart from '@/features/display-forecast/ui/TodayTempChart';
import { SEOUL_COORDS } from '@/shared/lib/constants';

const getTodayItems = (list: ForecastListItem[]): ForecastListItem[] => {
  const today = new Date().toDateString();
  return list.filter(
    (item) => new Date(item.dt * 1000).toDateString() === today,
  );
};

const DetailContent = () => {
  const [searchParams] = useSearchParams();
  const lat = Number(searchParams.get('lat')) || SEOUL_COORDS.lat;
  const lon = Number(searchParams.get('lon')) || SEOUL_COORDS.lon;

  const { data: weatherData } = useCurrentWeather(lat, lon);
  const { data: forecastData } = useForecast(lat, lon);

  const todayItems = getTodayItems(forecastData.list);

  return (
    <div className="space-y-10">
      <section>
        <h1 className="mb-6 text-2xl font-bold text-white">
          {weatherData.name}의 날씨
        </h1>
        <CurrentWeatherHero lat={lat} lon={lon} data={weatherData} />
      </section>

      <section>
        <h2 className="mb-4 text-xl font-semibold text-white">상세 날씨</h2>
        <CurrentWeatherDetail data={weatherData} />
      </section>

      <section className="bg-card rounded-xl border p-6">
        <TodayTempChart todayItems={todayItems} />
      </section>

      <section>
        <NextDaysForecast list={forecastData.list} />
      </section>
    </div>
  );
};

export default DetailContent;
