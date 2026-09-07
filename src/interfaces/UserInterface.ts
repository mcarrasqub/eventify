// Types
export type UserRole = 'admin' | 'user';

// Interface Definition
export interface UserInterface {
  id: number;
  name: string;
  email: string;
  password?: string;
  role: UserRole;
  phone: string;
}
