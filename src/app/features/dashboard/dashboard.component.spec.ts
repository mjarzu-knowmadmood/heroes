import { render, screen } from '@testing-library/angular';
import { DashboardComponent } from './dashboard.component';

describe('DashboardComponent', () => {
  it('should render dashboard and display the title', async () => {
    await render(DashboardComponent, {});

    const titleElement = screen.getByText(/Hello, super-heroes/i);
    expect(titleElement).toBeInTheDocument();
  });
});
