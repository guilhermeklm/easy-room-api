import { Request, Response } from "express";
import { CreateReservation } from "../../usecases/create-reservation";
import { CreateReservationDTO } from "../dtos/input/create-reservation-input";
import { FindReservation } from "../../usecases/find-reservation";
import { ReservationConverter } from "../converter/reservation-converter";
import { EditReservationDTO } from "../dtos/input/edit-reservation-input";
import { EditReservation } from "../../usecases/edit-reservation";
import { DeleteReservation } from "../../usecases/delete-reservation";
import { FindReservationInputDTO } from "../dtos/input/find-reservation-input";

export class ReservationController {

  private createReservation: CreateReservation
  private findReservation: FindReservation
  private editReservation: EditReservation
  private deleteReservation: DeleteReservation

  constructor(
    createReservation: CreateReservation,
    findReservation: FindReservation,
    editReservation: EditReservation,
    deleteReservation: DeleteReservation,
  ) {
    this.createReservation = createReservation
    this.findReservation = findReservation
    this.editReservation = editReservation
    this.deleteReservation = deleteReservation
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
        description: body.description,
        isRecurring: body.isRecurring,
        recurrence: body.recurrence
      }
      await this.createReservation.create(dto, userId)
      res.sendStatus(201);
    } catch (error) {
      if (error instanceof Error) {
        console.log(error)
        res.status(500).json({ message: error.message });
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
        res.status(500).json({ message: error.message });
      }
    }
  }

  public async getReservations(req: Request, res: Response) {
    try {
      const roomsId: string[] = Array.isArray(req.query.roomsId)
        ? req.query.roomsId.map(id => String(id))
        : req.query.roomsId
          ? [String(req.query.roomsId)]
          : [];

      const filter: FindReservationInputDTO = {
        roomsId: roomsId
      };

      const reservations = await this.findReservation.get(filter)
      const dto = ReservationConverter.toFindReservationDto(reservations)
      res.status(200).json(dto);
    } catch (error) {
      if (error instanceof Error) {
        res.status(500).json({ message: error.message });
      }
    }
  }

  public async putReservation(req: Request, res: Response) {
    try {
      const body = req.body
      const id = req.params.reservationId
      const userId = req.get("x-user-id")
      const dto: EditReservationDTO = {
        id: id,
        title: body.title,
        roomId: body.roomId,
        startDateTime: body.startDateTime,
        endDateTime: body.endDateTime,
        description: body.description,
        applyToAll: body.applyToAll
      }
      await this.editReservation.execute(dto, userId)
      res.sendStatus(204);
    } catch (error) {
      if (error instanceof Error) {
        res.status(500).json({ message: error.message });
      }
    }
  }

  public async delReservation(req: Request, res: Response) {
    try {
      const id = req.params.reservationId
      const userId = req.get("x-user-id")
      await this.deleteReservation.execute(id, userId)
      res.sendStatus(204);
    } catch (error) {
      if (error instanceof Error) {
        res.status(500).json({ message: error.message });
      }
    }
  }
}