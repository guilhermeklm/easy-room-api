import { Request, Response } from "express";
import { ApiResponse } from "./dtos/apiResponse";
import { Room, TypeRoom } from "../../domains/room";
import { Location } from "../../domains/location";
import { Resource } from "../../domains/resource";
import { RoomRepository } from "../../infraestructure/mongo/repositories/room-repository";

export class RoomController {
  private roomRepository: RoomRepository;

  constructor(roomRepository: RoomRepository) {
    this.roomRepository = roomRepository;
  }

  public async createRoom(req: Request, res: Response) {
    try {
      const location = new Location(
        "Rua Coronel Genuino, 130 - Centro, Porto Alegre",
        1,
        "12",
        "area descricao",
        "Pós graduacao"
      );
      const resource = new Resource(
        "Projetor",
        "Powerlite FH52 V11H978021 Epson"
      );
      const room = new Room(
        1,
        1,
        "sala 1",
        TypeRoom.MEETING_ROOM,
        200,
        location,
        [resource],
        10
      );

      await this.roomRepository.save(room);

      let apiResponse = ApiResponse.success<Room>(room, [
        "room.application.success.entity_created",
      ]);

      res.status(201).json(JSON.stringify(apiResponse));
    } catch (error) {
      let apiResponse = ApiResponse.error([
        {
          type: TypeErr.INTERNAL_SERVER_ERROR,
          messageKey: "error.internal_error",
        },
      ]);
      res.status(500).json(JSON.stringify(apiResponse));
    }
  }

  public getRoom(req: Request, res: Response) {
    try {
      res.json(JSON.stringify(new ApiResponse(null)));
    } catch (error) {}
  }

  public updateRoom(req: Request, res: Response) {
    try {
      res.json(JSON.stringify(new ApiResponse(null)));
    } catch (error) {}
  }

  public editRoom(req: Request, res: Response) {
    try {
      res.json(JSON.stringify(new ApiResponse(null)));
    } catch (error) {}
  }
}
