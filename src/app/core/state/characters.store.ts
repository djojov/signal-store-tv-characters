import { Injector, inject, runInInjectionContext } from '@angular/core';
import {
  patchState,
  signalStore,
  withHooks,
  withMethods,
  withState,
} from '@ngrx/signals';
import { rxMethod } from '@ngrx/signals/rxjs-interop';
import { tap } from 'rxjs';
import { v4 as uuidv4 } from 'uuid';
import { CharactersService } from '../../features/characters.service';

export interface Character {
  id: string;
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

    const injector = inject(Injector);

    return {
      addCharacter(character: Pick<Character, 'name' | 'image'>) {
        const characterToAdd = {
          ...character,
          id: uuidv4(),
        };

        runInInjectionContext(injector, () => {
          rxMethod<Character[]>(() =>
            characterService.addCharacter(characterToAdd).pipe(
              tap(() =>
                patchState(state, {
                  characters: [...state.characters(), characterToAdd],
                })
              )
            )
          );
        });
      },
      removeCharacter(id: string) {
        runInInjectionContext(injector, () => {
          rxMethod<Character[]>(() =>
            characterService.deleteCharacter(id).pipe(
              tap(() => {
                patchState(state, {
                  characters: state.characters().filter((c) => c.id !== id),
                });
              })
            )
          );
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
