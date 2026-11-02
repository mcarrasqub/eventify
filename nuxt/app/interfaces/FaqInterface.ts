export interface FaqInterface {
  id?: number;
  question: string;
  answer: string;
  category?: 'attendees' | 'organizers';
  targetRoute?: string;
}
