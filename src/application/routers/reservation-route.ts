import express, { Request, Response } from "express";
import { ControllerFactory } from "../../config/controller/controller-factory";
import { AuthValidator } from "../middleware/auth-validator";

const authValidator = new AuthValidator();
const reservationRoute = express.Router();
const reservationController = ControllerFactory.getReservationControllerInstance();

reservationRoute.post("/api/v1/reservations", authValidator.validateToken, (req: Request, res: Response) =>
  reservationController.create(req, res)
);

reservationRoute.get("/api/v1/history/reservations", authValidator.validateToken, (req: Request, res: Response) =>
  reservationController.getOldReservations(req, res)
);

export { reservationRoute };
