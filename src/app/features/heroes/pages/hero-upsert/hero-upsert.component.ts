import { Location } from '@angular/common';
import {
  ChangeDetectionStrategy,
  Component,
  Input,
  OnChanges,
  SimpleChanges,
} from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSnackBar } from '@angular/material/snack-bar';
import { UpperCaseInputDirective } from '../../../../shared/directives/upper-case-input.directive';
import { Hero } from '../../../../shared/models/hero.model';
import { HeroService } from '../../services/hero.service';

@Component({
  selector: 'app-hero-upsert',
  standalone: true,
  imports: [
    MatFormFieldModule,
    MatInputModule,
    ReactiveFormsModule,
    MatButtonModule,
    UpperCaseInputDirective,
  ],
  providers: [HeroService],
  template: `
    <div>
      <h2>{{ isNew ? 'New' : 'Edit' }} Hero</h2>
    </div>

    <form [formGroup]="form">
      <mat-form-field class="w-full">
        <mat-label>Name</mat-label>
        <input matInput type="text" formControlName="name" toUppercase />
      </mat-form-field>

      <div class="flex gap-x-4">
        <button mat-stroked-button (click)="save()">
          {{ isNew ? 'Create' : 'Update' }}
        </button>
        <button mat-stroked-button (click)="goBack()">Go back</button>
      </div>
    </form>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class HeroUpsertComponent implements OnChanges {
  @Input() heroId!: string;
  form: FormGroup = this.fb.group({
    name: ['', Validators.required],
  });
  isNew: boolean = true;

  constructor(
    private fb: FormBuilder,
    private location: Location,
    private heroService: HeroService,
    private _snackBar: MatSnackBar
  ) {}

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['heroId'] && this.heroId) {
      this.isNew = false;
      this.loadHero(this.heroId);
    }
  }

  loadHero(id: string): void {
    this.heroService.getHeroById(id).subscribe((hero) => {
      this.form.patchValue(hero);
    });
  }

  goBack(): void {
    this.location.back();
  }

  save(): void {
    if (this.form.invalid) {
      return;
    }

    const name = this.form.value.name;
    const heroData: Hero = { id: this.heroId, name };

    if (this.isNew) {
      this.heroService.addHero(heroData).subscribe(() => {
        this.goBack();
        this._snackBar.open('Hero created successfully', 'Close', {
          duration: 5000,
        });
      });
    } else {
      this.heroService.updateHero(heroData).subscribe(() => {
        this.goBack();
        this._snackBar.open('Hero updated successfully', 'Close', {
          duration: 5000,
        });
      });
    }
  }
}
