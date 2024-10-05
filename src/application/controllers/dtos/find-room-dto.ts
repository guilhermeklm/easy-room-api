export interface FindRoom {
  roomId: string;
  name: string;
  type: string;
  location: LocationDTO
  resources: ResourceDTO[]
  numberOfSeats: number
}

export interface LocationDTO {
  address: string;
  floor: number;
  roomLabel: string;
  areaDescription?: string;
  sector?: string;
}

export interface ResourceDTO {
  name: string;
  description: string;
}