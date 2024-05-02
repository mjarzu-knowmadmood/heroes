import { render, screen } from '@testing-library/angular';
import { AppComponent } from './app.component';

describe('AppComponent', () => {
  it(`should render app`, async () => {
    await render(AppComponent);

    expect(
      screen.getByRole('link', { name: /Dashboard/i })
    ).toBeInTheDocument();
  });
});
