import express, { Request, Response } from "express";
import { ControllerFactory } from "../../config/controller/controller-factory";
import { AuthValidator } from "../middleware/auth-validator";

const authValidator = new AuthValidator();
const roomRoute = express.Router();
const roomController = ControllerFactory.getRoomControllerInstance();

roomRoute.post("/api/v1/rooms", authValidator.validateToken, (req: Request, res: Response) =>
  roomController.create(req, res)
);

roomRoute.get("/api/v1/rooms", authValidator.validateToken, (req: Request, res: Response) =>
  roomController.getRooms(req, res)
);

export { roomRoute };
