import { Reservation } from "../domains/reservation";
import { CreateReservationDTO } from "../application/controllers/dtos/create-reservation-dto";
import { ReservationRepository } from "../infraestructure/mongo/repositories/reservation-repository";
import { RoomRepository } from "../infraestructure/mongo/repositories/room-repository";
import moment from "moment";

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

    if (!room) {
      throw new Error("sala inexistente")
    }

    let reservations: Reservation[] = []

    const reservationBase: Reservation = new Reservation(
      null,
      dto.title,
      room,
      new Date(dto.startDateTime),
      new Date(dto.endDateTime),
      dto.description
    )

    reservations.push(reservationBase)

    if (dto.isRecurring) {
      const start = moment(reservationBase.startDateTime, "MM-DD-YYYY, HH:mm");
      const end = moment(reservationBase.endDateTime, "MM-DD-YYYY, HH:mm");
      const recurrenceEnd = moment(dto.recurrence.endDate);

      while (start.isBefore(recurrenceEnd)) {
        const dayOfWeek = start.day();

        if (dto.recurrence.selectedWeekdays.includes(dayOfWeek)) {
          reservations.push(new Reservation(
            null,
            reservationBase.title,
            reservationBase.room,
            start.format(),
            end.format(),
            reservationBase.description,
            true
          ));
        }

        start.add(1, 'days');
        end.add(1, 'days');
      }
    }

    await this.validate(reservations)

    await this.reservationRepository.saveAll(reservations, userId)

    return Promise.resolve()
  }

  private async validate(reservations: Reservation[]) {
    for (const reservation of reservations) {
      const hasConflictingReservation = await this.reservationRepository.hasConflictingReservation(reservation)
      if (hasConflictingReservation) {
        throw new Error("Conflito entre agendas")
      }
    }
  }
}

// editar reserva ok (api) (revisar erros de dominio, estao quebrando e nao mostra no api response)
// excluir reserva ok (api)
// recorrencia - ok
// ordenacao das salas no historicos
// adicionar elementos na reserva
// oq é o elemento e quem é o responsavel, pra preparar a sala
// email da propria instituicao
