import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';

/**
 * Root application component
 * Uses standalone components architecture
 */
@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet],
  template: `
    <router-outlet></router-outlet>
  `,
  styles: [`
    :host {
      display: block;
      min-height: 100vh;
    }
  `]
})
export class AppComponent {
  title = 'ISS Orange';
}
