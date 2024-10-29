import { Reservation } from "../domains/reservation";
import { EditReservationDTO } from "../application/controllers/dtos/edit-reservation-dto";
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
    const newRoom = await this.roomRepository.findRoomById(reservation.roomId)
    const reservationUpdated = new Reservation(
      reservation.id,
      reservation.title,
      newRoom,
      reservation.startDateTime,
      reservation.endDateTime,
      reservation.description
    )

    await this.reservationRepository.update(reservationUpdated, userId)
  }
}