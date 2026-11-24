import {
  duplicateValuesSum,
  getDateFormat,
  getInitTimer,
  getTableStatus,
  normalizeTable,
} from '..';
import { Plate } from '../../types';

const plate = (id: string, quantity?: number) =>
  ({ id, quantity, name: id, price: 1000 }) as Plate;

describe('getTableStatus', () => {
  it('is free with no plates or commands', () => {
    expect(getTableStatus({})).toBe('free');
    expect(getTableStatus({ plates: [], commands: [] })).toBe('free');
  });
  it('is occupied with plates and no commands', () => {
    expect(getTableStatus({ plates: [{}], commands: [] })).toBe('occupied');
  });
  it('is waiting when a command exists, even with plates', () => {
    expect(getTableStatus({ plates: [{}], commands: [{}] })).toBe('waiting');
  });
});

describe('normalizeTable', () => {
  it('fills missing fields with defaults', () => {
    expect(normalizeTable({ id: 't1' })).toEqual({
      id: 't1', commands: [], plates: [], total: 0, comments: '', name: '',
    });
  });
  it('normalizes nested plates', () => {
    const table = normalizeTable({ plates: [{ _id: 'p1', name: 'Soup' }] });
    expect(table.plates[0]).toMatchObject({ id: 'p1', name: 'Soup', price: 0 });
  });
});

describe('getInitTimer', () => {
  it('returns null for empty or invalid dates', () => {
    expect(getInitTimer('')).toBeNull();
    expect(getInitTimer('not a date')).toBeNull();
  });
  it('returns elapsed ms since the given time', () => {
    const tenSecondsAgo = new Date(Date.now() - 10_000).toISOString();
    expect(getInitTimer(tenSecondsAgo)).toBeGreaterThanOrEqual(10_000);
  });
});

describe('getDateFormat', () => {
  it('formats as YYYY-MM-DD with zero padding', () => {
    expect(getDateFormat(new Date(2024, 0, 5))).toBe('2024-01-05');
  });
});

describe('duplicateValuesSum', () => {
  it('sums quantities of repeated plates and appends new ones', () => {
    const result = duplicateValuesSum(
      [plate('a', 2), plate('b', 1)],
      [plate('a', 3), plate('c', 1)],
    );
    expect(result.map(p => [p.id, p.quantity]))
      .toEqual([['a', 5], ['b', 1], ['c', 1]]);
  });
  it('treats missing quantity as 0', () => {
    const [merged] = duplicateValuesSum([plate('a')], [plate('a', 1)]);
    expect(merged.quantity).toBe(1);
  });
});
