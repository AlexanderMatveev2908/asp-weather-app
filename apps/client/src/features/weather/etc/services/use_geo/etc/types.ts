import { GeoUserT } from '@/features/weather/reducer/reducer';

export type GeoStrategyT = 'chrome' | 'firefox';

export interface GeoResT extends GeoUserT {
  strategy: GeoStrategyT;
}
