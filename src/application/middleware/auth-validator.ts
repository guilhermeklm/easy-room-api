import { NextFunction, Request, Response } from "express";
import jwt from "jsonwebtoken";

export class AuthValidator {
  public async validateToken(req: Request, res: Response, next: NextFunction) {
    try {
      const jwtToken = req.headers["authorization"];
      const jwtSecret = process.env.JWT_SECRET;

      if (!jwtSecret) {
        throw new Error("JWT_SECRET is not defined in environment variables");
      }

      if (!jwtToken) {
        console.log("Token obrigatorio")
        return res.status(401).json({ status: "error", message: "Token invalido"});
      } 
      const token = jwtToken.split(" ")[1]

      jwt.verify(token, jwtSecret, async (err, decoded) => {
        if (err) {
          console.log("token expirado = " + token)
          return res
            .status(401)
            .json({ message: "This token has expired. Please login" });
        }

        const userId = (decoded as { userId: string }).userId;
        req.headers['x-user-id'] = userId;
        console.log("token ok")
        next();
      });
    } catch (err) {
      if (err instanceof Error) {
        console.log(err.message)
        res.status(401).json({
          status: "error",
          messages: [err.message],
        });
      } else {
        res.status(500).json({
          status: "error",
          code: 500,
          messages: ["Internal Server Error"],
        });
      }
    }
  }
}