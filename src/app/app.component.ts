import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { ToolbarComponent } from './shared/components/toolbar/toolbar.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, ToolbarComponent],
  template: ` <app-toolbar />
    <div class="flex justify-center mx-4 my-8">
      <div class="max-w-screen-md w-full">
        <router-outlet />
      </div>
    </div>`,
})
export class AppComponent {}
