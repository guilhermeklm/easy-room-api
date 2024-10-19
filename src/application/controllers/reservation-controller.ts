import { Request, Response } from "express";
import { CreateReservation } from "../../usecases/create-reservation";
import { CreateReservationDTO } from "./dtos/create-reservation-dto";
import { FindReservation } from "../../usecases/find-reservation";
import { ReservationConverter } from "../converter/reservation-converter";

export class ReservationController {

  private createReservation: CreateReservation
  private findReservation: FindReservation

  constructor(
    createReservation: CreateReservation,
    findReservation: FindReservation
  ) {
    this.createReservation = createReservation
    this.findReservation = findReservation
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

  public async getOldReservations(_req: Request, res: Response) {
    try {
      const reservations = await this.findReservation.listOldReservation()
      const dto = ReservationConverter.toFindReservationDto(reservations)
      res.status(200).json(dto);
    } catch (error) {
      if (error instanceof Error) {
        res.status(500).json({message: error.message});
      }
    }
  }

  public async getNewReservations(_req: Request, res: Response) {
    try {
      const reservations = await this.findReservation.listAllReservation()
      const dto = ReservationConverter.toFindReservationDto(reservations)
      console.log(dto)
      res.status(200).json(dto);
    } catch (error) {
      if (error instanceof Error) {
        res.status(500).json({message: error.message});
      }
    }
  }
}