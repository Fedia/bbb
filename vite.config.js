import { defineConfig } from 'vite';
import { svelte } from '@sveltejs/vite-plugin-svelte';
import { transform } from 'esbuild';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    svelte({
      emitCss: false,
      compilerOptions: {
        css: 'injected',
      },
    }),
    minifyEs(),
  ],
  build: {
    lib: {
      name: 'BBB',
      formats: ['es'],
      entry: 'src/main.js',
      fileName: () => 'bbb.js',
    },
  },
  define: {
    'process.env': {},
  },
});

// @see https://github.com/vitejs/vite/issues/6555#issuecomment-1342664357
function minifyEs() {
  return {
    name: 'minifyEs',
    renderChunk: {
      order: 'post',
      async handler(code, chunk, outputOptions) {
        if (outputOptions.format === 'es') {
          return await transform(code, { minify: true });
        }
        return code;
      },
    },
  };
}
