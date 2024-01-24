import { useState } from "react";
import { Plate, PlateGroup } from "../types";
import { Dropdown } from ".";

/* eslint-disable max-len */
interface ProductFormProps {
  onClose: () => void;
  onSave: (plate: Plate) => void;
  title: string;
  plate: Plate | null;
  plateGroups: PlateGroup[];
}

const initForm: Plate = {
  name: '',
  description: '',
  image: '',
  uid: '',
  plateGroup: 'Comida',
  price: 0,
};

export const ProductForm: React.FC<ProductFormProps> = ({ onClose, plate, title, onSave, plateGroups }) => {
  const [formState, setFormState] = useState(plate ?? initForm);
  const onChangeValue = ({ target }: any) => {
    const { name, value } = target;

    if (name === 'price') {
      let price: number | undefined = parseInt(value, 10);
      if (isNaN(price) || price < 0) {
        price = formState.price;
        if (`${formState.price}`.length === 1) {
          price = undefined;
        }
      }
      return setFormState(prevState => ({
        ...prevState,
        price: price!,
      }));
    }

    setFormState(prevState => ({
      ...prevState,
      [name]: value,
    }));
  };

  const onDropdownClick = (value: string) => {
    setFormState(prevState => ({
      ...prevState,
      plateGroup: value,
    }));
  };

  return (
    <section className="absolute top-0 left-0 z-50 flex items-center justify-center w-full h-full bg-zinc-600 bg-opacity-80">
      <div className="bg-white w-96 h-1/2 flex flex-col justify-center items-center py-4 rounded-xl">
        <h1 className="mb-2 text-2xl font-bold tracking-tight text-black"> { title } </h1>
        <form className="p-3 w-80 bg-white" action="#" onSubmit={() => null} autoComplete="off" >
          <div>
            <label className="block mb-2 text-sm font-medium text-gray-900">
              Product Name:
              <input value={formState.name} onChange={onChangeValue} type="text" name="name" id="name" className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5" placeholder="Soup" required />
            </label>
          </div>
          <div>
            <label className="block mb-2 text-sm font-medium text-gray-900">
              Description:
              <input value={formState.description} onChange={onChangeValue} type="text" name="description" id="description" placeholder="" className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5" required />
            </label>
          </div>
          <div>
            <label className="block mb-2 text-sm font-medium text-gray-900">
              Price:
              <input value={formState.price} autoComplete="off" onChange={onChangeValue} type="number" name="price" id="price" placeholder="" className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5" required />
            </label>
          </div>
          {/* Product group */}
          <Dropdown values={plateGroups} defaultValue={formState.plateGroup ? formState.plateGroup : plateGroups[0].name} onChange={onDropdownClick} />
          <button onClick={() => onSave(formState)} type="button" className="z-40 w-full text-white bg-blue-500 hover:bg-primary-700 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800">
            Save
          </button>
          <button onClick={onClose} type="button" className="z-40 w-full text-white bg-red-600 hover:bg-red-700 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-red-600 dark:hover:bg-red-700 dark:focus:ring-red-800 mt-3">
            Cancel
          </button>
        </form>
      </div>
    </section>
  );
};
