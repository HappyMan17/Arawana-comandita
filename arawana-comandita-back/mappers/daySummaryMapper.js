import { getTotal } from "../helpers/getTotal.js";

export const daySummaryMapper = (object) => {
  const {
    date,
    comment,
    uid,
    tables,
  } = object;

  // table list and total key
  const total = getTotal(tables, 'total');

  return {
    date: new Date(date),
    total,
    comment,
    uid,
    tables,
  };
};
