import { UserLogin } from "../../usecases/user-login";
import { CreateUser } from "../../usecases/create-user";
import { RepositoryFactory } from "../repositories/respository-factory";
import { CreateRoom } from "../../usecases/create-room";
import { FindRoom } from "../../usecases/find-room";
import { CreateReservation } from "../../usecases/create-reservation";

export class UseCaseFactory {

  private static createRoom: CreateRoom
  private static findRoom: FindRoom
  private static createUser: CreateUser
  private static userLogin: UserLogin
  private static createReservation: CreateReservation

  public static getCreateRoomInstance() {
    if (!this.createRoom) {
      const roomRepository = RepositoryFactory.getRoomRepositoryInstance()
      const resourceRepository = RepositoryFactory.getResourceRepositoryInstance()
      this.createRoom = new CreateRoom(roomRepository, resourceRepository)
    }

    return this.createRoom
  }

  public static getFindRoomInstance() {
    if (!this.findRoom) {
      const roomRepository = RepositoryFactory.getRoomRepositoryInstance()
      this.findRoom = new FindRoom(roomRepository)
    }

    return this.findRoom
  }

  public static getCreateUserInstance() {
    if (!this.createUser) {
      const userRepository = RepositoryFactory.getUserRepositoryInstance()
      this.createUser = new CreateUser(userRepository)
    }

    return this.createUser
  }

  public static getUserLoginInstance() {
    if (!this.userLogin) {
      const userRepository = RepositoryFactory.getUserRepositoryInstance()
      this.userLogin = new UserLogin(userRepository)
    }

    return this.userLogin
  }

  public static getCreateReservationInstance() {
    if (!this.createReservation) {
      const reservationRepository = RepositoryFactory.getReservationRepositoryInstance()
      const roomRepository = RepositoryFactory.getRoomRepositoryInstance()
      this.createReservation = new CreateReservation(reservationRepository, roomRepository)
    }

    return this.createReservation
  }
}