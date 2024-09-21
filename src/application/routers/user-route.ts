import express, { Request, Response } from "express";
import { ControllerFactory } from "../../config/controller/controller-factory";
import { AuthValidator } from "../middleware/auth-validator";

const userRoute = express.Router();
const userController = ControllerFactory.getUserControllerInstance();

userRoute.post("/api/v1/auth/register", (req: Request, res: Response) =>
  userController.createUser(req, res)
);

userRoute.post("/api/v1/auth/login", (req: Request, res: Response) =>
  userController.login(req, res)
);

export { userRoute };
