import tailwindcss from "@tailwindcss/vite";
import { tanstackStart } from "@tanstack/react-start/plugin/vite";
import viteReact from "@vitejs/plugin-react";
import { nitro } from "nitro/vite";
import { defineConfig } from "vite";
import tsConfigPaths from "vite-tsconfig-paths";

const isVercel = Boolean(process.env.VERCEL);

export default defineConfig(({ command }) => ({
  plugins: [
    tsConfigPaths(),
    tailwindcss(),
    tanstackStart({
      server: { entry: "server" },
    }),
    viteReact(),
    ...(command === "build"
      ? [
          nitro(
            isVercel
              ? { preset: "vercel" }
              : {
                  preset: "cloudflare-module",
                  cloudflare: { nodeCompat: true, deployConfig: true },
                },
          ),
        ]
      : []),
  ],
}));
