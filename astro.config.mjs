// @ts-check
import { defineConfig } from 'astro/config';

import react from '@astrojs/react';

/* En GitHub Pages el sitio se sirve desde /strix/ y no desde la raíz del
   dominio. La base se aplica SOLO cuando compila el workflow: en local el
   servidor de desarrollo sigue en localhost:4321 y no en /strix/, que sería
   un cambio de costumbre innecesario.
   Las rutas de /public se prefijan con el helper de src/lib/ruta.ts. */
const enPages = process.env.GITHUB_ACTIONS === 'true';

// https://astro.build/config
export default defineConfig({
  site: 'https://helloanalia.github.io',
  base: enPages ? '/strix' : '/',
  integrations: [react()]
});
