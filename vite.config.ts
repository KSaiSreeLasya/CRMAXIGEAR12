import { defineConfig, Plugin } from "vite";
import react from "@vitejs/plugin-react";
import path from "node:path";
import { createServer } from "./server";

// https://vitejs.dev/config/
export default defineConfig(({ mode }) => ({
  server: {
    host: "::",
    port: 8080,
    fs: {
      allow: ["./client", "./shared", "index.html"],
      deny: [".env", ".env.*", "*.{crt,pem}", "**/.git/**", "server/**"],
    },
  },
  build: {
    outDir: "dist/spa",
  },
  plugins: [react(), expressPlugin()],
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./client"),
      "@shared": path.resolve(__dirname, "./shared"),
    },
  },
}));

function expressPlugin(): Plugin {
  return {
    name: "express-plugin",
    apply: "serve", // Only apply during development (serve mode)
    configureServer(server) {
      const app = createServer();

      // Only forward /api/* to Express. Mounting the full app on every path breaks SPA
      // refresh (e.g. /projects) because Express returns 404 before Vite serves index.html.
      server.middlewares.use((req, res, next) => {
        const pathname = req.url?.split("?")[0] ?? "";
        if (pathname.startsWith("/api")) {
          app(req, res, next);
        } else {
          next();
        }
      });
    },
  };
}
