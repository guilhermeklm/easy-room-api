import express, { Request, Response } from "express";
import { ControllerFactory } from "../../config/controller/controller-factory";
import { AuthValidator } from "../middleware/auth-validator";

const authValidator = new AuthValidator();
const roomRoute = express.Router();
const roomController = ControllerFactory.getRoomControllerInstance();

roomRoute.post("/api/v1/room", authValidator.validateSession, (req: Request, res: Response) =>
  roomController.createRoom(req, res)
);

roomRoute.get("/api/v1/room/:roomId", authValidator.validateSession, (req: Request, res: Response) =>
  roomController.getRoom(req, res)
);

roomRoute.patch("/api/v1/room/:roomId", authValidator.validateSession, (req: Request, res: Response) =>
  roomController.updateRoom(req, res)
);

roomRoute.put("/api/v1/room/:roomId", authValidator.validateSession, (req: Request, res: Response) =>
  roomController.editRoom(req, res)
);

export { roomRoute };
