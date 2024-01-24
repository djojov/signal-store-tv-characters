import { patchState, signalStore, withMethods, withState } from '@ngrx/signals';

let idCount = 0;

export interface Character {
  id: number;
  name: string;
  image: string;
}

export const CharactersStore = signalStore(
  { providedIn: 'root' },
  withState({
    characters: [
      {
        id: idCount++,
        name: 'Jack Reacher',
        image:
          'https://resizing.flixster.com/-XZAfHZM39UwaGJIFWKAE8fS0ak=/v3/t/assets/p21166923_i_v13_aa.jpg',
      },
    ] as Character[],
  }),
  withMethods((state) => ({
    addCharacter(character: Pick<Character, 'name' | 'image'>) {
      const characterToAdd = {
        ...character,
        id: idCount++,
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
  }))
);
