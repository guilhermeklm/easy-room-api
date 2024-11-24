export interface CreateRoomDTO {
  name: string;
  type: string;
  numberOfSeats: number;
  location: LocationDTO;
  additionalResources: ResourceDTO[];
}

export interface ResourceDTO {
  name: string;
  description: string;
}

export interface LocationDTO {
  address: string;
  floor: number;
  roomLabel?: string;
  areaDescription?: string;
  sector?: string;
}