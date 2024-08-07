import { defineConfig } from "cypress";
import { buildNuxt, loadNuxt } from "@nuxt/kit";
import type { InlineConfig } from "vite";
import vue from "@vitejs/plugin-vue";

async function getNuxtViteConfig() {
  const nuxt = await loadNuxt({
    cwd: process.cwd(),
    dev: false,
    overrides: {
      ssr: false,
    },
  });
  return new Promise<InlineConfig>((resolve, reject) => {
    nuxt.hook("vite:extendConfig", (config: any) => {
      resolve(config);
      throw new Error("_stop_");
    });
    buildNuxt(nuxt).catch((err: { toString: () => string | string[] }) => {
      if (!err.toString().includes("_stop_")) {
        reject(err);
      }
    });
  }).finally(() => nuxt.close());
}

export default defineConfig({
  viewportWidth: 1920,
  viewportHeight: 1080,
  video: false,
  experimentalWebKitSupport: true,
  screenshotOnRunFailure: false,
  e2e: {
    baseUrl: "http://localhost:3000/",
  },
  blockHosts: [
    "*.google-analytics.com",
  ],
  component: {
    devServer: {
      // supportFile: "./cypress/support/component.ts",
      framework: "vue",
      bundler: "vite",
      async viteConfig() {
        const config = await getNuxtViteConfig();

        config.plugins = config?.plugins?.filter(
          item => !["replace", "vite-plugin-eslint"].includes(item.name),
        );

        if (config.server) {
          config.server.middlewareMode = false;
        }
        const { mergeConfig } = await import("vite");

        return mergeConfig(config, {
          plugins: [vue()],
        });
      },
    },
  },
});
