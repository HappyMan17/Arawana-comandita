/*
  Auth routes
  host + /api/cvs/
*/

import fs from 'fs/promises';
import XLSX from 'xlsx';
import { DaySummaryModel } from '../models/DaySummaryModel.js';

export const getCvs = async (req, res) => {
  try {
    // const plates = await PlateModel.find({ uid: req.uid }).exec();
    // const plates = await PlateModel.find({ uid: '65a697d3cbfe2674c725a3aa' }).exec();
    const bookName = './assets/files/test.xlsx';
    // workbook:
    let workbook = null;

    if (await checkFileExists(bookName)) {
      workbook = XLSX.readFile(bookName);
    } else {
      workbook = createWorkbook([], 'Plates', bookName);
    }

    if (!workbook) {
      return res.status(200).json({
        ok: true,
        message: 'workingbook not found',
      });
    }
    const initDate = '2021-01-01';

    const daySummaries = await DaySummaryModel.find({
      uid: req.uid,
      date: { $gte: new Date(initDate) },
    }).exec();

    if (!daySummaries || daySummaries.length === 0) {
      return res.status(200).json({
        ok: true,
        message: 'No data created yet',
      });
    }


    // to update
    // XLSX.utils.sheet_add_json(workbook.Sheets['Sheet1'], sheet);
    // XLSX.writeFile(workbook, 'test.xlsx');

    // Verify if the cvs file already exist and create it if it does not
    // https://builtin.com/software-engineering-perspectives/exceljs
    res.status(200).json({
      ok: true,
      message: 'route working',
    });
  } catch (error) {
    res.status(500).json({
      ok: false,
      message: 'Please talk to your administrator',
    });
  }
};

const readWorkbook = (workbook) => {
  let workSheets = {};

  for (const sheetName of workbook.SheetNames) {
    const sheet = workbook.Sheets[sheetName];
    const sheetData = XLSX.utils.sheet_to_json(sheet);
    workSheets[sheetName] = sheetData;
  }
  return {
    sheetsNames: workbook.SheetNames,
    workSheets
  };
};

const addRow = (sheet, row) => {
  sheet.push(row);
  return sheet;
};

const createWorkbook = (sheet, sheetName, bookName) => {
  const workbook = XLSX.utils.book_new();
  const newSheet = XLSX.utils.json_to_sheet(sheet);
  XLSX.utils.book_append_sheet(workbook, newSheet, sheetName);
  XLSX.writeFile(workbook, bookName);
  return workbook;
};

const checkFileExists = async(filePath) => {
  try {
    await fs.access(filePath, fs.constants.F_OK);
    console.log('File exists');
    return true;
  } catch (err) {
    console.error('File does not exist');
    return false;
  }
};
