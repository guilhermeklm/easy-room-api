import mongoose from "mongoose";

const Schema = mongoose.Schema;

const LocationSchema = new Schema({
  address: String,
  floor: Number,
  roomLabel: String,
  areaDescription: String,
  sector: String,
},
  { _id: false }
);

export { LocationSchema };
