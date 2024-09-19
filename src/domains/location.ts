export class Location {
  private _address: string;
  private _floor: number;
  private _roomNumber?: string;
  private _areaDescription?: string;
  private _sector?: string;

  constructor(
    address: string,
    floor: number,
    roomNumber?: string,
    areaDescription?: string,
    sector?: string
  ) {
    this._address = address;
    this._floor = floor;
    this._sector = sector;
    this._roomNumber = roomNumber;
    this._areaDescription = areaDescription;
  }

  get address(): string {
    return this._address;
  }

  get floor(): number {
    return this._floor;
  }

  get roomNumber(): string | undefined {
    return this._roomNumber;
  }

  get areaDescription(): string | undefined {
    return this._areaDescription;
  }

  get sector(): string | undefined {
    return this._sector;
  }
}
