import { Reservation } from "../domains/reservation";
import { EditReservationDTO } from "../application/dtos/input/edit-reservation-input"
import { ReservationRepository } from "../infraestructure/mongo/repositories/reservation-repository";
import { RoomRepository } from "../infraestructure/mongo/repositories/room-repository";

export class EditReservation {
  private reservationRepository: ReservationRepository;
  private roomRepository: RoomRepository

  constructor(
    reservationRepository: ReservationRepository,
    roomRepository: RoomRepository
  ) {
    this.reservationRepository = reservationRepository
    this.roomRepository = roomRepository
  }

  public async execute(reservation: EditReservationDTO, userId: string) {
    const currentReservation = await this.reservationRepository.findByIdAndUserId(reservation.id, userId);
    if (!currentReservation) {
      throw new Error("Reserva não encontrada ou não pertence ao usuário");
    }

    const newRoom = await this.roomRepository.findRoomById(reservation.roomId);
    if (!newRoom) {
      throw new Error("Sala não encontrada");
    }

    const newReservation = new Reservation(
      reservation.id,
      reservation.title,
      newRoom,
      reservation.startDateTime,
      reservation.endDateTime,
      reservation.description,
    );

    currentReservation.update(newReservation)

    if (reservation.applyToAll) {
      await this.reservationRepository.updateReservationAndRecurrences(currentReservation, userId)
    } else {
      await this.reservationRepository.updateOne(currentReservation, userId);
    }
  }
}