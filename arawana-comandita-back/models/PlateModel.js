import { Schema, model } from "mongoose";

export const PlateSchema = Schema({
  name: {
    type: String,
    require: true,
  },
  price: {
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

export const PlateSchemaId = Schema({
  id: {
    type: String,
    require: true,
  },
  name: {
    type: String,
    require: true,
  },
  price: {
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

export const PlateModel = model('Plate', PlateSchema);
