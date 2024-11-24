export class FindReservation {
  private _rooms: string[];

  constructor(
    rooms: string[],
  ) {
    this._rooms = rooms;
  }

  get rooms(): string[] {
    return this._rooms;
  }
}
