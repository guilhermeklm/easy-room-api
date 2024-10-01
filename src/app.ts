import express from "express";
import cors from "cors";
import { defaultRoute } from "./application/routers/default-route";
import { roomRoute } from "./application/routers/room-route";
import { userRoute } from "./application/routers/user-route";

const app = express();

const corsOptions = {
  exposedHeaders: 'Authorization',
};

app.use(cors(corsOptions));
app.use(express.urlencoded({ extended: false }));
app.use(express.json());

app.use(defaultRoute);
app.use(roomRoute);
app.use(userRoute);

export default app;
