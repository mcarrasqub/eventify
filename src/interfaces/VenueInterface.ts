// Interface Definition
export interface VenueInterface {
  id: number;
  imageURL: string;
  name: string;
  city: string;
  address: string;
  capacity: number;
  eventIds?: number[];
}
