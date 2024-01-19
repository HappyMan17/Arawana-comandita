/* eslint-disable max-len */

import { useState } from "react";
import { Table } from "../types";

interface TableFormProps {
  onClose: () => void;
  onSave: (table: Table) => void;
  title: string;
  table: Table | null;
}

const initForm: Table = {
  name: "",
  total: 0,
  comment: "",
  uid: "",
  plates: []
};

export const TableForm: React.FC<TableFormProps> = ({ onClose, table, title, onSave }) => {
  const [formState, setFormState] = useState(table ?? initForm);

  const onChangeValue = ({ target }: any) => {
    const { name, value } = target;

    if (name === 'price') {
      const price = parseInt(value, 10);
      return setFormState(prevState => ({
        ...prevState,
        price: price ?? 0,
      }));
    }

    setFormState(prevState => ({
      ...prevState,
      [name]: value,
    }));
  };

  return (
    <section className="absolute top-0 left-0 z-50 flex items-center justify-center w-full h-full bg-zinc-600 bg-opacity-80">
      <div className="bg-white w-96 h-1/2 flex flex-col justify-center items-center pb-3 rounded-xl">
        <h1 className="mb-2 text-2xl font-bold tracking-tight text-black"> { title } </h1>
        <form className="p-3 w-80 bg-white" action="#" onSubmit={() => null}>
          <div>
            <label className="block mb-2 text-sm font-medium text-gray-900">
              Table Name:
              <input value={formState.name} onChange={onChangeValue} type="text" name="name" id="name" className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5" placeholder="Table 1" required />
            </label>
          </div>
          <div>
            <label className="block mb-2 text-sm font-medium text-gray-900">
              Description:
              <input value={formState.comment} onChange={onChangeValue} type="text" name="comment" id="comment" placeholder="Besides the bathroom" className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5" required />
            </label>
          </div>
          <button onClick={() => onSave(formState)} type="button" className="w-full text-white bg-blue-500 hover:bg-primary-700 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800">
            Save
          </button>
          <button onClick={onClose} type="button" className="w-full text-white bg-red-600 hover:bg-red-700 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-red-600 dark:hover:bg-red-700 dark:focus:ring-red-800 mt-3">
            Cancel
          </button>
        </form>
      </div>
    </section>
  );
};
