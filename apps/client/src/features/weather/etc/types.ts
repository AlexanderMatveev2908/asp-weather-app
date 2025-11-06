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

export interface CurrWeatherT {
  // ? following 3 unix timestamps ->
  dt: number;
  // ? when sun rise
  sunrise: number;
  // ? when sun disappear
  sunset: number;
  // ? kelvin temp ( -273.15 to grab Celsius)
  temp: number;
  // ? kelvin temp perception of body
  feels_like: number;
  // ? hectopascals atmospheric pressure
  pressure: number;
  // ? % humidity
  humidity: number;
  // ? % clouds in sky
  clouds: number;
  // ? visibility in meters
  visibility: number;
  // ? meters for sec of wind speed
  wind_speed: number;

  weather: UserFriendlyWeatherT[];
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
    CurrWeatherT,
    CurrWeatherT,
    CurrWeatherT,
    CurrWeatherT,
    CurrWeatherT,
    CurrWeatherT,
    CurrWeatherT,
    CurrWeatherT
  ];
}
