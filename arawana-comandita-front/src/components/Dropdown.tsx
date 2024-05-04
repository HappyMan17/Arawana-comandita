/* eslint-disable max-len */
import { useState } from "react";

interface DropdownProps {
  defaultValue: string,
  values: {name: string}[],
  onChange: (value: string) => void,
}

export const Dropdown: React.FC<DropdownProps> = ({ defaultValue, values, onChange }) => {
  const [isDropdownShown, setIsDropdownShown] = useState(false);

  const onClick = () => {
    setIsDropdownShown(prevState => !prevState);
  };

  const onChangeDropdownValue = (event: any) => {
    setIsDropdownShown(prevState => !prevState);
    const value = event.target.lastChild.data ?? defaultValue;
    onChange(value);
  };

  return (
    <div className={`${values.length > 0 ? '' : 'hidden'} relative w-full mb-3`} >
      <button id="dropdownDefaultButton" onClick={onClick} data-dropdown-toggle="dropdown" className="text-white bg-blue-600 hover:bg-blue-800 focus:outline-none font-medium rounded-lg text-sm px-5 py-2.5 text-center inline-flex items-center dark:bg-blue-600 dark:hover:bg-blue-700" type="button">
        { defaultValue }
        <svg className="w-2.5 h-2.5 ms-3" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 10 6">
          <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="m1 1 4 4 4-4"/>
        </svg>
      </button>

      {/* Dropdown menu */}
      <div id="dropdown" className={`${isDropdownShown ? '' : 'hidden'} absolute mt-1 z-50 bg-white divide-y divide-gray-100 rounded-lg shadow w-44 dark:bg-gray-700`}>
        <ul className="py-2 text-sm text-gray-700 dark:text-gray-200" aria-labelledby="dropdownDefaultButton">
          {
            values.map((item: any) => {
              return (
                <li onClick={onChangeDropdownValue} key={item.name} >
                  <a className="block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white">
                    { item.name }
                  </a>
                </li>
              );
            })
          }
        </ul>
      </div>
    </div>
  );
};
