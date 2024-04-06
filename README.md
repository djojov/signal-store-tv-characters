## 📺 TV Characters

I created this project to test out new Angular Signals and experiment with NgRx Signal Store.

## 🛠️ Technologies and tools

- `Angular`
- `NgRx Signal Store`
- `Tailwind CSS`
- `json-server`

## 👷‍♂️ Application details

This project was created to test how the new Angular 17 SIgnals work with NrRx State management. Specifically, this app uses the currently experimental NgRx Signal Store for state management. This solution, helps us to leverage signals and easily create and manipulate their state. Below you can find store code for adding character:

```ts

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
    }
  }
)

```


## 💭 What I learned and possible improvements?

As the Signal store is still an experimental feature of NgRx it was inspiring to try and use it for state management. I learned to create a signal store and use available methods to create add and remove characters features while ensuring a clean and reusable pattern. This app is just an example for simple things that could be done with signals store and could be vastly improved with additional features like updating already added characters, implementing auth combined with signals, or adding folders for different genres.

## 🚦 Running the project

Firstly, make sure that `Angular CLI 17` and `Node.js` are installed, then follow the steps below to run this project:

1. Clone this repository to your machine
2. Run `npm install` to install all necessary dependencies
3. Run `ng serve` for a dev server
4. Run `npx json-server --watch characters-db.json` to create JSON server on http://localhost:3000/characters
5. Open your browser and navigate to [http://localhost:4200](http://localhost:4200) to view the app

#

<details> 
  <summary><h2>🎬 Video demo</h2></summary>
  

https://github.com/djojov/signal-store-tv-characters/assets/55921742/7a184f82-fb84-4a52-977c-6ca16834238c


</details>
