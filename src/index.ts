import dotenv from "dotenv";
dotenv.config();

import { defaultRoute } from "./application/routers/default-route";
import app from "./app";
import cors from "cors";
import { roomRoute } from "./application/routers/room-route";

import mongoose from "mongoose";
import { userRoute } from "./application/routers/user-route";
mongoose.connect(`${process.env.MONGO_DB}`);

app.use(cors());
app.use(defaultRoute);
app.use(roomRoute);
app.use(userRoute);

const PORT = parseInt(`${process.env.PORT || 3000}`);

app.listen(PORT, () => console.log(`Server is running at ${PORT}.`));
