/**
 * Los 4 pasos de "Configurás una vez / Funciona solo".
 * Copy provista por Analía (el Figma tenía los cuatro pasos en placeholder).
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
    titulo: "Armás tu tarjeta",
    icono: "paleta",
    texto:
      "Elegís cuántas visitas necesita tu cliente para ganarse el premio. Ponés tu logo y listo en menos de cinco minutos.",
  },
  {
    numero: "02",
    titulo: "El cliente escanea",
    icono: "escaneo",
    // OJO: este texto termina con la misma frase que el paso 01 ("Ponés tu
    // logo y listo en menos de cinco minutos"), que acá no viene a cuento.
    // Parece un resto de copiar y pegar; queda tal cual vino hasta confirmar.
    texto:
      "Cada vez que vuelve, escanea el QR de su ticket y el sello queda registrado. Ponés tu logo y listo en menos de cinco minutos.",
  },
  {
    numero: "03",
    titulo: "Premiás cuando importa",
    icono: "regalo",
    texto:
      "Al completar la tarjeta recibe su recompensa. Pero también podés mandarle un regalo antes de que lo espere — ese tipo de gesto no se olvida.",
  },
  {
    numero: "04",
    titulo: "Ves quién es quién",
    icono: "grafico",
    texto:
      "El dashboard te muestra quiénes vienen seguido, cuánto gastan y hace cuánto no aparecen. Con eso decidís a quién premiar y cuándo mover el juego.",
  },
];
