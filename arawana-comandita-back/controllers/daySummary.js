import { response } from "express";
import { DaySummaryModel } from "../models/DaySummaryModel.js";
import { getCurrentDaySummary } from "../helpers/summaryHelper.js";
import { getTotal } from "../helpers/getTotal.js";

//? all filtered
export const getUserSummary = async (req, res) => {
  try {
    const { init, end } = req.body.filter;
    const daySummaries = await DaySummaryModel.find({
      uid: req.uid,
      date: { $gte: new Date(init), $lte: new Date(end) },
    }).exec();
    if (!daySummaries) {
      return res.status(500).json({
        ok: false,
        message: 'No day summary not found',
      });
    }

    res.status(201).json({
      ok: true,
      daySummaries: daySummaries.map(summary => ({
        id: summary.id,
        date: summary.date,
        total: summary.total,
        comment: summary.comment,
        uid: summary.uid,
        tables: summary.tables,
      }))
    });
  } catch (error) {
    res.status(500).json({
      ok: false,
      message: 'Please talk with your administrator',
    });
  }
};

//? Current day summary
export const getCurrentSummary = async (req, res) => {
  try {
    // filter now - 5 days
    const currentDaySummary = await getCurrentDaySummary(req.uid);

    if (currentDaySummary) {
      return res.status(201).json({
        ok: true,
        summary: {
          id: currentDaySummary.id,
          date: currentDaySummary.date,
          total: currentDaySummary.total,
          comment: currentDaySummary.comment,
          uid: currentDaySummary.uid,
          tables: currentDaySummary.tables,
        },
      });
    }
    // if it doesn't exist, create it
    const summary = new DaySummaryModel({
      date: new Date(),
      total: 0,
      comment: '',
      uid: req.uid,
      tables: [],
    });
    await summary.save();

    res.status(201).json({
      ok: true,
      summary: {
        id: summary.id,
        date: summary.date,
        total: summary.total,
        comment: summary.comment,
        uid: summary.uid,
        tables: summary.tables,
      },
    });
  } catch (error) {
    res.status(500).json({
      ok: false,
      message: 'Please talk with your administrator',
    });
  }
};

export const getSummary = async (req, res) => {
  try {
    const summary = await DaySummaryModel.findById(req.params.id).exec();
    if (!summary) {
      return res.status(500).json({
        ok: false,
        message: 'Day summary not found',
      });
    }

    res.status(201).json({
      ok: true,
      summary: {
        id: summary.id,
        date: summary.date,
        total: summary.total,
        comment: summary.comment,
        uid: summary.uid,
        tables: summary.tables,
      },
    });
  } catch (error) {
    res.status(500).json({
      ok: false,
      message: 'Please talk with your administrator',
    });
  }
};

export const addToDaySummary = async (req, res = response) => {
  try {
    let tables = req.body.tables;
    tables = tables.map(table => {
      const total = getTotal(table.plates, 'price');
      table.total = total;
      return table;
    });

    // adding table to summary
    const summary = await DaySummaryModel.findByIdAndUpdate(
      req.body.id,
      { $set:
        {
          tables: tables,
          total: getTotal(tables, 'total'),
        }
      },
      { new: true },
    );
    res.status(201).json({
      ok: true,
      summary: {
        id: summary.id,
        date: summary.date,
        total: summary.total,
        comment: summary.comment,
        uid: summary.uid,
        tables: summary.tables,
      },
    });

  } catch (error) {
    res.status(500).json({
      ok: false,
      message: 'Please talk with your administrator',
    });
  }
};

//? i think delete is not neccessary
// export const deleteSummary = async (req, res = response) => {
//   try {
//     const summaryId = req.params.id;
//     // db save summary
//     const table = await DaySummaryModel.findByIdAndDelete(
//       summaryId,
//     );

//     if (!table) {
//       return res.status(400).json({
//         ok: false,
//         message: 'Missing field',
//       });
//     }

//     res.status(201).json({
//       ok: true,
//       summary: {
//         id: summaryId,
//       },
//     });

//   } catch (error) {
//     res.status(500).json({
//       ok: false,
//       message: 'Please talk with your administrator',
//     });
//   }
// };
