// Imports
import type { UserInterface } from '@/interfaces/UserInterface.js';

//DTO Definitions
export type LoginDTO = Pick<UserInterface, 'email' | 'password'>;

export type UserResponseDTO = Omit<UserInterface, 'password'>;
