import { inject } from '@angular/core';
import {
  patchState,
  signalStore,
  withHooks,
  withMethods,
  withState,
} from '@ngrx/signals';
import { rxMethod } from '@ngrx/signals/rxjs-interop';
import { tap } from 'rxjs';
import { CharactersService } from '../../features/characters.service';

export interface Character {
  id: number;
  name: string;
  image: string;
}

export const CharactersStore = signalStore(
  { providedIn: 'root' },
  withState({
    characters: [] as Character[],
  }),
  withMethods((state) => {
    const characterService = inject(CharactersService);

    return {
      addCharacter(character: Pick<Character, 'name' | 'image'>) {
        const characterToAdd = {
          ...character,
          id: state.characters().length + 1,
        };
        patchState(state, {
          characters: [...state.characters(), characterToAdd],
        });
      },
      removeCharacter(id: number) {
        patchState(state, {
          characters: state.characters().filter((c) => c.id !== id),
        });
      },
      load() {
        rxMethod<Character[]>(() =>
          characterService.loadCharacters().pipe(
            tap((characters) => {
              patchState(state, {
                characters,
              });
            })
          )
        );
      },
    };
  }),
  withHooks({
    onInit({ load }) {
      load();
    },
  })
);
