import { DaySummaryModel } from "../models/DaySummaryModel.js";

export const getCurrentDaySummary = async (uid, filter) => {
  try {
    const date = new Date();
    date.setDate(date.getDate() - 5);
    const daySummaries = await DaySummaryModel.find({
      uid,
      date: { $gte: filter ?? date },
    }).exec();
    if (!daySummaries) {
      return null;
    }

    const currentDaySummary = daySummaries.find(daySummary => {
      // console.log({ daySummary, date: daySummary.date });
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
  const month = date.getMonth() + 1;
  const day = date.getDay();

  return `${year}/${month}/${day}`;
};
