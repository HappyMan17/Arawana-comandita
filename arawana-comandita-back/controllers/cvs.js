/*
  Auth routes
  host + /api/cvs/
*/

import {
  checkFileExists,
  convertToCurrency,
  createWorkbook,
} from '../helpers/cvsHelper.js';
import { DaySummaryModel } from '../models/DaySummaryModel.js';

const daysOfWeek = ['Domingo', 'Lunes', 'Martes', 'Miércoles', 'Jueves', 'Viernes', 'Sábado'];

export const createCvs = async (req, res) => {
  try {
    // const plates = await PlateModel.find({ uid: req.uid }).exec();
    // const plates = await PlateModel.find({ uid: '65a697d3cbfe2674c725a3aa' }).exec();
    const bookName = './assets/files/test.xlsx';
    // workbook:
    let workbook = null;
    // const initDate = '2021-01-01';

    if (await checkFileExists(bookName)) {
      return res.status(200).json({
        ok: true,
        message: 'File already exists',
      });
    }
    const daySummaries = await DaySummaryModel.find({
      uid: req.uid,
      // date: { $gte: new Date(initDate) },
    }).exec();

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
    console.log({ rows });

    workbook = createWorkbook(rows, 'Plates', bookName);

    // add the final summary to the sheet
    if (!workbook) {
      return res.status(200).json({
        ok: true,
        message: 'workingbook not created',
      });
    }


    // to update
    // XLSX.utils.sheet_add_json(workbook.Sheets['Sheet1'], sheet);
    // XLSX.writeFile(workbook, 'test.xlsx');

    // Verify if the cvs file already exist and create it if it does not
    // https://builtin.com/software-engineering-perspectives/exceljs
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
      console.log({ plate, quantity: plate['quantity'] });
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
