import { FindReservation } from "src/domains/find-reservation";
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

  public async updateOne(reservation: Reservation, userId: string) {
    await ReservationModel.updateOne({
      _id: reservation.id,
      userId: userId
    },
      {
        $set: {
          title: reservation.title,
          roomId: reservation.room.roomId,
          startDateTime: reservation.startDateTime,
          endDateTime: reservation.endDateTime,
          description: reservation.description,
          updatedAt: moment().toDate(),
        },
      }
    )
  }

  public async updateReservationAndRecurrences(reservation: Reservation, userId: string) {
    await ReservationModel.updateMany(
      {
        $or: [
          { _id: reservation.id },
          { recurrenceParentId: reservation.recurrenceParentId },
        ],
        userId: userId,
      },
      {
        $set: {
          title: reservation.title,
          roomId: reservation.room.roomId,
          description: reservation.description,
          updatedAt: moment().toDate(),
        },
      }
    );
  }

  public async deleteByIdAndUserId(id: string, userId: string) {
    await ReservationModel.deleteOne({
      _id: id,
      userId: userId
    })
  }

  public async delete(reservation: Reservation) {
    await ReservationModel.deleteOne({
      _id: reservation.id,
    })
  }

  public async findBaseReservationByRecurringReservationId(recurringReservationId: string) {
    const recurringReservation = await ReservationModel.findOne({
      _id: recurringReservationId
    })

    if (recurringReservation) {
      const baseRecurring = await ReservationModel.findOne({
        _id: recurringReservation.recurrenceParentId
      })

      if (baseRecurring) {
        const room = await this.roomRepository.findRoomById(baseRecurring.roomId);
        return new Reservation(
          baseRecurring.id,
          baseRecurring.title,
          room,
          baseRecurring.startDateTime,
          baseRecurring.endDateTime,
          baseRecurring.description,
          baseRecurring.isOriginal,
          baseRecurring.isRecurring,
          baseRecurring.recurrenceParentId,
        )
      }
    }
    return null
  }

  public async deleteReservationAndSubsequentEvents(reservationToDelete: Reservation) {
    const baseQuery = { _id: reservationToDelete.id };

    const filters: any[] = [baseQuery];

    const dateFilter = { startDateTime: { $gte: new Date(reservationToDelete.startDateTime) } };

    if (reservationToDelete.isOriginal) {
      filters.push(dateFilter);
    } else {
      filters.push({ ...dateFilter, recurrenceParentId: reservationToDelete.recurrenceParentId });
    }

    const query = { $or: filters };

    await ReservationModel.deleteMany(query);
  }



  public async findByIdAndUserId(id: string, userId: string): Promise<Reservation> {
    const doc = await ReservationModel.findOne({
      _id: id,
      userId: userId
    })

    if (doc) {
      const room = await this.roomRepository.findRoomById(doc.roomId);
      return new Reservation(
        id,
        doc.title,
        room,
        doc.startDateTime,
        doc.endDateTime,
        doc.description,
        doc.isOriginal,
        doc.isRecurring,
        doc.recurrenceParentId,
      )
    }

    return Promise.resolve(null)
  }

  public async save(reservation: Reservation, userId: string): Promise<string> {
    const resultSave = await ReservationModel.create({
      title: reservation.title,
      roomId: reservation.room.roomId,
      userId: userId,
      startDateTime: reservation.startDateTime,
      endDateTime: reservation.endDateTime,
      description: reservation.description,
      isRecurring: reservation.isRecurring,
      isOriginal: reservation.isOriginal,
      recurrenceParentId: reservation.recurrenceParentId
    })
    return Promise.resolve(resultSave.id)
  }

  public async saveAll(reservations: Reservation[], userId: string): Promise<void> {
    for (const element of reservations) {
      await ReservationModel.create({
        title: element.title,
        roomId: element.room.roomId,
        userId: userId,
        startDateTime: element.startDateTime,
        endDateTime: element.endDateTime,
        description: element.description,
        isRecurring: element.isRecurring,
        recurrenceParentId: element.recurrenceParentId
      })
    }
    return Promise.resolve()
  }

  public async hasConflictingReservation(newReservation: Reservation): Promise<boolean> {
    const conflictingReservation = await ReservationModel.findOne({
      roomId: newReservation.room.roomId,
      $or: [
        {
          startDateTime: { $lt: newReservation.endDateTime },
          endDateTime: { $gt: newReservation.startDateTime }
        }
      ]
    });

    return conflictingReservation !== null;
  }

  public async findReservations(filter: FindReservation): Promise<Reservation[]> {
    const filterQuery: any = {};

    if (filter.rooms && filter.rooms.length > 0) {
      filterQuery.roomId = { $in: filter.rooms };
    }

    const docs = await ReservationModel.find(filterQuery);

    const mappedReservations: Reservation[] = [];

    for (const doc of docs) {
      const room = await this.roomRepository.findRoomById(doc.roomId);
      const reservation = new Reservation(
        doc.id,
        doc.title,
        room,
        doc.startDateTime,
        doc.endDateTime,
        doc.description,
        doc.isOriginal,
        doc.isRecurring,
        doc.recurrenceParentId
      );
      mappedReservations.push(reservation);
    }

    return mappedReservations;
  }

  public async listAllReservation(): Promise<Reservation[]> {
    const reservations = await ReservationModel.find().exec();

    const mappedReservations: Reservation[] = [];

    for (const doc of reservations) {
      const room = await this.roomRepository.findRoomById(doc.roomId);
      const reservation = new Reservation(
        doc.id,
        doc.title,
        room,
        doc.startDateTime,
        doc.endDateTime,
        doc.description,
        doc.isOriginal,
        doc.isRecurring,
        doc.recurrenceParentId
      );
      mappedReservations.push(reservation);
    }

    return Promise.resolve(mappedReservations);
  }

  public async findOldReservations(
    page: number = 1, // Página atual
    limit: number = 50, // Limite de reservas por página
    filterDate?: Date, // Data específica para filtrar (opcional)
    startDate?: Date, // Data inicial do intervalo (opcional)
    endDate?: Date // Data final do intervalo (opcional)
  ): Promise<Reservation[]> {
    const currentDate = moment();

    let query: any = {
      endDateTime: { $lt: currentDate } // Reservas já finalizadas (antigas)
    };


    if (filterDate) {
      query = {
        ...query,
        startDateTime: {
          $gte: moment(filterDate).startOf('day'), // Início do dia
          $lt: moment(filterDate).endOf('day') // Fim do dia
        }
      };
    }

    if (startDate && endDate) {
      query = {
        ...query,
        startDateTime: { $gte: moment(startDate) }, // Data de início
        endDateTime: { $lte: moment(endDate) } // Data de término
      };
    }

    const queryExec = ReservationModel.find(query)
      .skip((page - 1) * limit)
      .limit(limit)
      .sort({ endDateTime: -1 });

    const reservations = await queryExec.exec();

    const mappedReservations: Reservation[] = [];

    for (const doc of reservations) {
      const room = await this.roomRepository.findRoomById(doc.roomId);
      const reservation = new Reservation(
        doc.id,
        doc.title,
        room,
        doc.startDateTime,
        doc.endDateTime,
        doc.description,
        doc.isOriginal,
        doc.isRecurring,
        doc.recurrenceParentId
      );
      mappedReservations.push(reservation);
    }

    return Promise.resolve(mappedReservations);
  }
}