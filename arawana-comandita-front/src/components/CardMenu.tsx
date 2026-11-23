/* eslint-disable max-len */
import { useState } from 'react';

interface CardMenuProps {
  label: string;
  onEdit: () => void;
  onDelete: () => void;
}

// ⋮ menu with Edit / Delete, shared by the table and product cards
export const CardMenu: React.FC<CardMenuProps> = ({ label, onEdit, onDelete }) => {
  const [isOpen, setIsOpen] = useState(false);

  const run = (action: () => void) => {
    setIsOpen(false);
    action();
  };

  return (
    <div className="relative">
      <button
        onClick={() => setIsOpen(open => !open)}
        aria-label={`Options for ${label}`}
        aria-expanded={isOpen}
        className="w-10 h-10 flex items-center justify-center rounded-lg text-gray-500 hover:bg-gray-100 dark:text-gray-400 dark:hover:bg-gray-700"
      >
        <svg className="w-5 h-5" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 4 16">
          <path d="M2 4a2 2 0 1 0 0-4 2 2 0 0 0 0 4Zm0 6a2 2 0 1 0 0-4 2 2 0 0 0 0 4Zm0 6a2 2 0 1 0 0-4 2 2 0 0 0 0 4Z"/>
        </svg>
      </button>
      {
        isOpen && (
          <ul className="absolute right-0 z-20 mt-1 w-36 py-1 text-sm bg-white rounded-lg shadow-lg border border-gray-200 dark:bg-gray-700 dark:border-gray-600">
            <li>
              <button onClick={() => run(onEdit)} className="w-full text-left px-4 py-2 text-gray-700 hover:bg-gray-100 dark:text-gray-200 dark:hover:bg-gray-600">
                Edit
              </button>
            </li>
            <li>
              <button onClick={() => run(onDelete)} className="w-full text-left px-4 py-2 text-red-600 hover:bg-gray-100 dark:text-red-400 dark:hover:bg-gray-600">
                Delete
              </button>
            </li>
          </ul>
        )
      }
    </div>
  );
};
