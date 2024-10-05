import { UserLogin } from "../../usecases/user-login";
import { CreateUser } from "../../usecases/create-user";
import { RepositoryFactory } from "../repositories/respository-factory";
import { CreateRoom } from "../../usecases/create-room";
import { FindRoom } from "../../usecases/find-room";

export class UseCaseFactory {

  public static getCreateRoomInstance() {
    const roomRepository = RepositoryFactory.getRoomRepositoryInstance()
    const resourceRepository = RepositoryFactory.getResourceRepositoryInstance()
    return new CreateRoom(roomRepository, resourceRepository)
  }

  public static getFindRoomInstance() {
    const roomRepository = RepositoryFactory.getRoomRepositoryInstance()
    return new FindRoom(roomRepository)
  }

  public static getCreateUserInstance() {
    const userRepository = RepositoryFactory.getUserRepositoryInstance()
    return new CreateUser(userRepository)
  }

  public static getUserLoginInstance() {
    const userRepository = RepositoryFactory.getUserRepositoryInstance()
    return new UserLogin(userRepository)
  }
}