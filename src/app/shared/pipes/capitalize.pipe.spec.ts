import { render } from '@testing-library/angular';
import { CapitalizePipe } from './capitalize.pipe';

describe('CapitalizePipe', () => {
  it('should capitalize the first letter of a string', async () => {
    const pipe = new CapitalizePipe();
    const transformedValue = pipe.transform('hello');

    expect(transformedValue).toEqual('Hello');
  });

  it('should handle empty input', async () => {
    const pipe = new CapitalizePipe();
    const transformedValue = pipe.transform('');

    expect(transformedValue).toEqual('');
  });
});
