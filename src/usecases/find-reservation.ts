import { FindReservationInputDTO } from "../application/dtos/input/find-reservation-input"
import { Reservation } from "../domains/reservation";
import { FindReservation as FindReservationDomain } from "../domains/find-reservation";
import { ReservationRepository } from "../infraestructure/mongo/repositories/reservation-repository";

export class FindReservation {

  private reservationRepository: ReservationRepository

  constructor(
    reservationRepository: ReservationRepository
  ) {
    this.reservationRepository = reservationRepository
  }

  public async get(findReservationDTO: FindReservationInputDTO): Promise<Reservation[]> {
    const findReservation = new FindReservationDomain(findReservationDTO.roomsId)
    return await this.reservationRepository.findReservations(findReservation)
  }

  public async listOldReservation(): Promise<Reservation[]> {
    const reservations = await this.reservationRepository.findOldReservations()
    return Promise.resolve(reservations)
  }

  public async listAllReservation(): Promise<Reservation[]> {
    const reservations = await this.reservationRepository.listAllReservation()
    return Promise.resolve(reservations)
  }
}