# strix — landing

Landing de una página para **strix**, el programa de fidelización de clientes.
Réplica del diseño de Figma `Strix web` (frame `Strix-one page`, 1440 × 8448).

## Stack

- **Astro** (sitio estático — genera HTML real, importante porque acá el SEO es el producto)
- **React** disponible vía `@astrojs/react` para lo que necesite estado
- **TypeScript** en modo estricto
- Sin backend, sin base de datos. El sitio son archivos estáticos.

**Costo de hosting: $0.** Se publica gratis en Vercel, Netlify, Cloudflare Pages
o GitHub Pages. Lo único que costaría plata es un dominio propio.

## Levantarlo

Requiere Node 24.

```bash
npm install
npm run dev      # http://localhost:4321
```

| Comando | Qué hace |
|---|---|
| `npm run dev` | Servidor de desarrollo |
| `npm run build` | Build de producción a `dist/` |
| `npm run preview` | Sirve el build localmente |

## Estructura

```
src/
  layouts/Layout.astro      · <head>, fuentes, meta
  components/               · una sección de la landing por archivo
    Hero · ComoFunciona · Herramientas · Banner
    Rubros · Preguntas · Clientes · Contacto · Footer
  data/pasos.ts             · los 4 pasos de "Configurás una vez"
  data/preguntas.ts         · las preguntas frecuentes
  styles/global.css         · tokens del Figma (colores, tipografía, radios)
public/
  img/ icons/ decor/        · imágenes optimizadas, íconos y formas de onda
```

## Ancho y movimiento

- **El contenido mide 1366px** (`--container`); los fondos, ondas y glows van a
  pantalla completa. En el Figma cada bloque tiene su propio ancho dentro del
  frame de 1440 y acá se escalan igual: secciones 1280 → **1366**, header
  1101 → **1175** (`--container-nav`), titular del hero 1186 → **1266**
  (`--container-hero`). El titular NO usa el ancho del header.
- **Una sección no puede tapar lo que asoma de la anterior.** La sombra de los
  celulares del hero se desborda hacia abajo, y el fondo opaco de la sección
  siguiente la cortaba con una línea recta. Por eso `.como-fondo` y
  `.como-remate` van con `z-index: -1`: quedan detrás de lo que baja del hero.
  Si aparece un corte recto entre dos secciones, mirar esto primero.
- **Nada puede generar scroll lateral.** `html` y `body` llevan `overflow-x:
  clip`, y el banner lo lleva también (solo en horizontal, porque el sticker
  tiene que seguir colgando por abajo para cruzar la onda). Sin esto el sticker
  se sale ~160px y la página se ve corrida.
- **El cuerpo del titular del hero está calibrado sobre su línea más larga.**
  "tus clientes" mide 6.6 px de ancho por cada px de cuerpo, así que el factor
  `0.1486` del ancho del contenido la deja ocupando ~93% de la pantalla. Si se
  cambia el texto del titular hay que recalcular ese factor, o la línea se
  desborda o queda corta.
- Las composiciones proporcionales (hero, ondas, glows) se calculan sobre
  `--escena` = `min(1366px, 100vw - gutter*2)`, con factor `px/1280`, porque en
  el Figma el contenido medía 1280px dentro de un frame de 1440px.
- **Las animaciones de scroll salen del timeline del Figma**, no son inventadas:
  easing `cubic-bezier(.22, 1, .36, 1)`, entradas de 30–100px hacia arriba,
  logos entrando de costado (±60px), banner y panel con escala. Se aplican con
  `data-reveal="up|up-sm|up-md|up-lg|up-xl|left|right|scale|scale-lg|fade"` y se
  escalonan con `--rv-delay`.
- **Deriva de fondos** (`data-parallax="0.05"`): el glow del hero, la onda y la
  tarjeta del diagrama se mueven más lento que la página, acotado a ±60px.
- **Las ondas son "pegajosas".** No saltan al valor objetivo: lo persiguen a
  razón de un 9% por frame (`SEGUIR` en `Layout.astro`), así quedan atrasadas y
  después recuperan. Además se estiran en vertical según la velocidad del
  scroll (`--wsy`, hasta un 9%), con el origen en su borde macizo — abajo en las
  superiores, arriba en las inferiores — para que al estirarse no se despeguen
  de la sección. Bajar `SEGUIR` las hace más pegajosas.
