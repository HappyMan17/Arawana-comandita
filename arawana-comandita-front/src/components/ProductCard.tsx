/* eslint-disable max-len */

import localImage from '../assets/default_plate.png';
import { CardMenu } from './CardMenu';
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
    <div className="flex flex-col bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700">
      <div className="p-4 flex flex-col gap-3 h-full">
        {/* Header: thumbnail, name, menu */}
        <div className="flex items-start gap-3">
          <img className="shrink-0 w-12 h-12 rounded-lg object-cover bg-gray-100 dark:bg-gray-700" src={image ? image : localImage} alt="" />
          <div className="flex-1 min-w-0">
            <h5 className="text-xl font-bold tracking-tight text-gray-900 dark:text-white truncate">{ name }</h5>
            { description && <p className="text-sm text-gray-600 dark:text-gray-300 truncate">{ description }</p> }
          </div>
          <CardMenu
            label={name}
            onEdit={() => showFormModal('Modify Plate', plate.id ?? null)}
            onDelete={() => removePlate(plate.id ?? null)}
          />
        </div>

        <p className="mt-auto text-2xl font-bold text-gray-900 dark:text-white">
          { convertToCurrency(price) }
        </p>
      </div>
    </div>
  );
};
