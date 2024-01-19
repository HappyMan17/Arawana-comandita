/* eslint-disable max-len */
import localImage from '../assets/newTable.png';
import { ModalType, Table } from '../types';

interface TableCardProps {
  table: Table;
  showFormModal: (title: string, type: ModalType, id: string | null) => void;
  removeTable: (id: string | null) => void;
}

export const TableCard: React.FC<TableCardProps> = ({ table, showFormModal, removeTable }) => {
    const { name, comment, plates, total } = table;
    const COP = new Intl.NumberFormat('es-CO', {
      style: 'currency',
      currency: 'COP',
    });
    return (
        <div className="relative max-w-sm bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700">
            <div className="flex item-center justify-start">
                <img className="rounded-t-lg" src={localImage} alt="" />
            </div>
            <div className="p-5">
                <h5 className="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">{ name }</h5>
                <p className="mb-3 font-normal text-gray-700 dark:text-gray-400">
                    { comment }
                </p>
                {/* Product list */}
                <div className="flex flex-wrap">
                    {
                        plates.map(item => {
                            return (
                                <a href="#" className="my-1 mx-1 inline-flex items-center px-3 py-2 text-sm font-medium text-center text-white bg-gray-400 rounded-lg hover:bg-gray-500 focus:ring-4 focus:outline-none focus:ring-blue-300 dark:bg-gray-600 dark:hover:bg-gray-700 dark:focus:ring-blue-800" key={item.name} >
                                    { item.name }
                                </a>
                            );
                        })
                    }
                </div>
                <p className="mb-3 font-normal text-gray-700 dark:text-gray-400">
                    Total: { COP.format(total) }
                </p>
                {/* add product */}
                <div className="flex flex-wrap justify-between mt-2">
                    {/* modify table */}
                    <button onClick={() => showFormModal('Modify Table', 'Modify', table.id ?? null)} className="absolute top-3 left-3 w-auto inline-flex items-center px-3 py-2 text-sm font-medium text-center text-white bg-blue-400 rounded-lg hover:bg-blue-500 focus:ring-4 focus:outline-none focus:ring-blue-300 dark:bg-transparent dark:hover:bg-blue-400 dark:focus:ring-blue-800">
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
                    <button onClick={() => removeTable(table.id ?? null)} className="w-full mt-3 inline-flex items-center px-3 py-2 text-sm font-medium text-center text-white bg-blue-700 rounded-lg hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">
                        New Service
                    </button>
                    <button onClick={() => removeTable(table.id ?? null)} className="w-full mt-3 inline-flex items-center px-3 py-2 text-sm font-medium text-center text-white bg-red-700 rounded-lg hover:bg-red-800 focus:ring-4 focus:outline-none focus:ring-blue-300 dark:bg-red-600 dark:hover:bg-red-700 dark:focus:ring-red-800">
                        End Service
                    </button>
                </div>
            </div>
        </div>
    );
};

