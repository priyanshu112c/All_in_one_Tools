import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
    plugins: [react()],
    optimizeDeps: {
        // Prevent esbuild from trying to pre-bundle canvg (optional jspdf dep),
        // which would fail due to core-js CJS/ESM format incompatibility.
        exclude: ['canvg'],
    },
    build: {
        rollupOptions: {
            // canvg is an optional dependency of jspdf for SVG rendering.
            // It's dynamically imported and wrapped in try/catch, so
            // excluding it is safe — SVG rendering just won't be available.
            // core-js is a dependency of canvg that esbuild can't resolve
            // due to mixed CJS/ESM module format.
            external: [/^core-js\//, /^canvg/],
        },
    },
    server: {
        port: 3000,
        open: true,
    },
})