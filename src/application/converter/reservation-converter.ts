import moment from "moment";
import { Reservation } from "../../domains/reservation";
import { FindReservationDTO } from "../controllers/dtos/find-reservation";

export class ReservationConverter {
  
  public static toFindReservationDto(reservations: Reservation[]) {
    let dto: FindReservationDTO[] = []
    for (const reservation of reservations) {
      dto.push(
        {
          id: reservation.id,
          title: reservation.title,
          description: reservation.description,
          startDateTime: moment(reservation.startDateTime).format("yyyy-MM-DD HH:mm").toString(),
          endDateTime: moment(reservation.endDateTime).format("yyyy-MM-DD HH:mm").toString(),
          roomName: reservation.room.name,
          locationAddress: reservation.room.location.address
        }
      )
    }
    return dto
  }
}