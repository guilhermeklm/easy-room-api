import mongoose, { Schema } from "mongoose";
import bcrypt from "bcrypt";

const schema = new mongoose.Schema(
  {
    _id: {
      type: Schema.Types.ObjectId,
      auto: true
    },
    name: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      unique: true,
      required: true,
    },
    password: {
      type: String,
      required: true,
      select: false
    },
  },
  { timestamps: true }
);

schema.pre("save", function (next) {
  const user = this;

  if (!user.isModified("password")) return next();
  bcrypt.genSalt(10, (err, salt) => {
    if (err) return next(err);

    bcrypt.hash(user.password, salt, (err, hash) => {
      if (err) return next(err);

      user.password = hash;
      next();
    });
  });
});

export const UserSchema = mongoose.model("User", schema);
