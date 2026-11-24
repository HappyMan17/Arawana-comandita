import { convertToCurrency } from '..';

// \s also matches the non-breaking space Intl inserts after "$"
describe('convertToCurrency', () => {
  it('formats COP without decimals', () => {
    expect(convertToCurrency(15000)).toMatch(/^\$\s?15\.000$/);
  });
  it('treats falsy values as 0', () => {
    expect(convertToCurrency(0)).toMatch(/^\$\s?0$/);
    const missing = undefined as unknown as number;
    expect(convertToCurrency(missing)).toMatch(/^\$\s?0$/);
  });
});
