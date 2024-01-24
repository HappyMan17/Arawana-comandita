/* eslint-disable max-len */

import { convertToCurrency } from "../helpers";
import { Plate } from "../types";

interface TablePlatesModalProps {
  plates: Plate[];
  isShown: boolean;
  onClose: (event: any) => void;
}

export const TablePlatesModal: React.FC<TablePlatesModalProps> = ({ plates, isShown, onClose }) => {
  return (
    <section onClick={onClose} className={`${isShown ? '' : 'hidden'} absolute top-0 left-0 z-50 flex items-center justify-center w-full h-full bg-zinc-600 bg-opacity-80`} >
      <div className="bg-white w-96 h-1/2 flex flex-col justify-start items-center py-9 rounded-xl overflow-scroll">
        <h1 className="mb-2 text-2xl font-bold tracking-tight text-black"> Plates Selected Resume </h1>
        {
          plates.map(plate => {
            return (
              <section key={`${plate.id}`}>
                <h1 className="truncate text-lg">
                  -{ plate.name.toUpperCase() }:
                </h1>
                <h1 className="truncate text-lg ml-5">
                  { convertToCurrency(plate.price) } x{ plate.quantity } = { convertToCurrency(plate.price * (plate.quantity ?? 1)) }
                </h1>
              </section>
            );
          })
        }
      </div>
    </section>
  );
};
