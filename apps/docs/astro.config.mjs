import { defineConfig } from "astro/config";
import starlight from "@astrojs/starlight";

// https://astro.build/config
export default defineConfig({
  integrations: [
    starlight({
      title: "Merchminder",
      social: {
        github: "https://github.com/adiazt01/merchminder_app",
      },
      sidebar: [
        {
          label: "Inicio",
          autogenerate: { directory: "getting-started" },
        },
      ],
    }),
  ],
});
