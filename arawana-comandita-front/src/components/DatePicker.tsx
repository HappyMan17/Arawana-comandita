/* eslint-disable max-len */
import { getDateFormat } from "../helpers";

interface DatePickerProps {
  date: Date | null;
  onChangeDate: (date: Date) => void;
}

export const DatePicker: React.FC<DatePickerProps> = ({ date, onChangeDate }) => {
  const defaultDate = new Date();
  defaultDate.setDate(defaultDate.getDate() - 5);

  const onChangePickerDate = (event: any) => {
    const { target } = event;
    if (target.value) {
      const selectedDate = new Date(target.value);
      selectedDate.setDate(selectedDate.getDate() + 1);
      onChangeDate(selectedDate);
    }
  };

  return (
    <div className="max-w-sm min-w-[300px]">
      {/* <div className="absolute inset-y-0 start-0 flex items-center ps-3 pointer-events-none">
        <svg className="w-4 h-4 text-gray-500 dark:text-gray-400" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 20 20">
          <path d="M20 4a2 2 0 0 0-2-2h-2V1a1 1 0 0 0-2 0v1h-3V1a1 1 0 0 0-2 0v1H6V1a1 1 0 0 0-2 0v1H2a2 2 0 0 0-2 2v2h20V4ZM0 18a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2V8H0v10Zm5-8h10a1 1 0 0 1 0 2H5a1 1 0 0 1 0-2Z"/>
        </svg>
      </div> */}
      <input type="date" min="2024-01-01" max={getDateFormat(new Date())} value={getDateFormat(date ?? defaultDate)} onChange={onChangePickerDate} className="flex-wrap text-start border-solid text-sm rounded-lg p-2 block w-full min-w-36 bg-gray-50 border border-gray-300 text-gray-900 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-500 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" />
    </div>
  );
};
