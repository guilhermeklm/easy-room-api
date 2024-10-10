import { Request, Response } from "express";
import { ApiResponse } from "./dtos/apiResponse";
import { CreateRoom } from "../../usecases/create-room";
import { CreateRoomDTO } from "./dtos/create-room-dto";
import { FindRoom } from "../../usecases/find-room";

export class RoomController {

  private createRoom: CreateRoom;
  private findRoom: FindRoom

  constructor(
    findRoom: FindRoom,
    createRoom: CreateRoom
  ) {
    this.createRoom = createRoom
    this.findRoom = findRoom
  }

  // TODO - SALA NAO TEM USUARIO
  public async create(req: Request, res: Response) {
    try {
      const body = req.body
      const userId = req.get("x-user-id")
      const dto: CreateRoomDTO = {
        name: body.name,
        type: body.type,
        numberOfSeats: body.numberOfSeats,
        location: body.location,
        additionalResources: body.additionalResources,
      }
      const room = await this.createRoom.create(dto, userId)

      res.status(201).json({status: "success", data: room});
    } catch (error) {
      if (error instanceof Error) {
        res.status(500).json(error.message);
      }
    }
  }

  // TODO - SALA NAO TEM USUARIO
  public async getRooms(req: Request, res: Response) {
    try {
      const userId = req.get("x-user-id")
      const rooms = await this.findRoom.list(userId)
      res.status(200).json({status: "success", data: rooms});
    } catch (error) { 
      if (error instanceof Error) {
        res.status(500).json(error.message);
      }
    }
  }
}
