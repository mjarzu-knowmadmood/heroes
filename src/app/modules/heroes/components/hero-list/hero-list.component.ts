import { NgFor } from '@angular/common';
import {
  ChangeDetectionStrategy,
  Component,
  EventEmitter,
  Input,
  Output,
} from '@angular/core';
import { MatList } from '@angular/material/list';
import { Hero } from '../../../../shared/models/hero.model';
import { HeroListItemComponent } from '../hero-list-item/hero-list-item.component';

@Component({
  selector: 'app-hero-list',
  standalone: true,
  imports: [MatList, NgFor, HeroListItemComponent],
  template: `
    <mat-list>
      @for (hero of heroes; track hero) {
      <app-hero-list-item
        [hero]="hero"
        (delete)="delete.emit($event)"
      ></app-hero-list-item>
      }
    </mat-list>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class HeroListComponent {
  @Input({ required: true }) heroes: Hero[] = [];
  @Output() delete: EventEmitter<string> = new EventEmitter<string>();
}
