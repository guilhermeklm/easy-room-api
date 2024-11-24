export interface CreateReservationDTO {
  title: string,
  roomId: string,
  startDateTime: string,
  endDateTime: string,
  description: string,
  isRecurring: boolean,
  recurrence: RecurrenceDTO
}

export interface RecurrenceDTO {
  endDate: Date
  selectedWeekdays: Number[]
}