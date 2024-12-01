import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import { federation } from "@module-federation/vite";

import topLevelAwait from "vite-plugin-top-level-await";
import { dependencies } from "./package.json";

// https://vite.dev/config/
export default defineConfig({
  optimizeDeps: {
    needsInterop: ["@module-federation/runtime"],
  },
  plugins: [
    react(),
    topLevelAwait({
      // The export name of top-level await promise for each chunk module
      promiseExportName: "__tla",
      // The function to generate import names of top-level await promise in each chunk module
      promiseImportName: (i) => `__tla_${i}`,
    }),
    federation({
      name: "board",
      filename: "remoteEntry.js",
      exposes: {
        "./entry": "./src/app/index.ts",
      },
      shared: {
        react: {
          requiredVersion: dependencies.react,
          singleton: true,
        },
        "react-dom": {
          requiredVersion: dependencies["react-dom"],
          singleton: true,
        },
        "react-router-dom": {
          requiredVersion: dependencies["react-router-dom"],
        },
      },
    }),
  ],
  server: {
    origin: "http://localhost:5001",
  },
  build: {
    target: "chrome89",
  },
});
