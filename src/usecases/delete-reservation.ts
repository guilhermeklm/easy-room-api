import { ReservationRepository } from "../infraestructure/mongo/repositories/reservation-repository";

export class DeleteReservation {
  private reservationRepository: ReservationRepository;

  constructor(
    reservationRepository: ReservationRepository,
  ) {
    this.reservationRepository = reservationRepository
  }

  public async execute(id: string, userId: string) {
    if(id == null) {
      throw new Error("Id é obrigatorio para excluir reserva")
    }

    await this.reservationRepository.deleteByIdAndUserId(id, userId)
  }
}