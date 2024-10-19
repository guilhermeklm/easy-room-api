import { Reservation } from "../domains/reservation";
import { ReservationRepository } from "../infraestructure/mongo/repositories/reservation-repository";

export class FindReservation {
  
  private reservationRepository: ReservationRepository

  constructor(
    reservationRepository: ReservationRepository
  ) {
    this.reservationRepository = reservationRepository
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