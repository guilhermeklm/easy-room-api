import { Room } from "../domains/room";
import { CreateRoomDTO, ResourceDTO } from "../application/dtos/input/create-room-dto"
import { RoomRepository } from "../infraestructure/mongo/repositories/room-repository";
import { Location } from "../domains/location";
import { ResourceRepository } from "../infraestructure/mongo/repositories/resource-repository";
import { Resource } from "../domains/resource";

export class CreateRoom {

  private roomRepository: RoomRepository;
  private resourceRepository: ResourceRepository

  constructor(
    roomRepository: RoomRepository,
    resourceRepository: ResourceRepository
  ) {
    this.roomRepository = roomRepository;
    this.resourceRepository = resourceRepository;
  }

  public async create(createRoomDTO: CreateRoomDTO): Promise<Room> {
    if(!createRoomDTO.location) {
      throw new Error("Local da sala é obrigatorio")
    }

    const location = new Location(
      createRoomDTO.location.address,
      createRoomDTO.location.floor,
      createRoomDTO.location.roomLabel,
      createRoomDTO.location.areaDescription,
      createRoomDTO.location.sector
    );
    
    let resources = this.resourceRepository.getBasicResources()
    
    if(createRoomDTO.additionalResources && createRoomDTO.additionalResources.length > 0) {
      createRoomDTO.additionalResources.forEach((additionalResource: ResourceDTO) => {
        resources.push(new Resource(additionalResource.name, additionalResource.description, additionalResource.quantity))
      })
    }

    const room = new Room(
      null,
      createRoomDTO.name,
      createRoomDTO.type,
      location,
      resources,
      createRoomDTO.numberOfSeats,
      null,
    )

    await this.roomRepository.save(room);

    return Promise.resolve(room)
  }
}