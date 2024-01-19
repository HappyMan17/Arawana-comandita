/* eslint-disable max-len */
import { Plate } from "../types";
import localImage from '../assets/default_plate.png';
import { useEffect, useState } from "react";
import _ from 'lodash';
import { convertToCurrency } from "../helpers";

interface PlateStateProps {
  isInputDisabled: boolean,
  quantity: number | undefined,
}

interface TablePlateCardProps {
  plate: Plate
}

export const TablePlateCard: React.FC<TablePlateCardProps> = ({ plate }) => {
  const [plateState, setPlateState] = useState<PlateStateProps>({
    isInputDisabled: true,
    quantity: 0,
  });

  useEffect(() => {
    // setting plateState values
    if (plate) {
      setPlateState({
        isInputDisabled: plate.isSelected ? !plate.isSelected : true,
        quantity: plate.quantity ?? 0,
      });
    }
  }, [plate]);

  const onChangeInputValue = ({ target }: any) => {
    let quantity: number | undefined = parseInt(target.value, 10);
    if (isNaN(quantity)) {
      quantity = plateState.quantity;
      if (`${plateState.quantity}`.length === 1) {
        quantity = undefined;
      }
    }

    //? saving quantity on plate state
    plate.quantity = quantity ?? 0;

    setPlateState(prevState => ({
      ...prevState,
      quantity: quantity,
    }));
  };

  const onToggleInputDisable = () => {
    let quantity: number | undefined = plateState.quantity;
    const currentDisabledValue = !plateState.isInputDisabled;
    if (currentDisabledValue) {
      quantity = 0;
    }
    //? saving isSelected on plate state
    //? if is disabled, the plate is not selected
    // plate.isSelected = !currentDisabledValue;
    _.set(plate, 'isSelected', !currentDisabledValue);

    setPlateState(() => ({
      isInputDisabled: currentDisabledValue,
      quantity: quantity,
    }));
  };

  return (
    <div className="relative max-w-sm min-w-40 max-h-[320px] bg-gray-800 border border-gray-200 rounded-lg shadow-xl dark:bg-gray-800 dark:border-gray-700">
      <div className="flex item-center justify-center">
          <img className="rounded-t-lg" src={localImage} alt="" width="150" />
      </div>
      <div className="p-5">
          <a href="#">
              <h5 className="text-2xl font-bold tracking-tight text-gray-900 dark:text-white">{ plate.name }</h5>
          </a>
          <p className="mb-3 font-normal text-gray-700 dark:text-gray-400">
              { convertToCurrency(plate.price) }
          </p>
          <div>
            <label className="block mb-2 text-sm font-medium text-white">
                How many:
                <input value={plateState.quantity ?? ''} onChange={onChangeInputValue} disabled={plateState.isInputDisabled} type="number" name="name" id="name" className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-1.5 mt-1 text-center" placeholder="1" required />
            </label>
          </div>
          {/* checkbox */}
          <div className="absolute top-3 right-3 flex items-center mb-4">
              <input onChange={onToggleInputDisable} id="default-checkbox" checked={!plateState.isInputDisabled} type="checkbox" value="" className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600" />
          </div>
      </div>
    </div>
  );
};
