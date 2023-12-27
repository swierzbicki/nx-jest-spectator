import { APP_INITIALIZER, ApplicationConfig, Provider } from '@angular/core';
import { provideRouter } from '@angular/router';
import { appRoutes } from './app.routes';
import { provideAnimations } from '@angular/platform-browser/animations';
import { AppConfigService } from './core/app-config/app-config.service';
import { provideHttpClient } from '@angular/common/http';

const appInitializer = (appConfigService: AppConfigService) => () =>
  appConfigService.loadApplicationConfig();

const appConfigProviders: Provider[] = [
  AppConfigService,
  {
    provide: APP_INITIALIZER,
    useFactory: appInitializer,
    multi: true,
    deps: [AppConfigService],
  },
];

export const appProviderConfig: ApplicationConfig = {
  providers: [
    provideRouter(appRoutes),
    provideAnimations(),
    provideHttpClient(),
    ...appConfigProviders,
  ],
};
