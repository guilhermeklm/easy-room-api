import express, { Request, Response } from "express";
import { UseCaseFactory } from "../../config/useCases/use-case-factory";

const userRoute = express.Router();
const userController = UseCaseFactory.getUserControllerInstance();

userRoute.post("/api/auth/register", (req: Request, res: Response) =>
  userController.createUser(req, res)
);

export { userRoute };
