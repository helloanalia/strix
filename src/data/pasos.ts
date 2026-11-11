/**
 * Los 4 pasos de "Configurás una vez / Vendés todos los días".
 * Copy del mensaje de marketplace (Figma Strix-WEB, copia de trabajo, nov 2026).
 *
 * `icono` referencia una de las formas definidas en ComoFunciona.astro.
 */
export interface Paso {
  numero: string;
  titulo: string;
  texto: string;
  icono: "paleta" | "escaneo" | "regalo" | "grafico";
}

export const pasos: Paso[] = [
  {
    numero: "01",
    titulo: "Cargás tu menú",
    icono: "paleta",
    texto: "Subís tus platos con foto y precio. Si algo se termina, lo pausás en un toque.",
  },
  {
    numero: "02",
    titulo: "Recibís pedidos online",
    icono: "escaneo",
    texto: "Take away o delivery con tu propio equipo de reparto.",
  },
  {
    numero: "03",
    titulo: "Cobrás en la plataforma",
    icono: "regalo",
    texto: "El cliente paga en la app al hacer el pedido. Menos efectivo, menos vueltas.",
  },
  {
    numero: "04",
    titulo: "Hacés que vuelvan",
    icono: "grafico",
    texto: "Sumás tarjeta de sellos y campañas para que el que pidió una vez, vuelva.",
  },
];
