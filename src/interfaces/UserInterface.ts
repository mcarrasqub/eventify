// Interface Definition
export interface UserInterface {
  id: number;
  name: string;
  email: string;
  password?: string;
  isAdmin: boolean;
  phone: string;
  eventIds?: number[];
  ticketIds?: number[];
}
