import {
  defineConfig,
} from "vite";

import {
  resolve,
} from "node:path";


export default defineConfig({
  build: {
    lib: {
      entry: resolve(
        import.meta.dirname,
        "src/js/rahardianmif-ui.js"
      ),

      name: "RahardianmifUI",

      formats: [
        "es",
        "iife",
      ],

      fileName: (format) =>
        `rahardianmif-ui.${format}.js`,

      cssFileName:
        "rahardianmif-ui",
    },

    sourcemap: true,

    emptyOutDir: true,
  },
});