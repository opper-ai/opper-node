import { defineConfig } from "tsup";

export default defineConfig({
    entry: ["src/index.ts", "!src/**/*.test.ts"],
    splitting: false,
    sourcemap: true,
    clean: true,
    // Generate declaration file
    dts: true,
});
