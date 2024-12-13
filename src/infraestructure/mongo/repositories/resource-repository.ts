import { Resource } from "../../../domains/resource";

export class ResourceRepository {

  public getBasicResources() {
    return [
      new Resource('Quadro Branco', 'Quadro para anotações', null ),
    ];
  }
}