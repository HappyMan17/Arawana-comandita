import { DaySummaryModel } from "../models/DaySummaryModel.js";

export const initFilter = new Date(new Date().getDate()-5);

export const getCurrentDaySummary = async (uid, filter = initFilter) => {
  try {
    const daySummaries = await DaySummaryModel.find({
      uid,
      date: { $gte: new Date(filter) },
    }).exec();
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
