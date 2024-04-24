import { render, screen } from '@testing-library/angular';
import { ToolbarComponent } from './toolbar.component';

import { RouterModule } from '@angular/router';
import userEvent from '@testing-library/user-event';
import { routes } from '../../../app.routes';

describe('ToolbarComponent', () => {
  it('should render toolbar with two link buttons', async () => {
    await render(ToolbarComponent);
    const buttons = screen.getAllByRole('link');
    expect(buttons.length).toBe(2);
  });

  it('should render the two link button', async () => {
    await render(ToolbarComponent);

    expect(
      screen.getByRole('link', { name: /Dashboard/i })
    ).toBeInTheDocument();
    expect(screen.getByRole('link', { name: /Heroes/i })).toBeInTheDocument();
  });

  it('should test click routing links', async () => {
    const user = userEvent.setup();
    await render(
      `
      <app-toolbar />
      <router-outlet />
      `,
      {
        imports: [ToolbarComponent, RouterModule.forChild(routes)],
      }
    );
    const dashboardButton = screen.getByRole('link', { name: /Dashboard/i });
    const heroesButton = screen.getByRole('link', { name: /Heroes/i });

    expect(
      await screen.findByRole('heading', { name: /Hello, super-heroes/i })
    ).toBeInTheDocument();

    user.click(heroesButton);

    expect(
      await screen.findByRole('heading', { name: /List of heroes/i })
    ).toBeInTheDocument();
    expect(
      await screen.queryByRole('heading', { name: /Hello, super-heroes/i })
    ).not.toBeInTheDocument();

    user.click(dashboardButton);
    expect(
      await screen.findByRole('heading', { name: /Hello, super-heroes/i })
    ).toBeInTheDocument();
  });
});
