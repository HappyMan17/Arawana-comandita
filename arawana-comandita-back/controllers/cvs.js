/*
  Auth routes
  host + /api/cvs/
*/

import constants from '../config/constants.js';
import {
  addRow,
  checkFileExists,
  convertToCurrency,
  createWorkbook,
  excelSerialDateToJSDate,
  readWorkbook,
} from '../helpers/cvsHelper.js';
import { DaySummaryModel } from '../models/DaySummaryModel.js';

const daysOfWeek = ['Domingo', 'Lunes', 'Martes', 'Miércoles', 'Jueves', 'Viernes', 'Sábado'];
const summarySheetName = 'Summary';

const bookName = constants.BOOKNAME;

export const createCvs = async (req, res) => {
  try {
    // workbook:
    let workbook = null;

    if (await checkFileExists(bookName)) {
      return res.status(200).json({
        ok: true,
        message: 'File already exists',
      });
    }
    const daySummaries = await DaySummaryModel.find({
      uid: req.uid,
    }).sort({ date: 1 }).exec();

    if (!daySummaries || daySummaries.length === 0) {
      return res.status(200).json({
        ok: true,
        message: 'Day summaries not found',
      });
    }

    const rows = [];
    daySummaries.forEach((daySummary) => {
      createSummaryRow(daySummary, rows);
    });

    workbook = createWorkbook(rows, summarySheetName, bookName);

    // add the final summary to the sheet
    if (!workbook) {
      return res.status(200).json({
        ok: true,
        message: 'workingbook not created',
      });
    }

    res.status(200).json({
      ok: true,
      message: 'File created',
    });
  } catch (error) {
    res.status(500).json({
      ok: false,
      message: 'Please talk to your administrator',
    });
  }
};

export const updateCvsFile = async (req, res) => {
  if (!await checkFileExists(bookName)) {
    return res.status(200).json({
      ok: true,
      message: 'File does not exists',
    });
  }

  const { workbook, workSheets } = await readWorkbook(bookName);

  const summaries = workSheets[summarySheetName];
  const lastSummary = summaries[summaries.length - 1];

  const daySummaries = await DaySummaryModel.find({
    uid: req.uid,
    date: { $gt: excelSerialDateToJSDate(lastSummary.fecha) }
  }).sort({ date: 1 }).exec();

  if (!daySummaries || daySummaries.length === 0) {
    return res.status(200).json({
      ok: true,
      message: 'No new Day summaries found',
    });
  }

  const rows = [];
  daySummaries.forEach((daySummary) => {
    createSummaryRow(daySummary, rows);
  });

  // update sheet
  rows.forEach((row) => summaries.push(row));
  addRow(workbook, summaries, summarySheetName, bookName);


  return res.status(200).json({
    ok: true,
    message: 'route working',
  });
};

/**
 * Void function to convert summaries into excel rows
 * @param {*} daySummary
 * @param {*} rows An array to store the rows
 */
const createSummaryRow = (daySummary, rows) => {
  const { tables, date } = daySummary;
  const day = date.getDay(); // number of the day

  for (const table of tables) {
    for (const plate of table.plates) {
      // console.log({ plate, quantity: plate['quantity'] });
      rows.push({
        fecha: date,
        item: plate.name,
        quantity: plate.quantity,
        valor: convertToCurrency(plate.price ?? 0),
        dia: daysOfWeek[day],
      });
    }
  }
};

export const getSummaryFile = async (req, res) => {
  const filePath = constants.ABSOLUTE_FILE_PATH;

  res.sendFile(filePath, (err) => {
    if (err) {
      console.error('Error sending file:', err);
      res.status(err.status).end();
    } else {
      console.log('File sent successfully:', 'absolute');
    }
  });
};
