export class DomainError extends Error {
  private _keyMessage: string;
  private _type: TypeErr;

  constructor(keyMessage: string, typeError: TypeErr) {
    super();
    this._keyMessage = keyMessage;
    this._type = typeError;
  }

  get keyMessage(): string {
    return this._keyMessage;
  }

  get type(): TypeErr {
    return this._type;
  }
}
