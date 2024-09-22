import mongoose from "mongoose";
import { LocationSchema } from "./location-schema";
import { ResourceSchema } from "./resource-schema";

const Schema = mongoose.Schema;

const roomSchema = new Schema({
  _id: {
    type: Schema.Types.ObjectId,
    auto: true
  },
  name: { type: String },
  userId: { type: String },
  type: { type: String },
  location: { type: LocationSchema },
  resources: { type: [ResourceSchema] },
  numberOfSeats: { type: Number },
}, {
  timestamps: true,
});

const RoomModel = mongoose.model("Room", roomSchema);

export { RoomModel };
