import { Component, inject } from '@angular/core';
import {
  FormBuilder,
  FormsModule,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';

@Component({
  standalone: true,
  selector: 'app-character-editor',
  imports: [FormsModule, ReactiveFormsModule],
  template: `
    <div class="shadow-2xl rounded-2xl p-5">
      <form
        [formGroup]="characterForm"
        #characterFormRef="ngForm"
        (ngSubmit)="handleSubmit()"
      >
        <div class="flex flex-col">
          <label>Character name</label>
          <input
            formControlName="characterName"
            class="h-12 w-full border-2 rounded-md pl-2"
          />
        </div>
        <div class="flex flex-col mt-3">
          <label>Character image</label>
          <input
            formControlName="characterImage"
            class="h-12 w-full border-2 rounded-md pl-2"
          />
        </div>

        @if ( this.characterForm.invalid && characterFormRef.submitted) {
        <div class="bg-red-200 border-1 border-red-400 p-5 rounded-md mt-5">
          <p class="text-red-800">Character name and image are required.</p>
        </div>
        }

        <button
          type="submit"
          class="bg-blue-700 hover:bg-blue-900 text-white p-3 mt-8 rounded-md"
        >
          Add character
        </button>
      </form>
    </div>
  `,
})
export class CharacterEditorComponent {
  private fb: FormBuilder = inject(FormBuilder);

  characterForm = this.fb.nonNullable.group({
    characterName: ['', [Validators.required]],
    characterImage: ['', [Validators.required]],
  });

  handleSubmit() {
    if (this.characterForm.invalid) {
      return;
    }
  }
}
