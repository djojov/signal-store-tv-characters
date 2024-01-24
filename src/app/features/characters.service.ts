import { HttpClient } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { Character } from '../core/state/characters.store';

const BE_URL = 'http://localhost:3000';

@Injectable({
  providedIn: 'root',
})
export class CharactersService {
  private http = inject(HttpClient);

  loadCharacters() {
    return this.http.get<Array<Character>>(`${BE_URL}/characters`);
  }

  addCharacter(character: Character) {
    return this.http.put<Character>(`${BE_URL}/characters`, character);
  }
}
