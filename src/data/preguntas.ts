/**
 * Preguntas frecuentes, con el mensaje de marketplace (nov 2026).
 * Ojo: no prometer funciones que strix no tenga confirmadas ni decir que no
 * cobra comisión (sí la cobra).
 */
export interface Pregunta {
  pregunta: string;
  respuesta: string;
}

export const preguntas: Pregunta[] = [
  {
    pregunta: "¿Quién hace el delivery?",
    respuesta:
      "Tu propio equipo. strix no pone repartidores: vos definís las zonas, el costo de envío y los horarios, y el cliente también puede elegir pasar a retirar.",
  },
  {
    pregunta: "¿Cómo cobro los pedidos?",
    respuesta:
      "El cliente paga en la plataforma al hacer el pedido, así que te llega pago. Vos solo lo preparás y lo entregás.",
  },
  {
    pregunta: "¿Mis clientes tienen que descargar una app?",
    respuesta:
      "No. Entran desde el navegador del celular, ven tu menú y piden. Si quieren, pueden agregar el acceso directo a su pantalla de inicio.",
  },
  {
    pregunta: "¿Necesito integrar mi sistema de caja o POS?",
    respuesta:
      "No. strix funciona de forma independiente: los pedidos y los pagos los ves en el panel, sin tocar tu caja actual.",
  },
  {
    pregunta: "¿Puedo seguir usando la tarjeta de sellos?",
    respuesta:
      "Sí. Cada compra suma un sello y cada premio tiene un QR de uso único. Además podés lanzar campañas para los días flojos.",
  },
  {
    pregunta: "¿Qué pasa con los datos de mis clientes?",
    respuesta:
      "Los datos son tuyos. strix los usa únicamente para que vos puedas venderles y premiar a tus mejores clientes.",
  },
];
