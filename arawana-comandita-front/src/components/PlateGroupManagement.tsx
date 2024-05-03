/* eslint-disable max-len */
import { useState } from "react";
import { Dropdown } from ".";
import { PlateGroup } from "../types";

interface PlateGroupManagementProp {
  plateGroup: PlateGroup[];
  groupInputValue: string;
  onChangeInput: (value: any) => void;
  onSavePlateGroup: () => void;
  onDeletePlateGroup: () => void;
}

export const PlateGroupManagement: React.FC<PlateGroupManagementProp> = ({
  plateGroup,
  groupInputValue,
  onSavePlateGroup,
  onDeletePlateGroup,
  onChangeInput
}) => {
  const [dropdownValue, setDropdownValue] = useState('');

  const onChangeInputValue = (event: any) => {
    const value = event.target.value ?? '';
    onChangeInput(value);
  };

  const onChangeDropdown = (value: string) => {
    setDropdownValue(value);
    onChangeInput(value);
  };

  const onRemovePlateGroup = () => {
    setDropdownValue(plateGroup[0]?.name);
    onChangeInput('');
    onDeletePlateGroup();
  };

  return (
    <section className="absolute top-20 right-6 flex flex-row items-center min-w-[100px]">
      <div className="relative mt-2">
        <Dropdown defaultValue={ dropdownValue ? dropdownValue : plateGroup[0]?.name } onChange={onChangeDropdown} values={plateGroup} />
      </div>
      <div className="min-w-[150px]" >
        {/* <label className="m-0 border border-1"> Plate group: </label> */}
        <input
          id="plateGroup"
          value={groupInputValue}
          onChange={onChangeInputValue}
          type={'text'}
          className="h-[40px] w-[130px] border border-gray-500 rounded-md mx-4 p-1" placeholder="Write a group" />
      </div>
      <div>
        <button onClick={onSavePlateGroup} className="min-w-14 min-h-[40px] rounded-md p-1 mx-1 bg-blue-600 text-white">Add</button>
        <button onClick={onRemovePlateGroup} className="min-w-14 min-h-[40px] rounded-md p-1 mx-1 mt-2 sm:mt-0 bg-red-600 text-white">Remove</button>
      </div>
    </section>
  );
};
