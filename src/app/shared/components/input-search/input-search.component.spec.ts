import { render, screen, fireEvent } from '@testing-library/angular';
import { InputSearchComponent } from './input-search.component';
import userEvent from '@testing-library/user-event';

describe('InputSearchComponent', () => {
  it('should emit filterChange event with input value after 1s', async () => {
    const user = userEvent.setup();
    const filterChangeMock = jest.fn();

    await render(InputSearchComponent, {
      componentOutputs: {
        filterChange: {
          emit: filterChangeMock,
        } as any,
      },
    });
    const input = screen.getByPlaceholderText('Type filter here');

    await user.type(input, 'test');

    await new Promise((resolve) => setTimeout(resolve, 1000));

    expect(filterChangeMock).toHaveBeenCalledWith('test');
  });
});
