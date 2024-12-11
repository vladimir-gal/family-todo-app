import { defineConfig } from "tsup";

export default defineConfig({
  target: "es2024",
  entry: ["src/index.ts"],
  outDir: "dist",
  format: ["cjs", "esm"],
  sourcemap: true,
  clean: true,
  dts: true,
  external: ["react", "react-dom"],
  minify: false,
  esbuildOptions: (options) => {
    options.banner = {
      js: '"use client"',
    };
  },
});
