// Interface Definition
export interface UserInterface {
  id: number;
  name: string;
  email: string;
  password?: string;
  isAdmin: boolean;
  role?: 'admin' | 'user';
  phone: string;
}
