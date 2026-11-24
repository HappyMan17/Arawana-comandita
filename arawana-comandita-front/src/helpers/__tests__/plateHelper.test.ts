import { normalizePlate } from '..';

describe('normalizePlate', () => {
  it('maps _id to id and fills defaults', () => {
    expect(normalizePlate({ _id: 'p1' })).toEqual({
      _id: 'p1',
      id: 'p1',
      plateGroup: null,
      image: null,
      price: 0,
      description: '',
      name: '',
    });
  });
  it('keeps existing values, preferring id over _id', () => {
    const plate = normalizePlate(
      { id: 'a', _id: 'b', name: 'Soup', price: 12000 },
    );
    expect(plate).toMatchObject({ id: 'a', name: 'Soup', price: 12000 });
  });
});
