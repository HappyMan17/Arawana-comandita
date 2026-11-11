/* eslint-disable max-len */
import { useEffect, useState } from 'react';
import { Dropdown, TablePlateCard } from '.';
// import { useTable } from '../hooks';
import { Plate, PlateGroup } from '../types';
import { k } from '../helpers';

interface SelectProductProps {
  plates: Plate[];
  tablePlates: Plate[];
  plateGroups: PlateGroup[];
  onClose: () => void;
  onSave: (tablePlates: Plate[]) => void;
}

export const SelectProduct: React.FC<SelectProductProps> = ({
  plates,
  tablePlates,
  onClose,
  onSave,
  plateGroups,
}) => {
  // const { findTablePlate } = useTable();
  const [allPlates, setTablePlates] = useState<Plate[]>([]);
  const [plateGroupSelected, setPlateGroupSelected] = useState<string | null>(
    plateGroups[0]?.name ?? null,
  );

  const onSaveTablePlates = () => {
    const selectedPlates = allPlates.filter(plate => plate.isSelected);
    // Add command to save selectedPlates
    onSave(selectedPlates);
  };

  const onDropdownClick = (value: string) => {
    setPlateGroupSelected(value);
  };

  useEffect(() => {
    if (plates && plates.length > 0) {
      // this function gets the previous table plates saved
      const getTablePlates = () => {
        const currentPlates: Plate[] = plates.map(plate => {
          // const currentPlate = findTablePlate(plate.id!);
          // console.log({ tablePlates });
          const currentPlate = tablePlates.find(p => {
            return p.id === plate.id;
          });
          if (currentPlate) {
            return { ...currentPlate, isSelected: true };
          }
          return { ...plate, isSelected: false };
        });
        setTablePlates(currentPlates);
      };
      getTablePlates();
    }
    // setPlateGroupSelected(plateGroups[0]?.name ?? null);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [plates, plateGroups, tablePlates]);

  return (
    <section className="absolute top-0 left-0 z-50 flex items-center justify-center w-full h-dvh bg-zinc-600 bg-opacity-80">
      {/* Card */}
      <div className="relative w-full h-full sm:w-1/2 sm:h-4/5 sm:min-h-[650px] min-w-[480px] flex flex-col justify-start items-center p-9 rounded-none sm:rounded-xl bg-white dark:bg-gray-100 dark:border-gray-700">
        <h1 className="mb-2 text-2xl font-bold tracking-tight text-black"> { 'Select Product' } </h1>
        {/* Product group */}
        <div className='w-1/2-10 mt-3'>
          <Dropdown values={plateGroups} defaultValue={plateGroupSelected ?? plateGroups[0]?.name} onChange={onDropdownClick} />
        </div>
        {/* Product section */}
        <section className="max-h-[700px] sm:max-h-[350px] grid grid-cols-1 sm:grid-cols-2 grid-flow-row gap-4 overflow-scroll">
          {
            allPlates.map(plate => {
              if (plate.plateGroup?.name === plateGroupSelected) {
                return (
                  <TablePlateCard plate={plate} key={plate.id} />
                );
              }
              if (plateGroupSelected === k.noGroup && !plate.plateGroup) {
                return (
                  <TablePlateCard plate={plate} key={plate.id} />
                );
              }
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
