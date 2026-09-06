// Imports
import type { TicketInterface } from '@/interfaces/TicketInterface.js';

// DTO Definitions
export type CreateTicketDTO = Omit<TicketInterface, 'id'> & {
  quantity: number;
};
