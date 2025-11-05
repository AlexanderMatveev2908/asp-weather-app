import {
  ApplicationConfig,
  provideBrowserGlobalErrorListeners,
  provideZonelessChangeDetection,
} from '@angular/core';
import { provideRouter } from '@angular/router';

import { routes } from './app.routes';
import { provideClientHydration, withEventReplay } from '@angular/platform-browser';
import { provideStoreDevtools } from '@ngrx/store-devtools';
import { provideStore } from '@ngrx/store';
import { rootReducer } from '@/core/store';
import { provideHttpClient, withFetch, withInterceptors } from '@angular/common/http';
import { useRootApiMdw } from '@/core/store/api/middleware/0.use_root_api';
import { useConfApiMdw } from '@/core/store/api/middleware/1.use_conf_api';

export const appConfig: ApplicationConfig = {
  providers: [
    provideBrowserGlobalErrorListeners(),
    provideZonelessChangeDetection(),
    provideRouter(routes),
    provideClientHydration(withEventReplay()),
    provideStore(rootReducer),
    provideHttpClient(withFetch(), withInterceptors([useRootApiMdw, useConfApiMdw])),
    provideStoreDevtools({ maxAge: 25 }),
  ],
};
