export type Article = {
  id: string
  title: string
  category: string
  author: string
  date: string
  summary: string
  content: string
}

export const articles: Article[] = [
  {
    id: '1',
    title: 'Estrategias clave para optimizar la venta de boletería digital en eventos masivos',
    category: 'Boletería & Ticketing',
    author: 'Equipo Eventify Ops',
    date: '2026-10-15',
    summary: 'Aprende a gestionar preventas escalonadas, control de stock concurrente y generación de entradas seguras mediante QR.',
    content: 'La gestión de venta de boletería digital requiere un control estricto de concurrencia y asignación de asientos. Implementar fases de preventa escalonada (Early Bird y General) permite proyectar la demanda del aforo y optimizar la pasarela de pagos reduciendo la fricción durante el checkout. En Eventify, la validación dinámica mediante JWT protege contra duplicaciones y reventa.',
  },
  {
    id: '2',
    title: 'Cómo elegir y configurar el venue ideal: capacidad, logística y mapas interactivos',
    category: 'Gestión de Venues',
    author: 'Dirección de Escenarios',
    date: '2026-10-18',
    summary: 'Factores determinantes en la distribución de recintos, delimitación de zonas VIP/General y rutas de acceso.',
    content: 'La correcta configuración de un venue dentro del panel de administración de Eventify implica delimitar zonas de acceso, áreas VIP, salidas de emergencia y capacidad máxima permitida. Los mapas interactivos garantizan que tanto los asistentes como los equipos de producción y logística cuenten con una referencia espacial precisa del recinto.',
  },
  {
    id: '3',
    title: 'El impacto de las analíticas en tiempo real en la gestión de eventos y festivales',
    category: 'Métricas & Dashboard',
    author: 'Analítica Eventify',
    date: '2026-10-21',
    summary: 'Toma de decisiones operativa instantánea mediante gráficos de flujo de asistentes y velocidad de recaudación.',
    content: 'Monitorear la velocidad de ingreso y el escaneo de entradas en tiempo real permite mitigar cuellos de botella en las puertas de acceso. Nuestro dashboard traduce estas métricas en indicadores visuales inmediatos para la toma de decisiones operativas y reasignación de personal de seguridad y logística durante el evento.',
  },
]
