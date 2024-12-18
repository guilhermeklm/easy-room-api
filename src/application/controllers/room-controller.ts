import { Request, Response } from "express";
import { CreateRoom } from "../../usecases/create-room";
import { CreateRoomDTO } from "../dtos/input/create-room-dto";
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

  public async create(req: Request, res: Response) {
    try {
      const body = req.body
      const dto: CreateRoomDTO = {
        name: body.name,
        type: body.type,
        numberOfSeats: body.numberOfSeats,
        location: body.location,
        additionalResources: body.additionalResources,
      }
      const room = await this.createRoom.create(dto)

      res.status(201).json({status: "success", data: room});
    } catch (error) {
      console.log(error)
      if (error instanceof Error) {
        res.status(500).json(error.message);
      }
    }
  }

  public async getRooms(req: Request, res: Response) {
    try {
      const rooms = await this.findRoom.list()
      res.status(200).json({status: "success", data: rooms});
    } catch (error) { 
      console.log(error)
      if (error instanceof Error) {
        res.status(500).json(error.message);
      }
    }
  }
}
