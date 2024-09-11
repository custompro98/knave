import { defineConfig } from 'astro/config';
import alpinejs from "@astrojs/alpinejs";
import tailwind from "@astrojs/tailwind";

import db from "@astrojs/db";

// https://astro.build/config
export default defineConfig({
  integrations: [alpinejs(), tailwind(), db()]
});