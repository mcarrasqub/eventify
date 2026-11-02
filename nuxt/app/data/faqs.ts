// Imports
import type { FaqInterface } from '../interfaces/FaqInterface';

// Variables
export const attendeeFaqs: FaqInterface[] = [
  {
    id: 1,
    question: '¿Cómo accedo a mis entradas compradas?',
    answer:
      'Una vez confirmada la compra, tus entradas con código QR único se envían de inmediato a tu correo registrado y quedan disponibles en tu cuenta de Eventify.',
    category: 'attendees',
    targetRoute: '/faq/faq-attendees',
  },
  {
    id: 2,
    question: '¿Puedo transferir mi entrada a otra persona?',
    answer:
      'Sí. Puedes ceder tu entrada hasta 24 horas antes del inicio del evento, indicando el correo y el documento de identidad del nuevo titular.',
    category: 'attendees',
    targetRoute: '/faq/faq-attendees',
  },
  {
    id: 3,
    question: '¿Cómo solicito una cancelación o un reembolso?',
    answer:
      'Debes enviar la solicitud con al menos 7 días de anticipación al evento. Se aplicará la retención administrativa indicada en los términos de compra.',
    category: 'attendees',
    targetRoute: '/faq/faq-attendees',
  },
  {
    id: 4,
    question: '¿Qué debo presentar en el acceso al evento?',
    answer:
      'Tu documento de identidad original y el código QR de tu entrada, ya sea en el teléfono celular o impreso de forma legible.',
    category: 'attendees',
    targetRoute: '/faq/faq-attendees',
  },
];

export const organizerFaqs: FaqInterface[] = [
  {
    id: 5,
    question: '¿Cómo publico un evento y configuro distintas localidades?',
    answer:
      'Desde el panel de organizador puedes definir el aforo máximo, crear tipos de entrada (General, VIP, Preventa) y configurar las fechas de venta.',
    category: 'organizers',
    targetRoute: '/faq/faq-organizers',
  },
  {
    id: 6,
    question: '¿Cómo funciona la validación de boletos en las puertas del recinto?',
    answer:
      'Puedes sincronizar los dispositivos móviles de tu personal de staff con nuestra aplicación de escaneo QR, la cual opera incluso con conectividad intermitente.',
    category: 'organizers',
    targetRoute: '/faq/faq-organizers',
  },
  {
    id: 7,
    question: '¿Cuándo se transfiere el dinero recaudado de las entradas?',
    answer:
      'Los organizadores verificados pueden solicitar anticipos del 40% durante la preventa, y la liquidación final se desembolsa 48 horas hábiles tras culminar el evento.',
    category: 'organizers',
    targetRoute: '/faq/faq-organizers',
  },
  {
    id: 8,
    question: '¿Cuánto cobra Eventify por cada entrada vendida?',
    answer:
      'Una comisión competitiva de entre el 5% y el 10% por entrada vendida según el plan acordado, sin costos ocultos de configuración.',
    category: 'organizers',
    targetRoute: '/faq/faq-organizers',
  },
];

export const allFaqs: FaqInterface[] = [...attendeeFaqs, ...organizerFaqs];
