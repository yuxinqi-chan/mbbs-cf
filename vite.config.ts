import build from "@hono/vite-cloudflare-pages";
import devServer from "@hono/vite-dev-server";
import adapter from "@hono/vite-dev-server/cloudflare";
import { defineConfig } from "vite";

export default defineConfig(({ mode }) => {
  if (mode === "client") {
    return {
      build: {
        manifest: true,
        rollupOptions: {
          input: "src/client.tsx",
          output: {
            entryFileNames: "static/client.js",
          },
        },
      },
    };
  }
  return {
    plugins: [
      build(),
      devServer({
        adapter,
        entry: "src/index.tsx",
      }),
    ],
    ssr: {
      external: ["react", "react-dom/server"],
      noExternal: true,
    },
  };
});
