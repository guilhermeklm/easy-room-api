import { RoomRepository } from "../../infraestructure/mongo/repositories/room-repository";

export class RepositoryFactory {
  private static roomRepository: RoomRepository | null = null;

  public static getRoomRepositoryInstance(): RoomRepository {
    if (!this.roomRepository) {
      this.roomRepository = new RoomRepository();
    }
    return this.roomRepository;
  }
}
