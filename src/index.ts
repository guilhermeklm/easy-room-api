import app from "./app";
import { connect } from "mongoose";
import dotenv from "dotenv";
dotenv.config();

const run = async () => {
  await connect(`${process.env.MONGO_DB}`);
  console.log("Connected to mongodb");
}

run().catch((err) => console.error(err))

const PORT = parseInt(`${process.env.PORT || 3000}`);

app.listen(PORT, () => console.log(`Server is running at ${PORT}.`));