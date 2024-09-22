export class User {
  private _id: string;
  private _name: string;
  private _email: string;
  private _password: string;

  constructor(id: string, name: string, email: string, password: string) {
    this._id = id;
    this._name = name;
    this._email = email;
    this._password = password;
    this.validate()
  }

  private validate() {
    if(!this.name) {
      throw Error("Nome nao pode ser vazio")
    }

    if(!this.email) {
      throw Error("Email nao pode ser vazio")
    }

    if(!this.password) {
      throw Error("Senha nao pode ser vazio")
    }
  }

  get id(): string {
    return this._id;
  }

  get name(): string {
    return this._name;
  }

  get email(): string {
    return this._email;
  }

  get password(): string {
    return this._password;
  }
}
