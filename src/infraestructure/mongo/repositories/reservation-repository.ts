import { Reservation } from "../../../domains/reservation";
import { ReservationModel } from "../schemas/reservation-schema";

export class ReservationRepository {
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
}