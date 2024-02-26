import { Schema, model } from "mongoose";
import { PlateSchemaId } from "./PlateModel.js";

export const TableSchema = Schema({
  name: {
    type: String,
    require: true,
  },
  total: {
    type: Number,
    require: true,
  },
  comment: {
    type: String,
    require: true,
  },
  uid: {
    type: String,
    require: true,
  },
  initCommand: {
    type: Date,
  },
  platesServed: {
    type: Date,
  },
  paymentMethod: {
    type: String,
    require: true,
  },
  hasPaidService: {
    type: Boolean,
    require: true,
  },
  plates: [PlateSchemaId],
  command: [PlateSchemaId],
});

TableSchema.virtual('id').get(function() {
  return this._id.toHexString();
});

// Ensure virtual fields are included when converting to JSON
TableSchema.set('toJSON', {
  virtuals: true
});

export const TableSchemaWithId = TableSchema.clone();

// Add new attributes to the copied schema
TableSchemaWithId.add({
  // Define new attributes
  id: String,
});

export const TableModel = model('Table', TableSchema);
