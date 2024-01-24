import { Component } from '@angular/core';

@Component({
  standalone: true,
  selector: 'app-header',
  template: `
    <header class="h-12 p-5 bg-blue-900 text-white flex items-center">
      <h1>TV Show characters</h1>
    </header>
  `,
})
export class HeaderComponent {}
