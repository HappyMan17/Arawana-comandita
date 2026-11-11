import { Schema, model } from "mongoose";
import { PlateGroupSchemaId } from './PlateGroupModel.js';

export const PlateSchema = Schema({
  name: {
    type: String,
    require: true,
  },
  price: {
    type: Number,
    require: true,
  },
  plateGroup: {
    type: PlateGroupSchemaId,
    require: false,
  },
  initQuantity: {
    type: Number,
    require: true,
  },
  description: {
    type: String,
    require: true,
  },
  image: {
    type: String,
    require: true,
  },
  uid: {
    type: String,
    require: true,
  },
});

export const PlateSchemaId = PlateSchema.clone();

// Add new attributes to the copied schema
// based on table needs
PlateSchemaId.add({
  id: String,
  initQuantity: {
    type: Number,
    require: true,
  },
  quantity: {
    type: Number,
    require: true,
    default: 0,
  },
  isSelected: {
    type: Boolean,
    require: true,
    default: false,
  },
});

PlateSchemaId.set('_id', false);

// Defined after cloning on purpose: PlateSchemaId must not inherit this virtual,
// otherwise toJSON overwrites its stored `id` with null (subdocs have no _id).
PlateSchema.virtual('id').get(function() {
  return this._id.toHexString();
});

PlateSchema.set('toJSON', {
  virtuals: true
});

export const PlateModel = model('Plate', PlateSchema);
