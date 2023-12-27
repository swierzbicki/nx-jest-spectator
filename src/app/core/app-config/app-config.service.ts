import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, catchError, map, of, tap } from 'rxjs';

export interface AppConfig {
  target: 'local' | 'staging' | 'prod';
  apiUrl: string;
}

@Injectable({ providedIn: 'root' })
export class AppConfigService {
  private configFetched = false;

  private appConfiguration: AppConfig = {
    target: 'local',
    apiUrl: '',
  };

  private readonly appConfigSubject = new BehaviorSubject<AppConfig>(
    this.appConfiguration
  );

  readonly appConfig$ = this.appConfigSubject.asObservable();

  private readonly APP_CONFIG_FILE = 'app-config.json';

  constructor(private http: HttpClient) {}

  get configFileName() {
    return this.APP_CONFIG_FILE;
  }

  get isConfigFetched() {
    return this.configFetched;
  }

  get config() {
    return this.appConfiguration;
  }

  loadApplicationConfig() {
    return this.http.get<AppConfig>(this.configFileName).pipe(
      tap((data) => {
        this.appConfiguration = data;
        this.configFetched = true;
      }),
      map((appConfig) => this.appConfigSubject.next(appConfig)),
      catchError((error) => of(error))
    );
  }
}
