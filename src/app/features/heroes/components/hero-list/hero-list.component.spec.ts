import { EventEmitter } from '@angular/core';
import { render, screen } from '@testing-library/angular';
import userEvent from '@testing-library/user-event';
import { Hero } from '../../../../shared/models/hero.model';
import { HeroListComponent } from './hero-list.component';

describe('HeroListComponent', () => {
  it('should render list of heroes', async () => {
    const heroes: Hero[] = [
      { id: '1', name: 'Superman' },
      { id: '2', name: 'Batman' },
    ];

    await render(HeroListComponent, {
      componentInputs: { heroes },
    });

    expect(screen.getByText(/Superman/i)).toBeInTheDocument();
    expect(screen.getByText(/Batman/i)).toBeInTheDocument();
  });

  it('should emit delete event when a hero is deleted', async () => {
    const heroes: Hero[] = [
      { id: '1', name: 'Superman' },
      { id: '2', name: 'Batman' },
    ];
    const deleteMock = jest.fn();

    const user = userEvent.setup();
    await render(HeroListComponent, {
      componentInputs: { heroes },
      componentOutputs: {
        delete: { emit: deleteMock } as unknown as EventEmitter<string>,
      },
    });

    const deleteButtons = screen.getAllByRole('button', {
      name: /delete hero button/i,
    });

    expect(deleteButtons.length).toBe(2);

    await user.click(deleteButtons[0]);

    expect(deleteMock).toHaveBeenCalledTimes(1);
    expect(deleteMock).toHaveBeenCalledWith('1');
  });
});
