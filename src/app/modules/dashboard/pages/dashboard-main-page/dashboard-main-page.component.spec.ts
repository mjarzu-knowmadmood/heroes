import { render, screen } from '@testing-library/angular';
import { DashboardMainPageComponent } from './dashboard-main-page.component';

describe('DashboardMainPageComponent', () => {
  it('should render dashboard and display the title', async () => {
    await render(DashboardMainPageComponent, {});

    const titleElement = screen.getByRole('heading', {
      name: /Hello, super-heroes/i,
    });
    expect(titleElement).toBeInTheDocument();
  });
});
