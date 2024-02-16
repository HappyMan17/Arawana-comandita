/* eslint-disable max-len */
import { useState } from 'react';
import { Chronometer } from '.';
import localImage from '../assets/newTable.png';
import { convertToCurrency } from '../helpers';
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

  const onShowPlate = () => {
    showPlateModal(table.id!);
  };

  const onShowPlatesView = () => {
    if (plates.length > 0) {
      onShowPreview(plates);
    }
  };

  const endService = () => {
    onEndService(table);
  };

  const onStartCommandButtonClick = () => {
    onStartCommand(table);
    setChronometerState('start');
  };

  const onFoodDeliveredButtonClick = () => {
    onFoodDelivered(table);
    setChronometerState('reset');
  };

  return (
    <div className={`relative min-w-[200px] max-w-[320px] z-10 m-1 bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700 ${plates.length > 0 && 'ring-red-600 ring-4'}`}>
      <div onClick={onShowPlatesView} className="relative flex item-center justify-start">
        <img className="rounded-t-lg" src={localImage} alt="" />
        <Chronometer state={chronometerState} />
      </div>
      <div className="p-5">
        <h5 className="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">{ name }</h5>
        <p className="font-normal text-gray-700 dark:text-gray-400">
          { comment }
        </p>
        <p className="mb-3 font-normal text-white dark:text-white">
          Total: { convertToCurrency(total) }
        </p>
        {/* add product */}
        <div className="flex flex-wrap justify-between mt-2">
          {/* modify table */}
          <button onClick={() => showFormModal('Modify Table', table.id ?? null)} className="absolute top-3 left-3 w-auto inline-flex items-center px-3 py-2 text-sm font-medium text-center text-white bg-blue-400 rounded-lg hover:bg-blue-500 focus:ring-4 focus:outline-none focus:ring-blue-300 dark:bg-transparent dark:hover:bg-blue-400 dark:focus:ring-blue-800">
            <svg className="w-6 h-6 text-gray-800 hover:text-white dark:text-dark dark:hover:text-white" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 21 21">
              <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M7.418 17.861 1 20l2.139-6.418m4.279 4.279 10.7-10.7a3.027 3.027 0 0 0-2.14-5.165c-.802 0-1.571.319-2.139.886l-10.7 10.7m4.279 4.279-4.279-4.279m2.139 2.14 7.844-7.844m-1.426-2.853 4.279 4.279"/>
            </svg>
          </button>
          {/* Delet table */}
          <button onClick={() => removeTable(table.id ?? null)} className="absolute top-0 right-3 w-auto mt-3 inline-flex items-center px-3 py-2 text-sm font-medium text-center text-white bg-red-400 rounded-lg hover:bg-red-500 focus:ring-4 focus:outline-none focus:ring-blue-300 dark:bg-transparent dark:hover:bg-red-400 dark:focus:ring-blue-800">
            <svg className="w-6 h-6 text-gray-800 hover:text-white dark:text-dark dark:hover:text-white" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 18 20">
              <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M1 5h16M7 8v8m4-8v8M7 1h4a1 1 0 0 1 1 1v3H6V2a1 1 0 0 1 1-1ZM3 5h12v13a1 1 0 0 1-1 1H4a1 1 0 0 1-1-1V5Z"/>
            </svg>
          </button>
        </div>
        {/* Buttons */}
        <div className='w-full grid grid-cols-1 sm:grid-cols-2 grid-flow-row gap-2'>
          <button onClick={onShowPlate} className="w-full mt-3 inline-flex items-center px-3 py-2 text-sm font-medium text-center text-white bg-blue-700 rounded-lg hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">
            Add products
          </button>
          <button onClick={endService} disabled={!(table.plates.length > 0)} className="w-full mt-3 inline-flex items-center px-3 py-2 text-sm font-medium text-center text-white bg-red-700 rounded-lg hover:bg-red-800 focus:ring-4 focus:outline-none focus:ring-blue-300 dark:bg-red-600 dark:hover:bg-red-700 dark:focus:ring-red-800">
            End Service
          </button>
          <button onClick={onStartCommandButtonClick} className="w-full mt-3 inline-flex items-center px-3 py-2 text-sm font-medium text-center text-white bg-blue-700 rounded-lg hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">
            Start Command
          </button>
          <button onClick={onFoodDeliveredButtonClick} disabled={!(table.plates.length > 0)} className="w-full mt-3 inline-flex items-center px-3 py-2 text-sm font-medium text-center text-white bg-green-700 rounded-lg hover:bg-green-800 focus:ring-4 focus:outline-none focus:ring-blue-300 dark:bg-green-600 dark:hover:bg-green-700 dark:focus:ring-red-800">
            Food Delivered
          </button>
        </div>
      </div>
    </div>
  );
};

