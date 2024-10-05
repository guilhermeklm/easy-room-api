import { Room } from "./room";

export class Reservation {
  private _title: string;
  private _room: Room;
  private _userId: number;
  private _startDateTime: Date;
  private _endDateTime: Date;
  private _status: string;
  private _description?: string;

  constructor(
    title: string,
    room: Room,
    userId: number,
    startDateTime: Date,
    endDateTime: Date,
    status: string,
    description?: string
  ) {
    this._title = title;
    this._room = room;
    this._userId = userId;
    this._startDateTime = startDateTime;
    this._endDateTime = endDateTime;
    this._status = status;
    this._description = description;
  }

  public get title(): string {
    return this._title;
  }

  public get room(): Room {
    return this._room;
  }

  public get userId(): number {
    return this._userId;
  }

  public get startDateTime(): Date {
    return this._startDateTime;
  }

  public get endDateTime(): Date {
    return this._endDateTime;
  }

  public get status(): string {
    return this._status;
  }

  public get description(): string | undefined {
    return this._description;
  }
}