- El SVG va al 124% dentro de un `.onda` con `overflow: hidden`, así la onda
  "corre" sin que nunca asome un borde ni se abra un hueco vertical.
- **Los stickers se despegan al scrollear** (`StickerPeel.astro`). La imagen se
  parte en dos con una línea de corte que sube con `--peel` (0 → 1): el CUERPO
  sigue pegado y la SOLAPA es la franja despegada, espejada sobre la línea.
  La solapa no muestra el arte: muestra el **reverso metalizado**, un degradado
  de bandas claras y oscuras recortado con la silueta del sticker (se usa la
  propia imagen como `mask-image`). Ninguna capa lleva sombra CSS — la imagen
  del sticker ya trae la suya.
- **El despegue va de arriba hacia abajo y el sticker se descuelga.** Además
  del pliegue, el conjunto baja unos píxeles y se inclina un poco más a medida
  que avanza, y el escorzo de la solapa crece (de -1 a -0.72): eso es lo que
  hace sentir que se está cayendo y no sólo doblando.
- **El corte llega al 50%**: el sticker se despega hasta la mitad de su altura.
- **La sombra del sticker va en su propia capa** (`.peel-sombra`, la silueta
  completa enmascarada y desenfocada). Si se pone como `filter: drop-shadow`
  sobre el cuerpo, la sombra se calcula sobre la silueta YA RECORTADA por el
  pliegue y dibuja una línea recta en el corte.
- **La imagen del sticker viene recortada al contenido**, sin margen
  transparente: por eso las cajas miden 59% y no 66%. Si se reemplaza por una
  versión con margen, hay que recalcular el ancho o el logo cambia de tamaño.
- El `corte` define cuánto se despega (16%) y el `factor` a qué velocidad
  (2.2). Ojo con el corte: al doblarse, la franja despegada deja de estar en su
  lugar original, así que un corte grande se come el arte. Con 16% se levanta
  el borde y las letras quedan enteras. El factor importa: más lento, el despegue se completa recién cuando el
  sticker ya se fue para arriba y no se llega a ver. Con 2.2 termina cuando
  llega al centro de la pantalla.
- La solapa va con `scaleY(-0.86)`, no `-1`: el escorzo es lo que hace leer el
  pliegue como volumen en vez de como un espejo.
- **Los celulares del hero tienen tres movimientos**: entran al cargar
  (`telefono-entra`, desde abajo y con una inclinación que se endereza), quedan
  flotando en loop (`telefono-flota`, cada uno con su ritmo y desfase) y derivan
  con el scroll a distinta velocidad (`data-parallax` 0.055 y 0.085, lo que da
  sensación de profundidad). El wrapper `.phone` lleva la deriva y la `<img>`
  las animaciones, separados para que no se pisen.
- **Las ondas van SIN fondo.** Lo que queda por encima del borde de la onda
  tiene que dejar ver lo que hay detrás (el panel, los logos de la sección
  anterior). Con un fondo blanco opaco, esa imagen desaparece.
- Todo el movimiento se apaga con `prefers-reduced-motion: reduce`.

## Decisiones que conviene conocer

- **Tipografía display.** El Figma usa **Cocogoose Pro Trial** (titulares) y
  **Aeonik Black**, las dos de licencia paga — y la versión "Trial" no se puede
  usar en producción. Están reemplazadas por **Poppins**, geométrica y gratuita.
  Si aparece la licencia, se cambia `--font-display` en `global.css` y listo.
  Plus Jakarta Sans, Inter y Montserrat sí son las del diseño (Google Fonts).
- **Responsive.** El Figma tiene una sola página a 1440px, sin diseño mobile.
  Los quiebres (1000/900/720/640/560px) son criterio propio, no del diseño.
- **Imágenes.** Las fotos venían en PNG de hasta 10 MB cada una (42,8 MB en
  total). Están convertidas a WebP a 900px: 0,88 MB en total.
- **Formas de onda.** Los fondos con onda del Figma eran SVG de sección
  completa; están partidos en bordes superiores e inferiores
  (`public/decor/wave-*.svg`) para que escalen con el ancho.
- **Las ondas del banner y del contacto van espejadas en horizontal.** En el
  Figma el shape lleva `-scale-y-100 rotate-180`, que equivale a `scaleX(-1)`.
  Sin espejar, la onda entra por el lado equivocado.
