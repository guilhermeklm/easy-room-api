import { UserController } from "../../application/controllers/user-controller";
import { RoomController } from "../../application/controllers/room-controller";
import { RepositoryFactory } from "../repositories/respository-factory";
import { UseCaseFactory } from "../useCases/use-case-factory";

export class ControllerFactory {
  public static getRoomControllerInstance(): RoomController {
    const createRoom = UseCaseFactory.getCreateRoomInstance();
    const findRoom = UseCaseFactory.getFindRoomInstance();
    return new RoomController(findRoom, createRoom);
  }

  public static getUserControllerInstance(): UserController {
    const createUser = UseCaseFactory.getCreateUserInstance()
    const userLogin = UseCaseFactory.getUserLoginInstance()
    return new UserController(createUser, userLogin);
  }
}
