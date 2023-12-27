import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';
import { MatCardModule } from '@angular/material/card';
import { MatToolbarModule } from '@angular/material/toolbar';
import { AppConfigService } from './core/app-config/app-config.service';
import { AsyncPipe } from '@angular/common';

@Component({
  standalone: true,
  imports: [RouterModule, MatCardModule, MatToolbarModule, AsyncPipe],
  selector: 'nx-jest-spectator-root',
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
})
export class AppComponent {
  title = 'nx-jest-spectator';

  // TODO Should be remove in the future.
  isConfigFetched = this.appConfig.isConfigFetched;

  constructor(private appConfig: AppConfigService) {}
}
