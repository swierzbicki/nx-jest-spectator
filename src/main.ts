import { bootstrapApplication } from '@angular/platform-browser';
import { AppComponent } from './app/app.component';
import { devTools } from '@ngneat/elf-devtools';
import { appProviderConfig } from './app/app-provider-config';
import { environment } from './build-mode/build-mode';
import { enableElfProdMode } from '@ngneat/elf';

environment.target === 'local' ? devTools() : enableElfProdMode();

bootstrapApplication(AppComponent, appProviderConfig).catch((err) =>
  console.error(err)
);
