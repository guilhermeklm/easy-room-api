import { Room } from "./room";

export class Reservation {
  private _id: string;
  private _title: string;
  private _room: Room;
  private _startDateTime: Date;
  private _endDateTime: Date;
  private _description?: string;

  constructor(
    id: string,
    title: string,
    room: Room,
    startDateTime: string | Date,
    endDateTime: string | Date,
    description?: string
  ) {
    this._id = id;
    this._title = title;
    this._room = room;
    this._startDateTime = this.buildDate(startDateTime);
    this._endDateTime = this.buildDate(endDateTime);
    this._description = description;
    this.validate();
  }

  private buildDate(dateString: string | Date): Date {
    const parsedDate = new Date(dateString);
    if (isNaN(parsedDate.getTime())) {
      throw new Error(`"${dateString}" não é uma data válida.`);
    }
    return parsedDate;
  }

  private validate() {
    if (!this._title) throw new Error("Título não pode ser vazio");
    if (!this._room) throw new Error("Sala não pode ser vazia");
    if (!this._startDateTime) throw new Error("Data e hora inicial não podem ser vazias");
    if (!this._endDateTime) throw new Error("Data e hora final não podem ser vazias");
    if (this._startDateTime >= this._endDateTime) throw new Error("Data e hora de início não podem ser maior ou igual à data e hora de término");
    if (this._description && this._description.trim() === "") throw new Error("Descrição não pode ser uma string vazia");
  }

  public get id(): string { return this._id; }
  public get title(): string { return this._title; }
  public get room(): Room { return this._room; }
  public get startDateTime(): Date { return this._startDateTime; }
  public get endDateTime(): Date { return this._endDateTime; }
  public get description(): string | undefined { return this._description; }
}
