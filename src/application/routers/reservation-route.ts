import express, { Request, Response } from "express";
import { ControllerFactory } from "../../config/controller/controller-factory";
import { AuthValidator } from "../middleware/auth-validator";

const authValidator = new AuthValidator();
const reservationRoute = express.Router();
const reservationController = ControllerFactory.getReservationControllerInstance();

reservationRoute.post("/api/v1/reservations", authValidator.validateToken, (req: Request, res: Response) =>
  reservationController.create(req, res)
);

reservationRoute.put("/api/v1/reservations/:reservationId", authValidator.validateToken, (req: Request, res: Response) =>
  reservationController.putReservation(req, res)
);

reservationRoute.get("/api/v1/history/reservations", authValidator.validateToken, (req: Request, res: Response) =>
  reservationController.getOldReservations(req, res)
);

reservationRoute.get("/api/v1/reservations", authValidator.validateToken, (req: Request, res: Response) =>
  reservationController.getNewReservations(req, res)
);

reservationRoute.delete("/api/v1/reservations/:reservationId", authValidator.validateToken, (req: Request, res: Response) =>
  reservationController.delReservation(req, res)
);

export { reservationRoute };
