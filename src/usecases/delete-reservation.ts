import { ReservationRepository } from "../infraestructure/mongo/repositories/reservation-repository";

export class DeleteReservation {
  private reservationRepository: ReservationRepository;

  constructor(
    reservationRepository: ReservationRepository,
  ) {
    this.reservationRepository = reservationRepository
  }

  public async execute(id: string, userId: string, deleteRecurring: boolean) {
    if (id == null) {
      throw new Error("Id é obrigatorio para excluir reserva")
    }

    const reservationToDelete = await this.reservationRepository.findByIdAndUserId(id, userId)

    if (reservationToDelete.isRecurring && deleteRecurring) {
      await this.reservationRepository.deleteReservationAndSubsequentEvents(reservationToDelete)
    } else {
      await this.reservationRepository.delete(reservationToDelete)
    }
  }
}