- **La zona clara del diagrama no termina recta:** cierra con una elipse de
  720×1440 (`wave-bottom-light.svg`), que el contenido pisa por arriba.
- **El fondo de la sección de rubros es un degradado** blanco → `#eef1f5`, no un
  color plano.
- **El sticker de strix cruza la onda inferior del banner**, mitad sobre el
  azul y mitad sobre la sección clara. Por eso vive en `Banner.astro` y no en
  `Rubros.astro`.
- **Los glows del banner se apagan antes de tocar los bordes de su caja.** Las
  ondas están pintadas con `#1a0d72` plano; si un glow llega encendido al borde
  superior o inferior del cuerpo, aparece una línea recta justo donde termina la
  onda. Cada `radial-gradient` está posicionado para valer cero en esos dos
  bordes.
- **Los glows del banner son degradados CSS, no los SVG del Figma.** Los SVG
  (`ellipse144` / `ellipse145`) traen el blur recortado por su propia región de
  filtro, y encima el `overflow` de `.banner-body` les cortaba el borde
  superior: se veía una línea recta justo debajo de la onda. Un degradado no se
  puede cortar. Los colores son los del Figma (#545FFF y #5471FF → #329699).
- **Los celulares del hero van en el flujo**, no absolutos, para que el alto de
  la sección los contenga enteros con su sombra (`0 24px 48px` = 72px por
  debajo, de ahí el `padding-bottom` del hero). Son ~25% más grandes que en el
  Figma, a pedido.
- **El panel tiene que quedar íntegro detrás de la onda del banner.** El solape
  (`margin-top: calc(-14.4vw - 48px)`) supera la parte más honda de la onda, que
  mide `207/1440` del ancho de pantalla; con menos, asoma el borde del panel.
- **El recorte de una onda animada va en `.onda`, nunca en su contenedor.** Si
  se pone en `.hero-wave`, también recorta el relleno de abajo y asoma el fondo
  oscuro del hero al derivar con el scroll.
- **Typo del diseño.** El botón del header dice "Ingersar" en el Figma. En el
  código está escrito "Ingresar".
- **El sello verde del hero** ("un fan - un cliente") está sacado a pedido, no
  es un olvido.

## Las dos secciones con interacción

- **"Configurás una vez" son 4 tarjetas con revelado al hover** (referencia:
  la sección "We're the opposite of affiliate marketing teams" de
  roiheads.com). Cada tarjeta son dos capas apiladas: una TAPA oscura
  (`--dark`) con el número gigante desbordando por arriba, y debajo un PANEL
  índigo con ícono, título y descripción. Al pasar el mouse la tapa se corre
  hacia arriba y deja ver el panel. En dispositivos táctiles (`hover: none`) la
  tapa se oculta y se muestra el panel directo, porque ahí no hay hover.
- **Las preguntas frecuentes usan `<details>`/`<summary>` nativo** (referencia:
  la sección OPEN POSITIONS de roiheads.com/career): filas a todo el ancho con
  separadores, pregunta grande a la izquierda y botón a la derecha. Al pasar el
  mouse o al abrirse, la fila se invierte —fondo claro, texto índigo, botón
  relleno— y el "+" rota a "×". Sin JavaScript: funciona con el teclado y sin
  scripts. El despliegue se anima donde el navegador soporta
  `interpolate-size`; donde no, abre directo.

## Pendientes

- [x] ~~Copy de los 4 pasos del diagrama radial~~ — provista por Analía el
      2026-09-20 y cargada en `src/data/pasos.ts`. El Figma seguía con los
      cuatro pasos en placeholder.
- [ ] **El texto del paso 02 termina con "Ponés tu logo y listo en menos de
      cinco minutos"**, que es el cierre del paso 01 y acá no viene a cuento.
      Parece un resto de copiar y pegar; está tal cual vino, a confirmar.
- [ ] **El formulario no envía a ningún lado.** Valida y avisa que es un
      prototipo. Para conectarlo gratis: Formspree o Web3Forms en el `action`.
- [ ] **Falta el nombre de una de las marcas** de "Empresas que confían en
      nosotros" (el logo verde). Está con alt genérico en `Clientes.astro`.
- [ ] Términos y Condiciones y Política de Privacidad apuntan a `#`.
