import express, { Request, Response } from "express";
import { UseCaseFactory } from "../config/useCases/useCaseFactory";

const roomRoute = express.Router();
const roomController = UseCaseFactory.getRoomControllerInstance();

roomRoute.post("/api/room", (req: Request, res: Response) =>
  roomController.createRoom(req, res)
);

roomRoute.get("/api/room/:roomId", (req: Request, res: Response) =>
  roomController.getRoom(req, res)
);

roomRoute.patch("/api/room/:roomId", (req: Request, res: Response) =>
  roomController.updateRoom(req, res)
);

roomRoute.put("/api/room/:roomId", (req: Request, res: Response) =>
  roomController.editRoom(req, res)
);

export { roomRoute };
