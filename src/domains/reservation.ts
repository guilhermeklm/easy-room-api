import { Room } from "./room";

export class Reservation {
  private _title: string;
  private _room: Room;
  private _userId: number;
  private _startTime: Date;
  private _endTime: Date;
  private _status: string;
  private _description?: string;

  constructor(
    title: string,
    room: Room,
    userId: number,
    startTime: Date,
    endTime: Date,
    status: string,
    description?: string
  ) {
    this._title = title;
    this._room = room;
    this._userId = userId;
    this._startTime = startTime;
    this._endTime = endTime;
    this._status = status;
    this._description = description;
  }
}
