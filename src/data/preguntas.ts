/**
 * Preguntas frecuentes.
 * Copy tomada de strix.fan/#faq (el sitio en producción), no inventada.
 */
export interface Pregunta {
  pregunta: string;
  respuesta: string;
}

export const preguntas: Pregunta[] = [
  {
    pregunta: "¿Necesito integrar mi sistema de caja o POS?",
    respuesta:
      "No. strix funciona de forma independiente — no requiere integración con tu POS actual.",
  },
  {
    pregunta: "¿Mis clientes tienen que descargar una app?",
    respuesta:
      "Los clientes acceden desde el navegador de su celular — sin descarga, sin fricción. Pueden elegir agregar el acceso directo a su pantalla de inicio para mayor comodidad.",
  },
  {
    pregunta: "¿En qué se diferencia strix de otras opciones del mercado?",
    respuesta:
      "Cada sello se valida contra una compra real vía QR de factura — no se puede acumular sin haber comprado, a diferencia de los sistemas de sellos manuales.",
  },
  {
    pregunta: "¿Cuánto tiempo lleva configurar todo?",
    respuesta:
      "Menos de cinco minutos: elegís cuántas visitas necesita la tarjeta, subís tu logo y ya podés empezar a sumar sellos.",
  },
  {
    pregunta: "¿Qué pasa con los datos de mis clientes?",
    respuesta:
      "Los datos son tuyos. strix los usa únicamente para que vos puedas identificar y premiar a tus mejores clientes.",
  },
];
