import dts from 'rollup-plugin-dts';
import esbuild from 'rollup-plugin-esbuild';
import shebang from 'rollup-plugin-preserve-shebang';

// const name = require('./package.json').main.replace(/\.js$/, '');

const bundle = (config) => ({
  ...config,
  external: (id) => !/^[./]/.test(id),
});

export default [
  bundle({
    input: 'src/cli/cli.ts',
    plugins: [esbuild(), shebang()],
    output: [
      {
        file: `./cli.js`,
        format: 'cjs',
      },
    ],
  }),
  bundle({
    input: 'src/web.tsx',
    plugins: [esbuild()],
    output: [
      {
        file: `./web.js`,
        format: 'cjs',
        sourcemap: true,
      },
      {
        file: `./web.mjs`,
        format: 'es',
        sourcemap: true,
      },
    ],
  }),
  bundle({
    input: 'src/web.tsx',
    plugins: [dts()],
    output: {
      file: `./web.d.ts`,
      format: 'es',
    },
  }),
  bundle({
    input: 'src/native.tsx',
    plugins: [esbuild()],
    output: [
      {
        file: `./native.js`,
        format: 'cjs',
        sourcemap: true,
      },
      {
        file: `./native.mjs`,
        format: 'es',
        sourcemap: true,
      },
    ],
  }),
  bundle({
    input: 'src/native.tsx',
    plugins: [dts()],
    output: {
      file: `./native.d.ts`,
      format: 'es',
    },
  }),
  bundle({
    input: 'src/index.ts',
    plugins: [esbuild()],
    output: {
      file: `./index.js`,
      format: 'cjs',
    },
  }),
  bundle({
    input: 'src/index.ts',
    plugins: [esbuild()],
    output: {
      file: `./index.mjs`,
      format: 'es',
      sourcemap: true,

    },
  }),
  bundle({
    input: 'src/types.ts',
    plugins: [dts()],
    output: {
      file: `./index.d.ts`,
      format: 'es',
    },
  }),
];
