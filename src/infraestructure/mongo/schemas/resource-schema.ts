import mongoose from "mongoose";

const Schema = mongoose.Schema;

const ResourceSchema = new Schema({
  name: String,
  description: String,
  quantity: Number,
},
  { _id: false }
);

export { ResourceSchema };