import { DaySummaryModel } from "../models/DaySummaryModel.js";

export const getCurrentDaySummary = async (uid) => {
  try {
    const daySummaries = await DaySummaryModel.find({ uid }).exec();
    if (!daySummaries) {
      return null;
    }

    const currentDaySummary = daySummaries.find(daySummary => {
      console.log({ daySummary, date: daySummary.date });
      return getDate(daySummary.date) === getDate(new Date());
    });

    return currentDaySummary;
  } catch (error) {
    return null;
  }
};

const getDate = (date) => {
  if (!date) {
    return null;
  }
  const year = date.getFullYear();
  const month = date.getMonth();
  const day = date.getDay();

  console.log({ dateFn: `${year}/${month}/${day}` });
  return `${year}/${month}/${day}`;
};
