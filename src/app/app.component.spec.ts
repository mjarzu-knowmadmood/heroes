import { TestBed } from '@angular/core/testing';
import { AppComponent } from './app.component';
import { render, screen } from '@testing-library/angular';

describe('AppComponent', () => {
  it(`should render app`, async () => {
    await render(AppComponent);

    expect(
      screen.getByRole('link', { name: /Dashboard/i })
    ).toBeInTheDocument();
  });
});
