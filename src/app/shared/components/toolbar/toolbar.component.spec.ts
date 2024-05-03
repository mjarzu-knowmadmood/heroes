import { render, screen } from '@testing-library/angular';
import { ToolbarComponent } from './toolbar.component';


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
});
