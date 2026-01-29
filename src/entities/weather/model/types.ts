export type Coords = { latitude: number; longitude: number };

export interface CurrentWeatherResponse {
  name: string;
  main: {
    temp: number;
    feels_like: number;
    temp_min: number;
    temp_max: number;
    pressure: number;
    humidity: number;
  };
  weather: Array<{
    id: number;
    main: string;
    description: string;
    icon: string;
  }>;
  wind: { speed: number; deg: number; gust?: number };
  visibility?: number;
  sys: { sunrise: number; sunset: number };
  rain?: { '1h'?: number; '3h'?: number };
  snow?: { '1h'?: number; '3h'?: number };
}

export interface ForecastListItem {
  dt: number;
  main: {
    temp: number;
    feels_like: number;
    temp_min: number;
    temp_max: number;
    pressure: number;
    humidity: number;
  };
  weather: Array<{
    id: number;
    main: string;
    description: string;
    icon: string;
  }>;
  wind: { speed: number; deg: number };
  pop: number;
  visibility?: number;
  dt_txt: string;
  rain?: { '3h': number };
  snow?: { '3h': number };
}

export interface ForecastResponse {
  cod: string;
  list: ForecastListItem[];
  city: {
    id: number;
    name: string;
    coord: { lat: number; lon: number };
    country: string;
    timezone: number;
  };
}
