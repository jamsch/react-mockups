import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import { resolve } from 'path';

export default function loadViteConfig(config) {
  const alias = {};

  // Map /src/index.tsx to "/src/index_mockup.tsx"
  if (config.mode === 'mockup') {
    alias['/index.tsx'] = resolve(__dirname, 'index_mockup.tsx');
  }

  return defineConfig({
    plugins: [react()],
    resolve: { alias },
  });
}
