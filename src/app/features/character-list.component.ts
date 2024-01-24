import { Component, inject } from '@angular/core';
import { CharactersStore } from '../core/state/characters.store';

@Component({
  standalone: true,
  selector: 'app-character-list',
  template: `
    <div class="grid grid-cols-3 gap-5">
      @for (character of characters(); track character) {
      <div class="rounded-xl shadow-2xl">
        <img
          class="rounded-tl-xl rounded-tr-xl border-2 border-white w-full max-h-72 object-cover"
          [src]="character.image"
          alt="character image"
        />
        <div class="text-3xl p-5 flex flex-row justify-between items-center">
          {{ character.name }}
          <span
            (click)="removeItem(character.id)"
            class="material-symbols-outlined cursor-pointer"
          >
            delete
          </span>
        </div>
      </div>
      }
    </div>
  `,
})
export class CharacterListComponent {
  private characterStore = inject(CharactersStore);
  characters = this.characterStore.characters;

  removeItem(id: number) {
    this.characterStore.removeCharacter(id);
  }
}
