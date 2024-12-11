export class Resource {
  private _name: string;
  private _description: string;
  private _quantity: number;

  constructor(name: string, description: string, quantity: number) {
    this._name = name;
    this._description = description;
    this._quantity = quantity;
    this.validate()
  }

  private validate() {
    if (!this.name) {
      throw Error("Nome não pode ser vazio")
    }

    if (!this.description) {
      throw Error("Descrição da sala não pode ser vazio")
    }
  }

  get name(): string {
    return this._name
  }

  get description(): string {
    return this._description
  }

  get quantity(): number {
    return this._quantity
  }
}
