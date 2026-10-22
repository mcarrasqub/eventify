export interface EventItem {
  id: string
  title: string
  description: string
  category: string
  date: string
  time: string
  duration: string
  price: number
  venue: string
  city: string
  status: 'Active' | 'Cancelled' | 'Completed'
}

export const events: EventItem[] = [
  {
    id: '1',
    title: 'Festival Estéreo Picnic 2026',
    description: 'El festival musical más grande de Colombia con artistas de talla internacional en múltiples escenarios.',
    category: 'Festival',
    date: '2026-11-20',
    time: '14:00',
    duration: '3 días',
    price: 650000,
    venue: 'Parque Simón Bolívar',
    city: 'Bogotá',
    status: 'Active',
  },
  {
    id: '2',
    title: 'Tech Summit & Web Architecture',
    description: 'Conferencia sobre desarrollo web moderno, microservicios, SSR, SSG y arquitecturas en la nube.',
    category: 'Tecnología',
    date: '2026-12-05',
    time: '09:00',
    duration: '8 horas',
    price: 180000,
    venue: 'Centro de Convenciones Ágora',
    city: 'Bogotá',
    status: 'Active',
  },
  {
    id: '3',
    title: 'Concierto Sinfónico: Noche de Bandas Sonoras',
    description: 'La Filarmónica interpreta las mejores bandas sonoras del cine clásico y contemporáneo en una noche inolvidable.',
    category: 'Concierto',
    date: '2026-12-18',
    time: '20:00',
    duration: '2.5 horas',
    price: 95000,
    venue: 'Teatro Mayor Julio Mario Santo Domingo',
    city: 'Bogotá',
    status: 'Active',
  },
]
