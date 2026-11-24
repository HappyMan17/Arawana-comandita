import { act, fireEvent, render, screen } from '@testing-library/react';
import { TableCard } from '../TableCard';
import { Command, Plate, Table } from '../../types';

const makeTable = (overrides: Partial<Table> = {}): Table => ({
  id: 't1', name: 'Table 1', total: 0, comment: '', uid: 'u1',
  initCommand: '', platesServed: '', plates: [], commands: [],
  ...overrides,
});

const renderCard = (table: Table) => {
  const props = {
    table,
    onEndService: jest.fn(),
    showPlateModal: jest.fn(),
    onShowPreview: jest.fn(),
    showFormModal: jest.fn(),
    removeTable: jest.fn(),
    onStartCommand: jest.fn(),
    onFoodDelivered: jest.fn(),
  };
  render(<TableCard {...props} />);
  return props;
};

const plate = { id: 'p1', name: 'Soup', price: 1000, quantity: 1 } as Plate;
const command = {
  table_id: 't1',
  initCommand: new Date(),
  endCommand: null,
} as Command;

beforeEach(() => jest.useFakeTimers());
afterEach(() => jest.useRealTimers());

describe('TableCard', () => {
  it('free table only offers "Add products"', () => {
    const props = renderCard(makeTable());
    expect(screen.getByText('Table 1')).toBeInTheDocument();
    expect(screen.getByText('Free')).toBeInTheDocument();
    expect(screen.queryByText('Start Command')).not.toBeInTheDocument();
    expect(screen.queryByText('End Service')).not.toBeInTheDocument();

    fireEvent.click(screen.getByText('Add products'));
    expect(props.showPlateModal).toHaveBeenCalledWith('t1');
  });

  it('occupied table can start a command and end service', () => {
    const table = makeTable({ plates: [plate], total: 1000 });
    const props = renderCard(table);
    expect(screen.getByText('Occupied')).toBeInTheDocument();
    expect(screen.getByText('1 product')).toBeInTheDocument();

    act(() => { fireEvent.click(screen.getByText('Start Command')); });
    expect(props.onStartCommand).toHaveBeenCalledWith(table);

    fireEvent.click(screen.getByText('End Service'));
    expect(props.onEndService).toHaveBeenCalledWith(table);
  });

  it('waiting table can mark food delivered', () => {
    const table = makeTable({ plates: [plate], commands: [command] });
    const props = renderCard(table);
    expect(screen.getByText('Waiting for food')).toBeInTheDocument();
    expect(screen.queryByText('Start Command')).not.toBeInTheDocument();

    act(() => { fireEvent.click(screen.getByText('Food Delivered')); });
    expect(props.onFoodDelivered).toHaveBeenCalledWith(table);
  });

  it('menu Edit/Delete call the table handlers', () => {
    const props = renderCard(makeTable());
    fireEvent.click(screen.getByLabelText('Options for Table 1'));
    fireEvent.click(screen.getByText('Edit'));
    expect(props.showFormModal).toHaveBeenCalledWith('Modify Table', 't1');

    fireEvent.click(screen.getByLabelText('Options for Table 1'));
    fireEvent.click(screen.getByText('Delete'));
    expect(props.removeTable).toHaveBeenCalledWith('t1');
  });
});
