import { UserController } from "../../application/controllers/user-controller";
import { RoomController } from "../../application/controllers/room-controller";
import { RepositoryFactory } from "../repositories/respository-factory";
import { UseCaseFactory } from "../useCases/use-case-factory";

export class ControllerFactory {
  public static getRoomControllerInstance(): RoomController {
    const roomRepo = RepositoryFactory.getRoomRepositoryInstance();
    return new RoomController(roomRepo);
  }

  public static getUserControllerInstance(): UserController {
    const createUser = UseCaseFactory.getCreateUserInstance()
    const userLogin = UseCaseFactory.getUserLoginInstance()
    return new UserController(createUser, userLogin);
  }
}
