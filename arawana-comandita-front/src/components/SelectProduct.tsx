/* eslint-disable max-len */
import { TablePlateCard } from '.';
import { useTable } from '../hooks';
import { Plate } from '../types';

interface SelectProductProps {
  tableId: string | null;
  plates: Plate[];
  onClose: () => void;
  onSave: (tablePlates: Plate[]) => void;
}

export const SelectProduct: React.FC<SelectProductProps> = ({ tableId, plates, onClose, onSave }) => {
    const { findTablePlate } = useTable();
    const tablePlates: Plate[] = JSON.parse(JSON.stringify(plates));
    if (plates.length === 0) {
      return;
    }

    const onSaveTablePlates = () => {
      const selectedPlates = tablePlates.filter(plate => plate.isSelected);
      onSave(selectedPlates);
    };

    return (
        <section className="absolute top-0 left-0 z-50 flex items-center justify-center w-full h-dvh bg-zinc-600 bg-opacity-80">
            <div className="relative w-full h-full sm:w-1/2 sm:h-4/5 min-w-[480px] flex flex-col justify-start items-center p-9 rounded-none sm:rounded-xl bg-white dark:bg-gray-100 dark:border-gray-700">
                <h1 className="mb-2 text-2xl font-bold tracking-tight text-black"> { 'Select Product' } </h1>
                <section className="max-h-[650px] grid grid-cols-1 sm:grid-cols-2 grid-flow-row gap-4 mt-10 mb-3 overflow-scroll">
                    {
                        tablePlates.map(plate => {
                            // to show current table plate values
                            const currentPlate = findTablePlate(tableId, plate.id!);
                            return (
                                <TablePlateCard plate={currentPlate ?? plate} key={plate.id} />
                            );
                        })
                    }
                </section>
                <div className='absolute bottom-3 sm:bottom-20 w-fullflex flex-wrap justify-center items-center px-10'>
                    <button onClick={onSaveTablePlates} type="button" className="w-full sm:w-40 text-white bg-blue-500 hover:bg-primary-700 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800">
                        Save
                    </button>
                    <button onClick={onClose} type="button" className="w-full sm:w-40 mt-3 sm:mt-0 ml-0 sm:ml-5 text-white bg-red-600 hover:bg-red-700 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-red-600 dark:hover:bg-red-700 dark:focus:ring-red-800">
                        Cancel
                    </button>
                </div>
            </div>
        </section>
    );
};
