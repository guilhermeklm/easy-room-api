import { Resource } from "../../../domains/resource";

export class ResourceRepository {

  public getBasicResources() {
    return [
      new Resource('Projetor', 'Projetor para apresentações', null),
      new Resource('Quadro Branco', 'Quadro para anotações', null ),
    ];
  }
}