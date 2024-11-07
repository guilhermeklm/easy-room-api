import mongoose from "mongoose";

const Schema = mongoose.Schema;

const reservationSchema = new Schema({
  _id: {
    type: Schema.Types.ObjectId,
    auto: true
  },
  title: { type: String },
  roomId: { type: String },
  userId: { type: String },
  startDateTime: { type: Date },
  endDateTime: { type: Date },
  description: { type: String },
  isRecurringInstance: { type: Boolean }
}, {
  timestamps: true,
});

const ReservationModel = mongoose.model("Reservation", reservationSchema);

export { ReservationModel };
