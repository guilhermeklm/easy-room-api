import { Reservation } from "../domains/reservation";
import { CreateReservationDTO } from "../application/dtos/input/create-reservation-input"
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
      dto.startDateTime,
      dto.endDateTime,
      dto.description,
      true,
      dto.isRecurring,
      null
    )

    const reservationBaseId = await this.reservationRepository.save(reservationBase, userId)

    try {
      if (dto.isRecurring) {
        const start = moment(reservationBase.startDateTime, "DD-MM-YYYY, HH:mm");
        const end = moment(reservationBase.endDateTime, "DD-MM-YYYY, HH:mm");
        const startAux = moment(reservationBase.startDateTime).startOf('day')
        const endAux = moment(reservationBase.endDateTime).startOf('day')
        const recurrenceEnd = moment(dto.recurrence.endDate, 'DD-MM-YYYY');

        while (startAux.isSameOrBefore(recurrenceEnd)) {
          const dayOfWeek = startAux.day();
          
          if (dto.recurrence.selectedWeekdays.includes(dayOfWeek) && !start.isSame(reservationBase.startDateTime, 'day')) {
            reservations.push(new Reservation(
              null,
              reservationBase.title,
              reservationBase.room,
              moment(start, "DD-MM-YYYY, HH:mm").toDate(),
              moment(end, "DD-MM-YYYY, HH:mm").toDate(),
              reservationBase.description,
              false,
              true,
              reservationBaseId
            ));
          }

          startAux.add(1, 'days');
          endAux.add(1, 'days');
          start.add(1, 'days');
          end.add(1, 'days');
        }
      }

      await this.validate(reservations)
      await this.reservationRepository.saveAll(reservations, userId)

    } catch (error) {
      await this.reservationRepository.deleteByIdAndUserId(reservationBaseId, userId)
      throw error
    }
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

// oq é o elemento e quem é o responsavel, pra preparar a sala
// email da propria instituicao

// pegar empresas q tenham o mesmo produto e ver a disponibilidade
// dizer pq escolheu as tecnologias
