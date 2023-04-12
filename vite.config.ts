import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import * as path from 'path'
// @ts-ignore
import typescript2 from 'rollup-plugin-typescript2';
// @ts-ignore
import dts from "vite-plugin-dts";
import {fileURLToPath, URL} from "node:url";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    vue(),
    dts({
      insertTypesEntry: true,
    }),
    typescript2({
      check: false,
      include: ["src/components/**/*.vue"],
      tsconfigOverride: {
        compilerOptions: {
          outDir: "dist",
          sourceMap: true,
          declaration: true,
          declarationMap: true,
        },
      },
      exclude: ["vite.config.ts"]
    })
  ],
  build: {
    cssCodeSplit: true,
    lib: {
      // Could also be a dictionary or array of multiple entry points
      entry: "src/components/main.ts",
      name: 'ccp-vue',
      formats: ["es", "cjs", "umd"],
      fileName: format => `ccp-vue.${format}.js`
    },
    rollupOptions: {
      // make sure to externalize deps that shouldn't be bundled
      // into your library
      input: {
        // @ts-ignore
        main: path.resolve(__dirname, "src/components/main.ts")
      },
      external: ['vue'],
      output: {
        assetFileNames: (assetInfo) => {
          if (assetInfo.name === 'main.css') return 'ccp-vue.css';
          return assetInfo.name;
        },
        exports: "named",
        globals: {
          vue: 'Vue',
        },
      },
    },
  },
  resolve: {
    alias: {
      // @ts-ignore
     // '@': path.resolve(__dirname, 'src'),
      '@': fileURLToPath(new URL('./src', import.meta.url))
    },
  },
})