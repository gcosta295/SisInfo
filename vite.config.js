import { defineConfig } from 'vite'
import tailwindcss from '@tailwindcss/vite'
import react from '@vitejs/plugin-react'


export default defineConfig({
  build:{
    target: "esnext", // or "es2019",
  },
  // other part of your config 
  plugins: [react(),
    tailwindcss(),
  ],
  
  // ...
}
)