// DTO Definitions
export interface CreateTicketDTO {
  eventId: number;
  quantity: number;
}

export interface EventRevenueDTO {
  eventId: number;
  eventTitle: string;
  revenue: number;
}

export interface TicketDistributionDTO {
  eventId: number | null;
  eventTitle: string;
  sold: number;
  available: number;
}
