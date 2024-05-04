/* eslint-disable max-len */

import localImage from '../assets/default_plate.png';
import { convertToCurrency } from '../helpers';
import { Plate } from '../types';
interface ProductCardProps {
  plate: Plate;
  showFormModal: (title: string, id: string | null) => void;
  removePlate: (id: string | null) => void;
}

export const ProductCard: React.FC<ProductCardProps> = ({ plate, showFormModal, removePlate }) => {
  const { image, description, price, name } = plate;
  return (
    <div className="max-w-sm bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700 ease-in-out delay-150 hover:-translate-y-1 duration-200">
      <div className="flex item-center justify-center">
        <img className="rounded-t-lg" src={image ? image : localImage} alt="" width="200" />
      </div>
      <div className="p-5">
        <a>
          <h5 className="truncate mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">{ name }</h5>
        </a>
        <p className="truncate mb-3 font-normal text-gray-700 dark:text-gray-400">
          { description }
        </p>
        <p className="mb-3 font-normal text-gray-700 dark:text-gray-400">
          { convertToCurrency(price) }
        </p>
        {/* todo: add form to edit product information */}
        <div className="flex flex-wrap justify-between mt-2">
          <button onClick={() => showFormModal('Modify Plate', plate.id ?? null)} className="w-full inline-flex items-center px-3 py-2 text-sm font-medium text-center text-white bg-blue-700 rounded-lg hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">
            Modify
          </button>
          <button onClick={() => removePlate(plate.id ?? null)} className="w-full mt-3 inline-flex items-center px-3 py-2 text-sm font-medium text-center text-white bg-red-700 rounded-lg hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 dark:bg-red-600 dark:hover:bg-red-700 dark:focus:ring-blue-800">
            Remove Product
          </button>
        </div>
      </div>
    </div>
  );
};
