import {
  ChangeDetectionStrategy,
  Component,
  EventEmitter,
  OnInit,
  Output,
} from '@angular/core';
import { MatInputModule } from '@angular/material/input';
import { Subject, debounceTime, distinctUntilChanged } from 'rxjs';

@Component({
  selector: 'app-input-search',
  standalone: true,
  imports: [MatInputModule],
  template: `
    <mat-form-field class="w-full">
      <mat-label>Filter</mat-label>
      <input
        matInput
        (keyup)="applyFilter($event)"
        placeholder="Type filter here"
      />
    </mat-form-field>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class InputSearchComponent implements OnInit {
  @Output() filterChange = new EventEmitter<string>();
  private searchValue = new Subject<string>();

  ngOnInit(): void {
    this.searchValue
      .pipe(debounceTime(1000), distinctUntilChanged())
      .subscribe((filterValue: string) => this.filterChange.emit(filterValue));
  }
  applyFilter(event: Event): void {
    const filterValue = (event.target as HTMLInputElement).value;
    this.searchValue.next(filterValue);
  }
}
