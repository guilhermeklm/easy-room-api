import { UserController } from "../../application/controllers/user-controller";
import { RoomController } from "../../application/controllers/room-controller";
import { RepositoryFactory } from "../repositories/respository-factory";

export class UseCaseFactory {
  public static getRoomControllerInstance(): RoomController {
    const roomRepo = RepositoryFactory.getRoomRepositoryInstance();
    return new RoomController(roomRepo);
  }

  public static getUserControllerInstance(): UserController {
    return new UserController();
  }
}
