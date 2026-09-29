import path from 'path'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'
import { defineConfig } from 'vite'
import { viteSingleFile } from 'vite-plugin-singlefile'

// Set SINGLE=1 to emit one self-contained index.html (used for the hosted preview)
export default defineConfig({
  plugins: [react(), tailwindcss(), ...(process.env.SINGLE ? [viteSingleFile()] : [])],
  resolve: { alias: { '@': path.resolve(__dirname, './src') } },
  build: process.env.SINGLE ? { assetsInlineLimit: 100_000_000 } : {},
})
