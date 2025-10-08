import { defineConfig } from 'vite';
import { resolve } from 'path';

export default defineConfig({
  build: {
    rollupOptions: {
      input: {
        main: resolve(__dirname, 'index.html'),
        'add-new': resolve(__dirname, 'add-new.html'),
        'edit-employee': resolve(__dirname, 'edit-employee.html'),
      },
    },
  },
});
