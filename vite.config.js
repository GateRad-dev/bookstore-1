import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  base: '/bookstore-1/',  // <-- your GitHub repo name here
  plugins: [react()],
});
