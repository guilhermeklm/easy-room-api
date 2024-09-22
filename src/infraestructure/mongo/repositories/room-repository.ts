import { Resource } from "../../../domains/resource";
import { Room } from "../../../domains/room";
import { RoomModel } from "../schemas/room-schema";

export class RoomRepository {

  public async save(room: Room): Promise<void> {
    const resources = room.resources ? room.resources.map((resource: Resource) => {
      return {
        name: resource.name,
        description: resource.description
      };
    }) : [];

    await RoomModel.create({
      name: room.name,
      userId: room.userId,
      type: room.type,
      location: {
        address: room.location.address,
        floor: room.location.floor,
        roomNumber: room.location.roomNumber,
        areaDescription: room.location.areaDescription,
        sector: room.location.sector
      },
      resources: resources,
      numberOfSeats: room.numberOfSeats
    });
  }
}