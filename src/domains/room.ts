import { Location } from "./location";
import { Resource } from "./resource";

export enum TypeRoom {
  MEETING_ROOM = "MEETING_ROOM",
  AUDITORY = "AUDITORY",
}

export class Room {
  private _roomId: string;
  private _name: string;
  private _type: TypeRoom;
  private _location: Location;
  private _resources: Resource[];
  private _numberOfSeats: number;
  private _image: string;

  constructor(
    roomId: string,
    name: string,
    type: string,
    location: Location,
    resources: Resource[],
    numberOfSeats: number,
    image: string
  ) {
    this._roomId = roomId;
    this._name = name;
    this._type = TypeRoom[type as keyof typeof TypeRoom];
    this._location = location;
    this._resources = resources;
    this._numberOfSeats = numberOfSeats;
    this._image = image
    this.validate()
  }

  public validate() {
    if (!this.name) {
      throw Error("Nome nao pode ser vazio")
    }

    if (!this.type) {
      throw Error("Tipo da sala nao pode ser vazio")
    }

    if (!this.location) {
      throw Error("Local nao pode ser vazio")
    }

    if (this.resources == null || this.resources.length == 0) {
      throw Error("Recursos nao pode ser vazio")
    }

    if (!this.numberOfSeats) {
      throw Error("Numero de cadeiras nao pode ser vazio")
    }
  }

  get roomId(): string {
    return this._roomId;
  }

  get name(): string {
    return this._name;
  }

  get type(): TypeRoom {
    return this._type;
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
