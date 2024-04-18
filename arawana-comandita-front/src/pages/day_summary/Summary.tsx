/* eslint-disable max-len */
import { useEffect, useState } from "react";
import { DatePicker, DaySummaryCard, Loader } from "../../components";
import { useDaySummary } from "../../hooks";
import { getDate } from "../../helpers";

export const Summary = () => {
  const {
    daySummaries,
    startGetingDaySummary,
    isLoading,
    getSummaryFile,
  } = useDaySummary();
  const [filter, setFilter] = useState<Date | null>(null);

  const onChangeDate = (date: Date) => {
    setFilter(date);
  };

  const downloadSummary = () => {
    // todo: download summary
    getSummaryFile();
    return null;
  };

  useEffect(() => {
    const init = filter ?? getDate();
    const end = getDate(30, '+');
    startGetingDaySummary({
      init: init.toISOString(),
      end: end.toISOString(),
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [filter]);
  return (
    <section>
      <h1 className="w-full font-semibold text-4xl mb-10">
        Summaries
      </h1>
      <div onClick={downloadSummary} className="w-full flex flex-row justify-between ">
        <DatePicker date={filter} onChangeDate={onChangeDate} />
        <div className="border p-2 rounded-lg cursor-pointer border-gray-300 dark:border-gray-500 bg-white dark:bg-gray-500">
          <svg  xmlns="http://www.w3.org/2000/svg"  width="24"  height="24"  viewBox="0 0 24 24"  fill="none"  stroke="currentColor"  strokeWidth="2"  strokeLinecap="round"  strokeLinejoin="round"  className="icon icon-tabler icons-tabler-outline icon-tabler-file-spreadsheet text-green-700 dark:text-green-500">
            <path stroke="none" d="M0 0h24v24H0z" fill="none"/><path d="M14 3v4a1 1 0 0 0 1 1h4" />
            <path d="M17 21h-10a2 2 0 0 1 -2 -2v-14a2 2 0 0 1 2 -2h7l5 5v11a2 2 0 0 1 -2 2z" />
            <path d="M8 11h8v7h-8z" />
            <path d="M8 15h8" />
            <path d="M11 11v7" />
          </svg>
        </div>
      </div>
      {/* New component, needs an id in the click and className */}
      {(daySummaries.length === 0 || !daySummaries) && (
        <h1 className="text-2xl mt-20 font-bold w-full text-center"> No summaries created yet. </h1>
      )}
      <div>
        {
          daySummaries.map(summary => {
            return (
              <DaySummaryCard summary={summary} key={summary.id} />
            );
          })
        }
      </div>
      {
        isLoading && (
          <Loader />
        )
      }
    </section>
  );
};
