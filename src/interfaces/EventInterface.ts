// Interface Definition
export interface EventInterface {
  id: number;
  imageURL: string;
  title: string;
  description: string;
  type: string;
  category: string;
  date: string;
  time: string;
  duration: string;
  price: number;
  status: 'Active' | 'Cancelled' | 'Completed';
  venueId: number;
  ticketIds?: number[];
}
