import { Reservation } from "../../../domains/reservation";
import { ReservationModel } from "../schemas/reservation-schema";
import { RoomRepository } from "./room-repository";
import moment from "moment-timezone";

export class ReservationRepository {

  private roomRepository: RoomRepository

  constructor(
    roomRepository: RoomRepository
  ) {
    this.roomRepository = roomRepository
  }

  public async save(reservation: Reservation, userId: string): Promise<void> {
    await ReservationModel.create({
      title: reservation.title,
      roomId: reservation.room.roomId,
      userId: userId,
      startDateTime: reservation.startDateTime,
      endDateTime: reservation.endDateTime,
      active: reservation.active,
      description: reservation.description
    })
    return Promise.resolve()
  }

  public async findOldReservations(
    page: number = 1, // Página atual
    limit: number = 50, // Limite de reservas por página
    filterDate?: Date, // Data específica para filtrar (opcional)
    startDate?: Date, // Data inicial do intervalo (opcional)
    endDate?: Date // Data final do intervalo (opcional)
  ): Promise<Reservation[]> {
    // Ajusta o fuso horário para a data atual, por exemplo, "America/Sao_Paulo"
    const currentDate = moment();
    console.log(currentDate)

    // Construção da query dinâmica
    let query: any = {
      endDateTime: { $lt: currentDate } // Reservas já finalizadas (antigas)
    };

    console.log(query)

    // Filtro por data específica
    if (filterDate) {
      query = {
        ...query,
        startDateTime: {
          $gte: moment(filterDate).startOf('day'), // Início do dia
          $lt: moment(filterDate).endOf('day') // Fim do dia
        }
      };
    }

    // Filtro por intervalo de datas
    if (startDate && endDate) {
      query = {
        ...query,
        startDateTime: { $gte: moment(startDate) }, // Data de início
        endDateTime: { $lte: moment(endDate) } // Data de término
      };
    }

    // Criação da query
    const queryExec = ReservationModel.find(query)
      .skip((page - 1) * limit)
      .limit(limit)
      .sort({ endDateTime: -1 }); // Ordena pela reserva mais antiga primeiro

    console.log(queryExec)

    // Executa a query
    const reservations = await queryExec.exec();

    // Mapeamento dos documentos para o domínio Reservation
    const mappedReservations: Reservation[] = [];

    for (const doc of reservations) {
      const room = await this.roomRepository.findRoomById(doc.roomId);
      const reservation = new Reservation(
        doc.title,
        room,
        doc.startDateTime,
        doc.endDateTime,
        doc.active,
        doc.description
      );
      mappedReservations.push(reservation);
    }

    return mappedReservations;
  }
}