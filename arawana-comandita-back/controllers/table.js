import { response } from "express";
import { TableModel } from "../models/TableModel.js";
import { tableMapper } from "../mappers/tableMapper.js";

export const getTables = async (req, res) => {
  try {
    const table = await TableModel.findById(req.params.id).exec();
    if (!table) {
      return res.status(500).json({
        ok: false,
        message: 'Table not found',
      });
    }

    res.status(201).json({
      ok: true,
      table: {
        id: table.id,
        name: table.name,
        total: table.total,
        comment: table.comment,
        uid: table.uid,
        plates: table.plates,
      },
    });
  } catch (error) {
    res.status(500).json({
      ok: false,
      message: 'Please talk with your administrator',
    });
  }
};

export const createTable = async (req, res = response) => {
  try {
    // db save table
    const table = new TableModel(tableMapper(req.body));
    await table.save();

    res.status(201).json({
      ok: true,
      table: {
        id: table.id,
        name: table.name,
        total: table.total,
        comment: table.comment,
        uid: table.uid,
        plates: table.plates,
      },
    });

  } catch (error) {
    res.status(500).json({
      ok: false,
      message: 'Please talk with your administrator',
    });
  }
};

export const updateTable = async (req, res = response) => {
  try {
    const newTable = tableMapper(req.body);
    // db save plate
    const table = await TableModel.findOneAndUpdate(
      { _id: req.body.id },
      { $set:
        {
          name: newTable.name,
          total: newTable.total,
          comment: newTable.comment,
          uid: newTable.uid,
          plates: newTable.plates,
        }
      },
      { new: true },
    );

    if (!table) {
      return res.status(400).json({
        ok: false,
        message: 'Missing field',
      });
    }

    res.status(201).json({
      ok: true,
      table: {
        id: table.id,
        name: table.name,
        total: table.total,
        comment: table.comment,
        uid: table.uid,
        plates: table.plates,
      },
    });

  } catch (error) {
    res.status(500).json({
      ok: false,
      message: 'Please talk with your administrator',
    });
  }
};

export const deletTable = async (req, res = response) => {
  try {
    const tableId = req.params.id;
    // db save plate
    const table = await TableModel.findOneAndDelete(
      { _id: tableId },
    );

    if (!table) {
      return res.status(400).json({
        ok: false,
        message: 'Missing field',
      });
    }

    res.status(201).json({
      ok: true,
      table: {
        id: tableId,
      },
    });

  } catch (error) {
    res.status(500).json({
      ok: false,
      message: 'Please talk with your administrator',
    });
  }
};
