/* eslint-disable max-len */
import { jsPDF } from "jspdf";
import { DaySummary, Table } from "../types";
import { convertToCurrency, getDateFormat } from ".";

export const generatePDF = (summary: DaySummary) => {
  const { total, date, tables } = summary;
  // Default export is a4 paper, portrait, using millimeters for units
  const doc = new jsPDF();
  let yAxist = 50;

  // Title:
  doc.text("Arawana Summary!", 80, 20);
  // Date:
  doc.text(`Summary Date: ${getDateFormat(new Date(date))}`, 10, 30);

  doc.text(`Total sold on the day: ${ convertToCurrency(total) }`, 10, 40);

  /** Tables */
  tables.map((table: Table) => {
    // Line
    doc.setLineWidth(0.5);
    doc.line(10, yAxist-7, 250, yAxist-7);

    doc.text(`${ table.name }`, 15, yAxist);
    /** Plates */
    table.plates.forEach(plate => {
      yAxist += 8;
      doc.text(`- ${ plate.name.toLowerCase() }`, 20, yAxist);
      yAxist += 7;
      doc.text(`${ convertToCurrency(plate.price) } x${ plate.quantity } = ${ convertToCurrency(plate.price * (plate.quantity ?? 1)) }`, 25, yAxist);
    });
    yAxist += 10;
    doc.text(`Total table: ${ convertToCurrency(table.total) }`, 15, yAxist);
    yAxist += 10;
  });

  // File Name:
  doc.save(`${getDateFormat(new Date(date))}.pdf`);
};

export const commandPDF = (table: Table) => {
  const { plates, name } = table;
  // Default export is a4 paper, portrait, using millimeters for units
  const doc = new jsPDF();
  let yAxist = 50;

  // Title:
  doc.text("COMMAND", 80, 20);
  // Date:
  doc.text(`DATE: ${getDateFormat(new Date())}`, 10, 30);

  doc.text(`TABLE: ${ name }`, 10, 40);

  /** Plates */
  plates.forEach(plate => {
    yAxist += 8;
    doc.text(`- ${ plate.name.toLowerCase() }`, 15, yAxist);
    yAxist += 7;
    doc.text(`${ convertToCurrency(plate.price) } x ${ plate.quantity }`, 20, yAxist);
  });
  yAxist += 10;

  // File Name:
  doc.save(`command_${getDateFormat(new Date())}.pdf`);
};
