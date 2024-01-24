import { Schema } from "mongoose";

const PlateGroupModel = Schema({
  name: {
    type: String,
    require: true,
  },
});

export default PlateGroupModel;
