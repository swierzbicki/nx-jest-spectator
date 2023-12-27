import { createStore, select, withProps } from '@ngneat/elf';
import { Injectable } from '@angular/core';
import { localStorageStrategy, persistState } from '@ngneat/elf-persist-state';
import { tap } from 'rxjs';

export interface AuthProps {
  user: { email: string } | null;
}

const authStore = createStore(
  { name: 'auth' },
  withProps<AuthProps>({ user: null })
);

persistState(authStore, {
  key: 'auth',
  storage: localStorageStrategy,
});

// TODO Consider different design pattern for state management. Although it's a recommended pattern accroding to the
// Elf docs etc.
// TODO Different name would be better i guess, we will see
@Injectable({ providedIn: 'root' })
export class AuthRepository {
  user$ = authStore.pipe(
    select<AuthProps, { email: string } | null>((state) => state.user)
  );

  updateUser({ user }: AuthProps) {
    authStore.update((state: AuthProps) => ({
      ...state,
      user,
    }));
  }
}
