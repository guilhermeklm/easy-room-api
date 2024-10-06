import { Request, Response } from "express";
import { CreateReservation } from "../../usecases/create-reservation";
import { CreateReservationDTO } from "./dtos/create-reservation-dto";

export class ReservationController {

  private createReservation: CreateReservation

  constructor(createReservation: CreateReservation) {
    this.createReservation = createReservation
  }

  public async create(req: Request, res: Response) {
    try {
      const body = req.body
      const userId = req.get("x-user-id")
      const dto: CreateReservationDTO = {
        title: body.title,
        roomId: body.roomId,
        startDateTime: body.startDateTime,
        endDateTime: body.endDateTime,
        description: body.description
      }
      await this.createReservation.create(dto, userId)
      res.sendStatus(201);
    } catch (error) {
      if (error instanceof Error) {
        res.status(500).json({message: error.message});
      }
    }
  }
}