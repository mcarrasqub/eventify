// Interface Definition
export interface VenueInterface {
  id: number;
  name: string;
  city: string;
  address: string;
  capacity: number;
  eventIds?: number[];
  imageURL?: string;
}
