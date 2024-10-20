import { Reservation } from "../domains/reservation";
import { CreateReservationDTO } from "../application/controllers/dtos/create-reservation-dto";
import { ReservationRepository } from "../infraestructure/mongo/repositories/reservation-repository";
import { RoomRepository } from "../infraestructure/mongo/repositories/room-repository";

export class CreateReservation {
  private reservationRepository: ReservationRepository;
  private roomRepository: RoomRepository

  constructor(
    reservationRepository: ReservationRepository,
    roomRepository: RoomRepository
  ) {
    this.reservationRepository = reservationRepository
    this.roomRepository = roomRepository
  }

  public async create(dto: CreateReservationDTO, userId: string): Promise<void> {
    const room = await this.roomRepository.findRoomById(dto.roomId)

    if(!room) {
      throw new Error("sala inexistente")
    }

    const reservation: Reservation = new Reservation(
      null,
      dto.title,
      room,
      new Date(dto.startDateTime),
      new Date(dto.endDateTime),
      true,
      dto.description
    )
    this.validate(reservation)

    await this.reservationRepository.save(reservation, userId)

    return Promise.resolve()
  }

  private validate(reservation: Reservation) {
    const hasConflictingReservation = this.reservationRepository.hasConflictingReservation(reservation)
    if(hasConflictingReservation) {
      throw new Error("Sala indisponivel para reserva neste horario")
    }
  }
}