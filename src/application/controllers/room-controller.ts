import { Request, Response } from "express";
import { ApiResponse } from "./dtos/apiResponse";
import { CreateRoom } from "../../usecases/create-room";
import { CreateRoomDTO } from "./dtos/create-room-dto";

export class RoomController {

  private createRoom: CreateRoom;

  constructor(
    createRoom: CreateRoom
  ) {
    this.createRoom = createRoom
  }

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

  public getRoom(req: Request, res: Response) {
    try {
      res.json(JSON.stringify(new ApiResponse(null)));
    } catch (error) { }
  }

  public updateRoom(req: Request, res: Response) {
    try {
      res.json(JSON.stringify(new ApiResponse(null)));
    } catch (error) { }
  }

  public editRoom(req: Request, res: Response) {
    try {
      res.json(JSON.stringify(new ApiResponse(null)));
    } catch (error) { }
  }
}
