import { EventEmitter } from '@angular/core';
import { render, screen } from '@testing-library/angular';
import userEvent from '@testing-library/user-event';
import { Hero } from '../../../../shared/models/hero.model';
import { HeroListItemComponent } from './hero-list-item.component';

describe('HeroListItemComponent', () => {
  it('should render hero details', async () => {
    const hero: Hero = { id: '1', name: 'Superman' };

    await render(HeroListItemComponent, {
      componentInputs: { hero },
    });

    expect(screen.getByText(/Superman/i)).toBeInTheDocument();
  });

  it('should emit delete event when delete button is clicked', async () => {
    const hero: Hero = { id: '1', name: 'Superman' };
    const deleteMock = jest.fn();

    const user = userEvent.setup();
    await render(HeroListItemComponent, {
      componentInputs: { hero },
      componentOutputs: {
        delete: { emit: deleteMock } as unknown as EventEmitter<string>,
      },
    });

    await user.click(
      screen.getByRole('button', {
        name: /delete hero button/i,
      })
    );

    expect(deleteMock).toHaveBeenCalledTimes(1);
    expect(deleteMock).toHaveBeenCalledWith('1');
  });
});
