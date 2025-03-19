import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import { VitePWA } from "vite-plugin-pwa";


export default defineConfig({
  build:{
    target: "esnext", // or "es2019",
  },
  // other part of your config 
  plugins: [
    react(),
    VitePWA({
      srcDir: "src",
      filename: "service-worker.js",
      registerType: "autoUpdate",
      devOptions: {
        enabled: true,
      },
      manifest: {
        name: "AvilaTrek",
        short_name: "AvilaTrek",
        description: "AvilaTrek PWA",
        theme_color: "#008000",
        background_color: "#008000",
        display: "standalone",
        icons: [
          {
            src: "/icons/icon-192x192.png",
            sizes: "192x192",
            type: "image/png",
          },
          {
            src: "/icons/icon-512x512.png",
            sizes: "512x512",
            type: "image/png",
          },
        ],
      },
    }),
  ],
  // ...
}
)