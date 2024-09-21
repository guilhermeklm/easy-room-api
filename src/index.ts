import app from "./app";
import mongoose from "mongoose";
import dotenv from "dotenv";
dotenv.config();

mongoose.connect(`${process.env.MONGO_DB}`);

const PORT = parseInt(`${process.env.PORT || 3000}`);

app.listen(PORT, () => console.log(`Server is running at ${PORT}.`));