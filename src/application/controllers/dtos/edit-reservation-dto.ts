export interface EditReservationDTO {
  id: string,
  title: string,
  roomId: string,
  startDateTime: string,
  endDateTime: string,
  description: string
  applyToAll: boolean
}