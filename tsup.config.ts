import { defineConfig } from "tsup";

export default defineConfig({
    entry: ["src/index.ts", "!src/**/*.test.ts"],
    format: ["cjs", "esm"], // Output both CommonJS and ES Modules
    dts: true, // Generate declaration files
    splitting: false, // Disable code splitting for ESM
    sourcemap: true,
    clean: true,
    target: ["node18", "es2020"], // Target Node.js 14+ and modern browsers
    outDir: "dist",
});
