import { UserController } from "../../application/controllers/user-controller";
import { RoomController } from "../../application/controllers/room-controller";
import { UseCaseFactory } from "../useCases/use-case-factory";
import { ReservationController } from "../../application/controllers/reservation-controller";

export class ControllerFactory {
  private static roomController: RoomController
  private static userController: UserController
  private static reservationController: ReservationController

  public static getRoomControllerInstance(): RoomController {
    if (this.roomController) {
      return this.roomController
    }

    const createRoom = UseCaseFactory.getCreateRoomInstance();
    const findRoom = UseCaseFactory.getFindRoomInstance();
    return new RoomController(findRoom, createRoom);
  }

  public static getUserControllerInstance(): UserController {
    if (!this.userController) {
      const createUser = UseCaseFactory.getCreateUserInstance()
      const userLogin = UseCaseFactory.getUserLoginInstance()
      this.userController = new UserController(createUser, userLogin);
    }

    return this.userController
  }

  public static getReservationControllerInstance(): ReservationController {
    if (!this.reservationController) {
      const createReservationUseCase = UseCaseFactory.getCreateReservationInstance()
      const findReservation = UseCaseFactory.getFindReservationsUseCase()
      const editReservation = UseCaseFactory.getEditReservationUseCase()
      const deleteReservation = UseCaseFactory.getDeleteReservationUseCase()
      this.reservationController = new ReservationController(
        createReservationUseCase,
        findReservation,
        editReservation,
        deleteReservation,
      )
    }

    return this.reservationController
  }
}
