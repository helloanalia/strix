/**
 * Prefija la base del sitio a una ruta de /public.
 *
 * En GitHub Pages este sitio no vive en la raíz del dominio sino en /strix/,
 * así que una ruta absoluta como "/img/foo.webp" apuntaría a
 * helloanalia.github.io/img/foo.webp y daría 404.
 *
 * Astro le pone la base solo a lo que empaqueta él (el CSS y el JS de
 * _astro/*), pero NO a lo que sale de /public: eso hay que prefijarlo a mano.
 * Esta función es ese "a mano", en un solo lugar.
 *
 * Se normalizan las dos puntas antes de unirlas: `BASE_URL` puede venir con
 * barra final o sin ella según cómo esté escrito `base` en la config, y de ahí
 * salían rutas como "/strixdecor/onda.svg".
 */
export const ruta = (p: string) =>
  `${import.meta.env.BASE_URL.replace(/\/+$/, "")}/${p.replace(/^\/+/, "")}`;
