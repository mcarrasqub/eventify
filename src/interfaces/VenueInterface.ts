// Interface Definition
export interface VenueInterface {
  id: number;
  name: string;
  city: string;
  address: string;
  capacity: number;
  latitude?: number;
  longitude?: number;
  eventIds?: number[];
  imageURL?: string;
}
