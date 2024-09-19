const dictionary = require("../../dictionary/pt.json");

interface ApiError {
  type: TypeErr;
  messageKey: string;
}

export class ApiResponse<T> {
  private _statusCode: number;
  private _messages: string[];
  private _data: T | null;

  constructor(
    data: T | null,
    _messageKeys: string[] = [],
    errors: ApiError[] = []
  ) {
    this._messages = this.buildMessages(_messageKeys, errors);
    this._data = data;
    this._statusCode = this.determineStatusCode(errors);
  }

  private buildMessages(messageKeys: string[], errors: ApiError[]): string[] {
    if (messageKeys && messageKeys.length > 0) {
      return messageKeys.map((messageKey) => dictionary[messageKey]);
    }

    if (errors && errors.length > 0) {
      return errors.map((error) => dictionary[error.messageKey]);
    }

    return [];
  }

  private determineStatusCode(errors: ApiError[]): number {
    if (errors.some((error) => error.type === TypeErr.BUSINESS_ERROR)) {
      return 400;
    }
    if (
      errors.some((error) => error.type === TypeErr.DATABASE_CONNECTION_ERROR)
    ) {
      return 500;
    }
    if (
      errors.some((error) =>
        [TypeErr.RECORD_NOT_FOUND_ERROR, TypeErr.NOT_FOUND_ERROR].includes(
          error.type
        )
      )
    ) {
      return 404;
    }
    if (errors.some((error) => error.type === TypeErr.AUTHENTICATION_ERROR)) {
      return 401;
    }
    if (errors.some((error) => error.type === TypeErr.AUTHORIZATION_ERROR)) {
      return 403;
    }
    if (errors.some((error) => error.type === TypeErr.VALIDATION_ERROR)) {
      return 422;
    }
    return 500;
  }

  public addMessage(message: string) {
    this._messages.push(message);
  }

  public get messages(): string[] {
    return this._messages;
  }

  public get data(): T | null {
    return this._data;
  }

  public get statusCode(): number {
    return this._statusCode;
  }

  public static success<T>(data: T, messages: string[] = []): ApiResponse<T> {
    return new ApiResponse<T>(data, messages);
  }

  public static error<T>(errors: ApiError[]): ApiResponse<T> {
    return new ApiResponse<T>(null, undefined, errors);
  }
}
