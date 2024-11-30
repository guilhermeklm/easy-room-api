import moment from "moment";
import { Room } from "./room";

export class Reservation {
  private _id: string;
  private _title: string;
  private _room: Room;
  private _startDateTime: Date;
  private _endDateTime: Date;
  private _description: string;
  private _isOriginal: boolean;
  private _isRecurring: boolean;
  private _recurrenceParentId: string;

  constructor(
    id: string,
    title: string,
    room: Room,
    startDateTime: string | Date,
    endDateTime: string | Date,
    description: string,
    isOriginal: boolean,
    isRecurring: boolean,
    recurrenceParentId: string
  ) {
    this._id = id;
    this._title = title;
    this._room = room;
    this._startDateTime = this.buildDate(startDateTime);
    this._endDateTime = this.buildDate(endDateTime);
    this._description = description;
    this._isRecurring = isRecurring ? isRecurring : false;
    this._isOriginal = isOriginal ? isOriginal : false;
    this._recurrenceParentId = recurrenceParentId;
    this.validate();
  }

  public update(reservation: Reservation) {
    this._title = reservation.title;
    this._room = reservation.room;
    this._startDateTime = this.buildDate(reservation.startDateTime);
    this._endDateTime = this.buildDate(reservation.endDateTime);
    this._description = reservation.description;
  }

  private buildDate(dateString: string | Date): Date {
    return moment(dateString, 'DD-MM-YYYY, HH:mm').toDate();
  }

  private validate() {
    if (!this.title) throw new Error("Título não pode ser vazio");
    if (!this.room) throw new Error("Sala não pode ser vazia");
    if (!this.startDateTime) throw new Error("Data e hora inicial não podem ser vazias");
    if (!this.isValidDate(this.startDateTime)) throw new Error(`Data hora inicial não é uma data válida.`);
    if (!this.isValidDate(this.endDateTime)) throw new Error(`Data hora final não é uma data válida.`);
    if (!this.endDateTime) throw new Error("Data e hora final não podem ser vazias");
    if (this.startDateTime >= this.endDateTime) throw new Error("Data e hora de início não podem ser maior ou igual à data e hora de término");
    if (this.description && this.description.trim() === "") throw new Error("Descrição não pode ser uma string vazia");
    if (!this.isOriginal && this.isRecurring && !this.recurrenceParentId) throw new Error("Reservas recorrentes devem ter um ID de referência para a reserva original.");
  }

  public get id(): string { return this._id; }
  public get title(): string { return this._title; }
  public get room(): Room { return this._room; }
  public get startDateTime(): Date { return this._startDateTime; }
  public get endDateTime(): Date { return this._endDateTime; }
  public get description(): string | undefined { return this._description; }
  public get isOriginal(): boolean { return this._isOriginal; }
  public get isRecurring(): boolean { return this._isRecurring; }
  public get recurrenceParentId(): string | undefined { return this._recurrenceParentId; }

  public isValidDate(date: Date): boolean {
    if (isNaN(date.getTime())) {
      return false;
    }
    return true;
  }
}
