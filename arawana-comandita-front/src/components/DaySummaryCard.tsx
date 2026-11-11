/* eslint-disable max-len */
import { useState } from "react";
import { DaySummary } from "../types";
import { convertToCurrency, generatePDF, getDateFormat } from "../helpers";
import { PdfGenerator } from ".";

interface DropdownState {
  [key: string]: {
    isShown: boolean;
  }
}

interface DaySummaryCardProps {
  summary: DaySummary;
}

export const DaySummaryCard: React.FC<DaySummaryCardProps> = ({ summary }) => {
  const [showDate, setShowDate] = useState<DropdownState>({});
  const { id, total, tables } = summary;

  const onDropdownClick = () => {
    setShowDate((prevState) => ({
      ...prevState,
      [id!]: {
        isShown:!prevState[id!]?.isShown && true,
      },
    }));
  };

  const onDownloadPdf = () => {
    if (summary && summary.tables.length > 0) {
      generatePDF(summary);
    }
  };

  return (
    <section className="relative my-3">
      <button onClick={onDropdownClick} className="w-full min-w-36 text-left pl-5 py-5 bg-gray-500 text-white font-semibold" >
        <h1 className="text-2xl"> { getDateFormat(new Date(summary.date)) } </h1>
      </button>
      {
        showDate[id!]?.isShown ? (
          <svg className="absolute right-6 top-6 w-6 h-6 text-white dark:text-white" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
            <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="m5 15 7-7 7 7"/>
          </svg>
        ) : (
          <svg className="absolute right-6 top-6 w-6 h-6 text-white dark:text-white" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
            <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="m19 9-7 7-7-7"/>
          </svg>
        )
      }
      <PdfGenerator onClick={onDownloadPdf} />
      <div className={`${showDate[id!]?.isShown ? '' : 'hidden'} w-full bg-gray-200 p-10`} >
        <h1 className="text-xl"> Total of Day: { convertToCurrency(total) } </h1>
        {
          tables.map((table, index) => {
            return (
              <section key={`${table.id}_${index}`}>
                <hr className="h-px my-8 bg-gray-200 border-0 dark:bg-gray-700"></hr>
                <h1 className="truncate text-xl"> { table.name.toUpperCase() } </h1>
                {
                  // index in key: older summaries stored plates with id null, and this list is read-only
                  table.plates.map((plate, index) => {
                    return (
                      <section key={`${plate.id}_${index}`}>
                        <h1 className="truncate text-lg ml-5">
                          -{ plate.name.toUpperCase() }:
                        </h1>
                        <h1 className="truncate text-lg ml-10">
                          { convertToCurrency(plate.price) } x{ plate.quantity } = { convertToCurrency(plate.price * (plate.quantity ?? 1)) }
                        </h1>
                      </section>
                    );
                  })
                }
                <h1 className="text-lg my-10">
                  Total Table: { convertToCurrency(table.total) }
                </h1>
              </section>
            );
          })
        }
      </div>
    </section>
  );
};
