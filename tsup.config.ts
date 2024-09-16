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
    env: {
        PACKAGE_VERSION: process.env.npm_package_version || "0.0.0",
    },
});
