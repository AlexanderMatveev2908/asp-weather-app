import { MetaWeatherT } from './lib/meta';

export type GeoStrategyT = 'firefox' | 'spring';

export interface GeoResT {
  country_code: string;
  region: string;
  lon: number;
  lat: number;
  strategy: GeoStrategyT;
}

export type MainWeatherT =
  | 'Thunderstorm'
  | 'Drizzle'
  | 'Rain'
  | 'Snow'
  | 'Mist'
  | 'Smoke'
  | 'Haze'
  | 'Dust'
  | 'Fog'
  | 'Sand'
  | 'Ash'
  | 'Squall'
  | 'Tornado'
  | 'Clear'
  | 'Clouds'
  | 'Error';

export interface UserFriendlyWeatherT {
  main: MainWeatherT;
  description: string;
  icon: string;
}

interface CommonWeatherT {
  dt: number;
  sunrise: number;
  sunset: number;
  pressure: number;
  humidity: number;
  clouds: number;
  visibility: number;
  wind_speed: number;
  weather: UserFriendlyWeatherT[];
}

export interface CurrWeatherT extends CommonWeatherT {
  temp: number;
  // ? kelvin temp perception of body
  feels_like: number;
  // ? hectopascals atmospheric pressure
}

interface CommonTempDailyWeatherT {
  day: number;
  night: number;
  eve: number;
  morn: number;
}

export interface DailyWeatherT extends CommonWeatherT {
  temp: {
    min: number;
    max: number;
  } & CommonTempDailyWeatherT;
  feels_like: CommonTempDailyWeatherT;
}

export interface WeatherResT {
  lat: number;
  lon: number;
  timezone: string;
  // ? seconds to add to UTC to gra curr zone time
  timezone_offset: number;
  current: CurrWeatherT;
  // ? 8 days forecast
  daily: [
    DailyWeatherT,
    DailyWeatherT,
    DailyWeatherT,
    DailyWeatherT,
    DailyWeatherT,
    DailyWeatherT,
    DailyWeatherT,
    DailyWeatherT
  ];
}

export interface BasePayloadWeatherT {
  main: MainWeatherT;
  meta: MetaWeatherT;
  temp: string;
  feelsLike: string;
}
