import { Component } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatTooltipModule } from '@angular/material/tooltip';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [MatButtonModule, MatTooltipModule, MatIconModule],
  template: `
    <div class="flex justify-center p-4">
      <div>
        <img
          class="max-w-36"
          src="assets/angular-logo.svg"
          alt="Angular Logo"
        />

        <span class="text-5xl font-medium tracking-tight"
          >Hello, {{ title }}</span
        >
      </div>
    </div>
  `,
})
export class DashboardComponent {
  title = 'super-heroes';
}
