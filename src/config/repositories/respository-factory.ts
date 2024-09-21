import { UserRepository } from "../../infraestructure/mongo/repositories/user-repository";
import { RoomRepository } from "../../infraestructure/mongo/repositories/room-repository";

export class RepositoryFactory {
  private static roomRepository: RoomRepository | null = null;
  private static userRepository: UserRepository | null = null;

  public static getRoomRepositoryInstance(): RoomRepository {
    if (!this.roomRepository) {
      this.roomRepository = new RoomRepository();
    }
    return this.roomRepository;
  }

  public static getUserRepositoryInstance(): UserRepository {
    if (!this.userRepository) {
      this.userRepository = new UserRepository();
    }
    return this.userRepository;
  }
}
