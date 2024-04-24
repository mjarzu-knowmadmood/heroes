import { Component, OnInit } from '@angular/core';

import { MatButtonModule } from '@angular/material/button';
import { MatDialog } from '@angular/material/dialog';
import { MatIcon } from '@angular/material/icon';
import { RouterModule } from '@angular/router';
import { ConfirmDialogComponent } from '../../../../shared/components/confirm-dialog/confirm-dialog.component';
import { Hero } from '../../../../shared/models/hero.model';
import { HeroService } from '../../services/hero.service';

import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatSnackBar } from '@angular/material/snack-bar';
import { filter, switchMap } from 'rxjs';
import { InputSearchComponent } from '../../../../shared/components/input-search/input-search.component';
import { HeroListComponent } from '../../components/hero-list/hero-list.component';

@Component({
  selector: 'app-super-heroes-list',
  standalone: true,

  imports: [
    MatIcon,
    MatButtonModule,
    RouterModule,
    InputSearchComponent,
    MatProgressSpinnerModule,
    HeroListComponent,
  ],
  providers: [HeroService],
  template: `
    <h1>List of heroes</h1>
    <h3>CRUD to manage Superheros</h3>

    <app-input-search (filterChange)="filterHeroes($event)"> </app-input-search>

    <hr />

    @if (isLoading) {
    <div class="flex justify-center mt-4">
      <mat-spinner diameter="50"></mat-spinner>
    </div>
    } @else{
    <button mat-button class="mt-4" routerLink="add">
      <mat-icon fontIcon="add"></mat-icon> New Hero
    </button>

    <app-hero-list
      [heroes]="heroes"
      (delete)="deleteHero($event)"
    ></app-hero-list>
    }
  `,
})
export class HeroesListComponent implements OnInit {
  heroes: Hero[] = [];
  isLoading: boolean = false;

  constructor(
    private heroService: HeroService,
    private dialog: MatDialog,
    private _snackBar: MatSnackBar
  ) {}

  ngOnInit(): void {
    this.isLoading = true;
    this.getHeroes();
  }

  filterHeroes(filterValue: string): void {
    this.heroService.filterHeroesByTerm(filterValue).subscribe((heroes) => {
      this.heroes = heroes;
      this.isLoading = false;
    });
  }

  getHeroes(): void {
    this.heroService.getHeroes().subscribe((heroes) => {
      this.heroes = heroes;
      this.isLoading = false;
    });
  }

  deleteHero(id: string): void {
    const dialogRef = this.dialog.open(ConfirmDialogComponent, {
      data: {
        title: 'Confirm remove hero',
        message: 'Are you sure, you want to remove an hero?',
        btnOkText: 'Confirm',
        btnCancelText: 'Cancel',
      },
    });

    dialogRef
      .afterClosed()
      .pipe(
        filter((result) => !!result),
        switchMap(() => this.heroService.deleteHero(id))
      )
      .subscribe(() => {
        this.heroes = this.heroes.filter((hero) => hero.id !== id);
        this._snackBar.open('Hero deleted successfully', 'Close', {
          duration: 5000,
        });
      });
  }
}
