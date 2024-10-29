import { UserLogin } from "../../usecases/user-login";
import { CreateUser } from "../../usecases/create-user";
import { RepositoryFactory } from "../repositories/respository-factory";
import { CreateRoom } from "../../usecases/create-room";
import { FindRoom } from "../../usecases/find-room";
import { CreateReservation } from "../../usecases/create-reservation";
import { FindReservation } from "../../usecases/find-reservation";
import { EditReservation } from "../../usecases/edit-reservation";
import { DeleteReservation } from "../../usecases/delete-reservation";

export class UseCaseFactory {

  private static createRoom: CreateRoom
  private static findRoom: FindRoom
  private static createUser: CreateUser
  private static userLogin: UserLogin
  private static createReservation: CreateReservation
  private static findReservation: FindReservation
  private static editReservation: EditReservation
  private static deleteReservation: DeleteReservation

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

  public static getFindReservationsUseCase() {
    if (!this.findReservation) {
      const reservationRepository = RepositoryFactory.getReservationRepositoryInstance()
      this.findReservation = new FindReservation(reservationRepository)
    }

    return this.findReservation
  }

  public static getEditReservationUseCase() {
    if (!this.editReservation) {
      const reservationRepository = RepositoryFactory.getReservationRepositoryInstance()
      const roomRepository = RepositoryFactory.getRoomRepositoryInstance()
      this.editReservation = new EditReservation(reservationRepository, roomRepository)
    }

    return this.editReservation
  }

  public static getDeleteReservationUseCase() {
    if (!this.deleteReservation) {
      const reservationRepository = RepositoryFactory.getReservationRepositoryInstance()
      this.deleteReservation = new DeleteReservation(reservationRepository)
    }

    return this.deleteReservation
  }
}