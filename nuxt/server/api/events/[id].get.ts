// Imports
import { events } from '../../data/events';

export default defineEventHandler((event) => {
  const id = getRouterParam(event, 'id')
  const foundEvent = events.find((e) => e.id === Number(id))

  if (!foundEvent) {
    throw createError({
      statusCode: 404,
      statusMessage: 'Evento no encontrado',
    })
  }

  return foundEvent
})
