import { HttpClientModule } from '@angular/common/http';
import { render, screen } from '@testing-library/angular';
import userEvent from '@testing-library/user-event';
import { of } from 'rxjs';
import { HeroService } from '../../services/hero.service';
import { HeroUpsertComponent } from './hero-upsert.component';

describe('HeroUpsertComponent', () => {
  let heroServiceMock: Partial<HeroService>;

  beforeEach(() => {
    heroServiceMock = {
      getHeroById: jest.fn().mockReturnValue(of({ id: '1', name: 'SUPERMAN' })),
      addHero: jest.fn().mockReturnValue(of({ name: 'SUPERMAN' })),
      updateHero: jest
        .fn()
        .mockReturnValue(of({ id: '1', name: 'SUPERMAN UPDATED' })),
    };
  });

  it('should render hero upsert and fill the form', async () => {
    const user = userEvent.setup();
    await render(HeroUpsertComponent, {
      imports: [HttpClientModule],
      componentProviders: [{ provide: HeroService, useValue: heroServiceMock }],
    });
    expect(screen.getByRole('heading', { name: /Hero/i })).toBeInTheDocument();

    const nameControl = screen.getByRole('textbox', { name: /name/i });
    const saveButton = screen.getByRole('button', { name: /Create/i });

    await user.click(saveButton);
    expect(nameControl).toBeInvalid();
    await user.type(nameControl, 'superman');
    expect(nameControl).toHaveValue('SUPERMAN');
    expect(nameControl).toBeValid();
    await user.click(saveButton);

    expect(heroServiceMock.addHero).toHaveBeenCalledWith({
      name: 'SUPERMAN',
    });
  });

  it('should render hero upsert and fill the form for editing an existing hero', async () => {
    const user = userEvent.setup();
    await render(HeroUpsertComponent, {
      imports: [HttpClientModule],
      componentInputs: { heroId: '1' },
      componentProviders: [{ provide: HeroService, useValue: heroServiceMock }],
    });
    expect(
      screen.getByRole('heading', { name: /Edit Hero/i })
    ).toBeInTheDocument();

    const nameControl = screen.getByRole('textbox', { name: /name/i });
    expect(nameControl).toHaveValue('SUPERMAN');

    const saveButton = screen.getByRole('button', { name: /Update/i });

    await user.type(nameControl, ' updated');
    await user.click(saveButton);
    expect(nameControl).toBeValid();

    expect(heroServiceMock.updateHero).toHaveBeenCalledWith({
      id: '1',
      name: 'SUPERMAN UPDATED',
    });
  });
});
