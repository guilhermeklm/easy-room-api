import { CreateReservationDTO } from "../application/controllers/dtos/create-reservation";
import { ReservationRepository } from "../infraestructure/mongo/repositories/reservation-repository";

export class CreateReservation {
  private reservationRepository: ReservationRepository;

  constructor(
    reservationRepository: ReservationRepository
  ) {
    this.reservationRepository = reservationRepository
  }
  
  public create(dto: CreateReservationDTO, userIde: string) {

  }
}