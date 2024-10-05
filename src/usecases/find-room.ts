import { Room } from "src/domains/room";
import { RoomRepository } from "../infraestructure/mongo/repositories/room-repository";

export class FindRoom {

  private roomRepository: RoomRepository

  constructor(roomRepository: RoomRepository) {
    this.roomRepository = roomRepository
  }

  public async list(userId: string): Promise<Room[]> {
    return await this.roomRepository.findRoomsByUserId(userId)
  }
}