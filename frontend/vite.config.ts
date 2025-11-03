// vite.config.ts (o .js/.mjs)
import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react'; // <-- Usa import aquí

// https://vitejs.dev/config/
export default defineConfig({ // <-- Usa export default aquí
  plugins: [react()],
});