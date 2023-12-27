import { AppComponent } from './app.component';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { createComponentFactory, Spectator } from '@ngneat/spectator/jest';

describe('AppComponent', () => {
  let spectator: Spectator<AppComponent>;
  const createComponent = createComponentFactory({
    component: AppComponent,
    imports: [HttpClientTestingModule],
    shallow: true,
  });

  it('should have correct title', () => {
    spectator = createComponent();

    expect(spectator.component.title).toEqual('nx-jest-spectator');
  });

  it('should have correct welcome message', () => {
    spectator = createComponent();

    expect(spectator.query('h1')?.textContent).toContain(
      'Welcome nx-jest-spectator'
    );
  });
});
