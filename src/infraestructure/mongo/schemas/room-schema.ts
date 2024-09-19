import mongoose from "mongoose";
import { LocationSchema } from "./location-schema";
import { ResourceSchema } from "./resource-schema";

const Schema = mongoose.Schema;

const roomSchema = new Schema({
  name: String,
  userId: Number,
  type: String,
  capacity: Number,
  location: { type: LocationSchema },
  resources: { type: [ResourceSchema] },
  numberOfSeats: Number,
});

const RoomSchema = mongoose.model("Room", roomSchema);

export { RoomSchema };
