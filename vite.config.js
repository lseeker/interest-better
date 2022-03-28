/* eslint-disable import/no-extraneous-dependencies */
import vue from '@vitejs/plugin-vue';
import path from 'path';
import { defineConfig } from 'vite';

export default defineConfig({
  plugins: [vue()],
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src'),
    },
  },
  esbuild: {
    charset: 'utf8',
    legalComments: 'none',
  },
});
