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
      dto.description
    )
    await this.validate(reservation)

    await this.reservationRepository.save(reservation, userId)

    return Promise.resolve()
  }

  private async validate(reservation: Reservation) {
    const hasConflictingReservation = await this.reservationRepository.hasConflictingReservation(reservation)
    if(hasConflictingReservation) {
      throw new Error("Conflito entre agendas")
    }
  }
}

// editar reserva ok (revisar erros de dominio, estao quebrando e nao mostra no api response)
// excluir reserva ok
// recorrencia
// ordenacao das salas no historicos
// adicionar elementos na reserva
// oq é o elemento e quem é o responsavel, pra preparar a sala
// email da propria instituicao
