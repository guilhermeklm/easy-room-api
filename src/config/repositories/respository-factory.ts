import { UserRepository } from "../../infraestructure/mongo/repositories/user-repository";
import { RoomRepository } from "../../infraestructure/mongo/repositories/room-repository";
import { ResourceRepository } from "../../infraestructure/mongo/repositories/resource-repository";
import { ReservationRepository } from "../../infraestructure/mongo/repositories/reservation-repository";

export class RepositoryFactory {
  private static roomRepository: RoomRepository;
  private static userRepository: UserRepository;
  private static resourceRepository: ResourceRepository;
  private static reservationRepository: ReservationRepository

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

  public static getResourceRepositoryInstance(): ResourceRepository {
    if (!this.resourceRepository) {
      this.resourceRepository = new ResourceRepository();
    }
    return this.resourceRepository;
  }

  public static getReservationRepositoryInstance(): ReservationRepository {
    if (!this.reservationRepository) {
      this.reservationRepository = new ReservationRepository();
    }

    return this.reservationRepository;
  }
}
