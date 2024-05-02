import { HttpClientModule } from '@angular/common/http';
import { render, screen, waitFor } from '@testing-library/angular';
import userEvent from '@testing-library/user-event';
import { of } from 'rxjs';
import { Hero } from '../../../../shared/models/hero.model';
import { HeroService } from '../../services/hero.service';
import { HeroesPageComponent } from './heroes-page.component';

describe('HeroesPageComponent', () => {
  it('should render heroes list Component', async () => {
    const heroes: Hero[] = [
      { id: '1', name: 'superman' },
      { id: '2', name: 'batman' },
    ];
    const heroServiceMock = {
      getHeroes: jest.fn().mockReturnValue(of(heroes)),
    };
    await render(HeroesPageComponent, {
      imports: [HttpClientModule],
      componentProviders: [
        {
          provide: HeroService,
          useValue: heroServiceMock,
        },
      ],
    });
    expect(
      screen.getByRole('heading', { name: /List of heroes/i })
    ).toBeInTheDocument();
    expect(screen.getByText(/Superman/i)).toBeInTheDocument();
    expect(screen.getByText(/Batman/i)).toBeInTheDocument();
  });

  it('should delete a hero', async () => {
    const heroes: Hero[] = [{ id: '1', name: 'Superman' }];
    const heroServiceMock = {
      getHeroes: jest.fn().mockReturnValue(of(heroes)),
      deleteHero: jest.fn().mockReturnValue(of(null)),
    };
    const user = userEvent.setup();
    await render(HeroesPageComponent, {
      imports: [HttpClientModule],
      componentProviders: [
        {
          provide: HeroService,
          useValue: heroServiceMock,
        },
      ],
    });

    expect(
      screen.queryByText(/Hero deleted successfully/i)
    ).not.toBeInTheDocument();
    const deleteButton = screen.getByRole('button', {
      name: /delete hero button/i,
    });
    user.click(deleteButton);

    user.click(
      await screen.findByRole('button', {
        name: /Confirm/i,
      })
    );

    await waitFor(() =>
      expect(heroServiceMock.deleteHero).toHaveBeenCalledTimes(1)
    );
    expect(screen.getByText(/Hero deleted successfully/i)).toBeInTheDocument();
  });

  it('should filter heroes by term', async () => {
    const heroes: Hero[] = [
      { id: '1', name: 'Superman' },
      { id: '2', name: 'Batman' },
    ];

    const heroServiceMock = {
      getHeroes: jest.fn().mockReturnValue(of(heroes)),
      filterHeroesByTerm: jest.fn((filterValue: string) =>
        of(heroes.filter((hero) => hero.name.includes(filterValue)))
      ),
    };
    const user = userEvent.setup();
    await render(HeroesPageComponent, {
      imports: [HttpClientModule],
      componentProviders: [
        {
          provide: HeroService,
          useValue: heroServiceMock,
        },
      ],
    });
    const filterInput = screen.getByRole('textbox', { name: /filter/i });

    expect(screen.getByText(/Superman/i)).toBeInTheDocument();
    expect(screen.getByText(/Batman/i)).toBeInTheDocument();
    await user.type(filterInput, 'Superman');
    await new Promise((resolve) => setTimeout(resolve, 1000));
    await waitFor(() =>
      expect(heroServiceMock.filterHeroesByTerm).toHaveBeenCalledWith(
        'Superman'
      )
    );
  });
});
