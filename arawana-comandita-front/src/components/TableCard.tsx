/* eslint-disable max-len */
import { useState } from 'react';
import { Chronometer } from '.';
import { CardMenu } from './CardMenu';
import { convertToCurrency, getTableStatus, tableStatusStyles } from '../helpers';
import { Plate, State, Table } from '../types';

interface TableCardProps {
  table: Table;
  onEndService: (table: Table) => void;
  showPlateModal: (tableId: string) => void;
  onShowPreview: (plates: Plate[]) => void;
  showFormModal: (title: string, id: string | null) => void;
  removeTable: (id: string | null) => void;
  onStartCommand: (table: Table) => void;
  onFoodDelivered: (table: Table) => void;
}

const btn = 'w-full min-h-10 px-3 py-2 text-sm font-medium rounded-lg focus:ring-4 focus:outline-none';
const primaryBtn = `${btn} text-white bg-blue-700 hover:bg-blue-800 focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800`;
const successBtn = `${btn} text-white bg-green-700 hover:bg-green-800 focus:ring-green-300 dark:bg-green-600 dark:hover:bg-green-700 dark:focus:ring-green-800`;
const dangerOutlineBtn = `${btn} border border-red-600 text-red-600 bg-transparent hover:bg-red-50 focus:ring-red-300 dark:border-red-500 dark:text-red-400 dark:hover:bg-red-950`;

export const TableCard: React.FC<TableCardProps> = ({
  table,
  showFormModal,
  removeTable,
  showPlateModal,
  onEndService,
  onShowPreview,
  onStartCommand,
  onFoodDelivered,
}) => {
  const { name, comment, plates, total } = table;
  const [chronometerState, setChronometerState] = useState<State>('stop');
  const status = getTableStatus(table);
  const { label, badge, ring } = tableStatusStyles[status];

  const onStartCommandButtonClick = () => {
    onStartCommand(table);
    setChronometerState('start');
  };

  const onFoodDeliveredButtonClick = () => {
    onFoodDelivered(table);
    setChronometerState('reset');
  };

  return (
    <div className={`relative flex flex-col bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700 ${ring}`}>
      <div className="p-4 flex flex-col gap-3 h-full">
        {/* Header: icon, name, status, menu */}
        <div className="flex items-start gap-3">
          <div className="shrink-0 flex items-center justify-center w-10 h-10 rounded-lg bg-gray-100 text-gray-600 dark:bg-gray-700 dark:text-gray-300">
            <svg className="w-6 h-6" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M3 9h18M5 9v10M19 9v10M8 9V6h8v3" />
            </svg>
          </div>
          <div className="flex-1 min-w-0">
            <h5 className="text-xl font-bold tracking-tight text-gray-900 dark:text-white truncate">{ name }</h5>
            <span className={`inline-block mt-1 px-2 py-0.5 text-xs font-medium rounded-full ${badge}`}>{ label }</span>
          </div>
          <CardMenu
            label={name}
            onEdit={() => showFormModal('Modify Table', table.id ?? null)}
            onDelete={() => removeTable(table.id ?? null)}
          />
        </div>

        {/* Meta */}
        <div className="text-sm text-gray-600 dark:text-gray-300">
          { comment && <p className="truncate">{ comment }</p> }
          <div className="flex items-center gap-2">
            <button
              onClick={() => plates.length > 0 && onShowPreview(plates)}
              disabled={plates.length === 0}
              className="enabled:hover:underline"
            >
              { plates.length } { plates.length === 1 ? 'product' : 'products' }
            </button>
            { status === 'waiting' && <span aria-hidden="true">·</span> }
            <Chronometer state={chronometerState} command={table.commands?.[0]} />
          </div>
        </div>

        <p className="text-2xl font-bold text-gray-900 dark:text-white">
          { convertToCurrency(total) }
        </p>

        {/* Actions for the current status */}
        <div className="mt-auto grid grid-cols-1 sm:grid-cols-2 gap-2">
          <button onClick={() => showPlateModal(table.id!)} className={`${primaryBtn} ${status === 'free' ? 'sm:col-span-2' : ''}`}>
            Add products
          </button>
          { status === 'occupied' && (
            <button onClick={onStartCommandButtonClick} className={primaryBtn}>
              Start Command
            </button>
          ) }
          { status === 'waiting' && (
            <button onClick={onFoodDeliveredButtonClick} className={successBtn}>
              Food Delivered
            </button>
          ) }
          { status !== 'free' && (
            <button onClick={() => onEndService(table)} className={`${dangerOutlineBtn} sm:col-span-2`}>
              End Service
            </button>
          ) }
        </div>
      </div>
    </div>
  );
};
