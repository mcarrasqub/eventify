// Interface Definition
export interface UserInterface {
  id: number;
  name: string;
  email: string;
  password?: string;
  role: 'admin' | 'user';
  phone: string;
  eventIds?: number[];
  ticketIds?: number[];
}
