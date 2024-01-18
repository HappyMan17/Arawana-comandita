import { response } from "express";
import { DaySummaryModel } from "../models/DaySummaryModel.js";
import { daySummaryMapper } from "../mappers/daySummary.js";

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

export const createSummary = async (req, res = response) => {
  try {
    // db save summary
    const summary = new DaySummaryModel(daySummaryMapper(req.body));
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

export const updateSummary = async (req, res = response) => {
  try {
    const newSummary = daySummaryMapper(req.body);
    // db save summary
    const summary = await DaySummaryModel.findOneAndUpdate(
      { _id: req.body.id },
      { $set:
        {
          date: newSummary.name,
          total: newSummary.total,
          comment: newSummary.comment,
          uid: newSummary.uid,
          tables: newSummary.plates,
        }
      },
      { new: true },
    );

    if (!summary) {
      return res.status(400).json({
        ok: false,
        message: 'Missing field',
      });
    }

    res.status(201).json({
      ok: true,
      summary: {
        id: summary.id,
        date: summary.name,
        total: summary.total,
        comment: summary.comment,
        uid: summary.uid,
        tables: summary.plates,
      },
    });

  } catch (error) {
    res.status(500).json({
      ok: false,
      message: 'Please talk with your administrator',
    });
  }
};

export const deletSummary = async (req, res = response) => {
  try {
    const summaryId = req.params.id;
    // db save summary
    const table = await DaySummaryModel.findOneAndDelete(
      { _id: summaryId },
    );

    if (!table) {
      return res.status(400).json({
        ok: false,
        message: 'Missing field',
      });
    }

    res.status(201).json({
      ok: true,
      summary: {
        id: summaryId,
      },
    });

  } catch (error) {
    res.status(500).json({
      ok: false,
      message: 'Please talk with your administrator',
    });
  }
};
