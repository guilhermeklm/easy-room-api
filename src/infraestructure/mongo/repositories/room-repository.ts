import { Location } from "../../../domains/location";
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
        roomLabel: room.location.roomLabel,
        areaDescription: room.location.areaDescription,
        sector: room.location.sector
      },
      resources: resources,
      numberOfSeats: room.numberOfSeats
    });
  }

  public async findRoomById(roomId: string, userId: string): Promise<Room> {
    const doc = await RoomModel.findOne({
      _id: roomId,
      userId: userId
    })

    if (!doc) {
      return null
    }

    const resources: Resource[] = doc.resources ? doc.resources.map((resource) => {
      return new Resource(resource.name, resource.description)
    }) : [];

    return Promise.resolve(new Room(
      doc._id.toString(),
      doc.userId,
      doc.name,
      doc.type,
      new Location(
        doc.location.address,
        doc.location.floor,
        doc.location.roomLabel,
        doc.location.areaDescription,
        doc.location.sector,
      ),
      resources,
      doc.numberOfSeats
    ))
  }

  public async findRoomsByUserId(userId: string): Promise<Room[]> {
    let rooms: Room[] = []
    const doc = await RoomModel.find({
      userId: userId
    })

    if (!doc) {
      return rooms
    }

    doc.map(room => {
      const resources: Resource[] = room.resources ? room.resources.map((resource) => {
        return new Resource(resource.name, resource.description)
      }) : [];

      rooms.push(new Room(
        room.id,
        userId,
        room.name,
        room.type,
        new Location(
          room.location.address,
          room.location.floor,
          room.location.roomLabel,
          room.location.areaDescription,
          room.location.sector
        ),
        resources,
        room.numberOfSeats
      ))
    })

    return rooms
  }
}