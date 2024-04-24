import userEvent from '@testing-library/user-event';
import { UpperCaseInputDirective } from './upper-case-input.directive';
import { render, screen } from '@testing-library/angular';

describe('UpperCaseInputDirective', () => {
  it('should convert input value to uppercase', async () => {
    const user = userEvent.setup();
    await render('<input type="text" toUppercase />', {
      imports: [UpperCaseInputDirective],
    });

    const inputElement = screen.getByRole('textbox');

    await user.type(inputElement, 'superman');
    expect(inputElement).toHaveValue('SUPERMAN');
  });
});
