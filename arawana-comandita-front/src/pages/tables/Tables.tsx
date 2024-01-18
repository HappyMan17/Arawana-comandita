/* eslint-disable max-len */
import { useState } from "react";
import { TableCard } from "../../components";
import { ModalType, ModalState } from "../../types";

const productNames = ['carne', 'pollo', 'caldo'];

export const Tables = () => {
    // todo remove table param id and dispatch with filter
    // todo modal to add product
    const [modalValues, setModalValues] = useState<ModalState>({
      isShown: false,
      title: '',
      type: 'Create'
    });

    const showFormModal = (title: string, type: ModalType) => {
      setModalValues({ isShown: true, title, type });
    };

    const closeFormModal = () => {
      setModalValues(prevState => ({
        ...prevState,
        isShown: false
      }));
    };

    const removePlate = () => {
        //todo remove plate
        console.log('remove');
    };
    return (
        <>
            <h1 className="w-full font-semibold text-4xl">
                Tables
            </h1>
            <section className="grid grid-cols-1 sm:grid-cols-3 grid-flow-row gap-4 mt-10">
                <TableCard image={null} food={productNames} name={'Table 1'} comment={'In front of the door'} />
                <button onClick={() => showFormModal('Create Plate', 'Create')} className="flex justify-center items-center max-w-sm bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:hover:bg-gray-900 dark:border-gray-700">
                  <svg className="w-8 h-8 text-gray-800 dark:text-white" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 18 18">
                    <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 1v16M1 9h16"/>
                  </svg>
                </button>
            </section>
            {
              modalValues.isShown && (
                <h1>Form</h1>
              )
            }
        </>
    );
};
