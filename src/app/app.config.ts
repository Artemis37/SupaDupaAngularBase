import { ApplicationConfig, provideBrowserGlobalErrorListeners, provideZoneChangeDetection, APP_INITIALIZER, ErrorHandler } from '@angular/core';
import { provideRouter } from '@angular/router';
import { provideHttpClient, withInterceptors, HttpClient } from '@angular/common/http';
import { provideAnimations } from '@angular/platform-browser/animations';
import { provideClientHydration, withEventReplay } from '@angular/platform-browser';
import { provideStore } from '@ngrx/store';
import { provideStoreDevtools } from '@ngrx/store-devtools';
import { TranslateModule, TranslateLoader, TranslateService } from '@ngx-translate/core';
import { TranslateHttpLoader } from '@ngx-translate/http-loader';
import { DateAdapter, MAT_DATE_LOCALE } from '@angular/material/core';
import { environment } from '../environments/environment';

import { routes } from './app.routes';
import { appReducer } from './store/app.reducer';
import { authHeaderInterceptor, requestHeaderInterceptor, personSyncIdInterceptor } from './shared/interceptors';
import { GlobalErrorHandlingService } from './shared/services/global-error-handling.service';
import { DynamicLocaleId, provideDynamicLocale } from './shared/services/dynamic.locale';
import { CustomDateAdapter } from './shared/utils/custom-date-adapter';
import { initializeTranslation } from './shared/services/translation-initializer';

// HttpLoaderFactory for ngx-translate
export function HttpLoaderFactory(http: HttpClient): TranslateHttpLoader {
  return new TranslateHttpLoader(http, './assets/i18n/', '.json');
}

export const appConfig: ApplicationConfig = {
  providers: [
    provideBrowserGlobalErrorListeners(),
    provideZoneChangeDetection({ eventCoalescing: true }),
    provideRouter(routes),
    provideClientHydration(withEventReplay()),
    provideHttpClient(
      withInterceptors([requestHeaderInterceptor, personSyncIdInterceptor, authHeaderInterceptor])
    ),
    provideAnimations(),
    provideStore({ app: appReducer }),
    provideStoreDevtools({
      maxAge: 25,
      logOnly: environment.production
    }),
    // Provide ngx-translate using TranslateModule.forRoot() providers
    // Temporarily disabled translation initialization to debug startup issues
    ...TranslateModule.forRoot({
      loader: {
        provide: TranslateLoader,
        useFactory: HttpLoaderFactory,
        deps: [HttpClient]
      },
      defaultLanguage: 'en'
    }).providers || [],
    {
      provide: APP_INITIALIZER,
      useFactory: initializeTranslation,
      deps: [TranslateService, DynamicLocaleId],
      multi: true
    },
    {
      provide: ErrorHandler,
      useClass: GlobalErrorHandlingService
    },
    provideDynamicLocale(),
    {
      provide: MAT_DATE_LOCALE,
      useFactory: (locale: DynamicLocaleId) => locale.getLocale(),
      deps: [DynamicLocaleId]
    },
    {
      provide: DateAdapter,
      useClass: CustomDateAdapter,
      deps: [DynamicLocaleId]
    }
  ]
};
