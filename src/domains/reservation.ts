import { Room } from "./room";

export class Reservation {
  private room: Room;
  private userId: number;
  private startTime: Date;
  private endTime: Date;
  private status: string;
  private reason?: string;

  constructor(
    room: Room,
    userId: number,
    startTime: Date,
    endTime: Date,
    status: string,
    reason?: string
  ) {
    this.room = room;
    this.userId = userId;
    this.startTime = startTime;
    this.endTime = endTime;
    this.status = status;
    this.reason = reason;
  }
}
