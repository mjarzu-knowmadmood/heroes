import {
  ChangeDetectionStrategy,
  Component,
  EventEmitter,
  Input,
  Output,
} from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatIcon } from '@angular/material/icon';
import {
  MatListItem,
  MatListItemLine,
  MatListItemTitle,
} from '@angular/material/list';
import { Hero } from '../../../../shared/models/hero.model';
import { CapitalizePipe } from '../../../../shared/pipes/capitalize.pipe';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-hero-list-item',
  standalone: true,
  imports: [
    MatIcon,
    MatButtonModule,
    MatListItem,
    MatListItemTitle,
    MatListItemLine,
    CapitalizePipe,
    RouterModule,
  ],
  template: `
    <mat-list-item>
      <div class="flex justify-between items-center">
        <div>
          <div matListItemTitle>{{ hero.name | capitalize }}</div>
          <div matListItemLine></div>
        </div>
        <div class="flex gap-x-4">
          <button
            mat-icon-button
            aria-label="edit hero button"
            routerLink="update/{{ hero.id }}"
          >
            <mat-icon>edit</mat-icon>
          </button>
          <button
            mat-icon-button
            aria-label="delete hero button"
            (click)="delete.emit(hero.id)"
          >
            <mat-icon>delete</mat-icon>
          </button>
        </div>
      </div>
    </mat-list-item>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class HeroListItemComponent {
  @Input({ required: true }) hero!: Hero;
  @Output() delete: EventEmitter<string> = new EventEmitter<string>();
}
