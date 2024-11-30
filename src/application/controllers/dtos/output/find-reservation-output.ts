export interface FindReservationOutputDTO {
  id: string
  title: string
  description: string
  startDateTime: string
  endDateTime: string
  roomName: string
  isRecurring: boolean
  isOriginal: boolean
  locationAddress: string
}