import { Resource } from "../../../domains/resource";
import { Room } from "../../../domains/room";
import { RoomSchema } from "../schemas/room-schema";

export class RoomRepository {

  public async save(room: Room) {
    const resources = room.resources.map((resource: Resource) => ({
      name: resource.name,
      description: resource.description,
    }));

    const doc = new RoomSchema({
      name: room.name,
      userId: room.userId,
      type: room.type,
      capacity: room.capacity,
      location: {
        address: room.location.address,
        floor: room.location.floor,
        roomNumber: room.location.roomNumber,
        areaDescription: room.location.areaDescription,
        sector: room.location.sector
      },
      resources: resources,
      numberOfSeats: room.numberOfSeats
    })
    await doc.save()
  }
}