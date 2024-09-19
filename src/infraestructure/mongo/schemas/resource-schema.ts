import mongoose from "mongoose";

const Schema = mongoose.Schema;

const ResourceSchema = new Schema({
  name: String,
  description: String,
});

export { ResourceSchema };
