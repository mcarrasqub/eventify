// Interface Definition
export interface UserInterface {
  id: number;
  name: string;
  email: string;
  password?: string;
  isAdmin: boolean;
  phone: string;
  createdAt: string;
  updatedAt: string;
  eventIds?: number[];
  ticketIds?: number[];
}
