import { Location } from "./location";
import { Resource } from "./resource";

export enum TypeRoom {
  MEETING_ROOM,
  AUDITORY,
}

export class Room {
  private _roomId: number;
  private _userId: number;
  private _name: string;
  private _type: TypeRoom;
  private _capacity: number;
  private _location: Location;
  private _resources: Resource[];
  private _numberOfSeats: number;

  constructor(
    roomId: number,
    userId: number,
    name: string,
    type: TypeRoom,
    capacity: number,
    location: Location,
    resources: Resource[],
    numberOfSeats: number
  ) {
    this._roomId = roomId;
    this._userId = userId;
    this._name = name;
    this._type = type;
    this._capacity = capacity;
    this._location = location;
    this._resources = resources;
    this._numberOfSeats = numberOfSeats;
  }

  get roomId(): number {
    return this._roomId;
  }

  get userId(): number {
    return this._userId;
  }

  get name(): string {
    return this._name;
  }

  get type(): TypeRoom {
    return this._type;
  }

  get capacity(): number {
    return this._capacity;
  }

  get location(): Location {
    return this._location;
  }

  get resources(): Resource[] {
    return this._resources;
  }

  get numberOfSeats(): number {
    return this._numberOfSeats;
  }
}
