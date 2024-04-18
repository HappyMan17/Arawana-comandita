import fs from 'fs/promises';
import XLSX from 'xlsx';

export const readWorkbookFile = async (filePath) => {
  return XLSX.readFile(filePath);
};

export const readWorkbook = async (filePath) => {
  const workbook = await readWorkbookFile(filePath);
  let workSheets = {};

  for (const sheetName of workbook.SheetNames) {
    const sheet = workbook.Sheets[sheetName];
    const sheetData = XLSX.utils.sheet_to_json(sheet);
    workSheets[sheetName] = sheetData;
  }
  return {
    sheetsNames: workbook.SheetNames,
    workSheets,
    workbook,
  };
};

export const addRow = (workbook, sheet, sheetName, workbookName) => {
  XLSX.utils.sheet_add_json(workbook.Sheets[sheetName], sheet);
  XLSX.writeFile(workbook, workbookName);
  return sheet;
};

export const createWorkbook = (sheet, sheetName, bookName) => {
  const workbook = XLSX.utils.book_new();
  const newSheet = XLSX.utils.json_to_sheet(sheet);
  XLSX.utils.book_append_sheet(workbook, newSheet, sheetName);
  XLSX.writeFile(workbook, bookName);
  return workbook;
};

export const checkFileExists = async(filePath) => {
  try {
    await fs.access(filePath, fs.constants.F_OK);
    console.log('File exists');
    return true;
  } catch (err) {
    console.error('File does not exist');
    return false;
  }
};

export const convertToCurrency = (value) => {
  const COP = new Intl.NumberFormat('es-CO', {
    style: 'currency',
    currency: 'COP',
  });

  if (!value) {
    COP.format(0);
  }

  return COP.format(value);
};

export const excelSerialDateToJSDate = (serial) => {
  var utcDays = Math.floor(serial - 25569);
  var utcValue = utcDays * 86400; // Seconds per day
  var date = new Date(utcValue * 1000);

  // Adjust for timezone offset
  date.setMinutes(date.getMinutes() + date.getTimezoneOffset());

  return date;
};
