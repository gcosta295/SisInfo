import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
  build:{
    target: "esnext", // or "es2019",
  },
  // other part of your config 
  // plugins: [vue()],
  // ...
})

