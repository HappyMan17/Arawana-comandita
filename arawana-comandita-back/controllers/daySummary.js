import { response } from "express";
import { DaySummaryModel } from "../models/DaySummaryModel.js";
import { daySummaryMapper } from "../mappers/daySummaryMapper.js";
import { getCurrentDaySummary } from "../helpers/summaryHelper.js";

export const getUserSummary = async (req, res) => {
  try {
    const daySummaries = await DaySummaryModel.find({ uid: req.uid }).exec();
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

// Current day summary
export const getCurrentSummary = async (req, res) => {
  try {
    const currentDaySummary = await getCurrentDaySummary(req.uid);

    if (!currentDaySummary) {
      return res.status(500).json({
        ok: false,
        message: 'No day summary not found',
      });
    }

    res.status(201).json({
      ok: true,
      daySummary: {
        id: currentDaySummary.id,
        date: currentDaySummary.date,
        total: currentDaySummary.total,
        comment: currentDaySummary.comment,
        uid: currentDaySummary.uid,
        tables: currentDaySummary.tables,
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
    const summary = await DaySummaryModel.findByIdAndUpdate(
      req.body.id,
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

export const deleteSummary = async (req, res = response) => {
  try {
    const summaryId = req.params.id;
    // db save summary
    const table = await DaySummaryModel.findByIdAndDelete(
      summaryId,
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

export const addToDaySummary = async (req, res = response) => {
  try {
    const currentDaySummary = await getCurrentDaySummary(req.uid);

    // update
    if (currentDaySummary) {
      // adding table to summary
      const summary = await DaySummaryModel.findByIdAndUpdate(
        currentDaySummary.id,
        { $set:
          {
            tables: req.body.tables,
          }
        },
        { new: true },
      );
      return res.status(201).json({
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
    }

    // if it doesn't exist, create it
    const summary = new DaySummaryModel({
      date: new Date(),
      comment: '',
      uid: req.uid,
      tables: req.body.tables,
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
