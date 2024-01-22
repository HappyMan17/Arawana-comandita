/* eslint-disable max-len */
import { useEffect, useState } from "react";
import { DatePicker, DaySummaryCard } from "../../components";
import { useDaySummary } from "../../hooks";
import { getDate } from "../../helpers";

export const Summary = () => {
  const { daySummaries, startGetingDaySummary } = useDaySummary();
  const [filter, setFilter] = useState<Date | null>(null);

  const onChangeDate = (date: Date) => {
    setFilter(date);
  };

  useEffect(() => {
    const init = getDate();
    const end = getDate(30, '+');
    startGetingDaySummary({
      init: init.toISOString(),
      end: end.toISOString(),
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  return (
    <section>
      <h1 className="w-full font-semibold text-4xl mb-10">
        Summaries
      </h1>
      <div className="w-full">
        <DatePicker date={filter} onChangeDate={onChangeDate} />
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
    </section>
  );
};
