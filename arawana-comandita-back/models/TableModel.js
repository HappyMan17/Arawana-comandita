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
  paymentMethod: {
    type: String,
    require: true,
  },
  hasPaidService: {
    type: Boolean,
    require: true,
  },
  plates: [PlateSchemaId],
  expireAt: {
    type: Date,
    expires: 0,
  },
});

export const TableSchemaWithId = TableSchema.clone();

// Add new attributes to the copied schema
TableSchemaWithId.add({
  // Define new attributes
  id: String,
});

TableSchemaWithId.set('_id', false);

// Defined after cloning on purpose: TableSchemaWithId must not inherit this virtual,
// otherwise toJSON overwrites its stored `id` with null (subdocs have no _id).
TableSchema.virtual('id').get(function() {
  return this._id.toHexString();
});

TableSchema.set('toJSON', {
  virtuals: true
});

export const TableModel = model('Table', TableSchema);
