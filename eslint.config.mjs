import { defineConfig, globalIgnores } from "eslint/config";
import nextVitals from "eslint-config-next/core-web-vitals";
import nextTs from "eslint-config-next/typescript";

const eslintConfig = defineConfig([
  ...nextVitals,
  ...nextTs,
  // Override default ignores of eslint-config-next.
  globalIgnores([
    // Default ignores of eslint-config-next:
    ".next/**",
    "out/**",
    "build/**",
    "next-env.d.ts",
    // Captured original-site assets (not our code — see start/ bundle)
    "start/**",
    // Drizzle migration metadata
    "drizzle/**",
    // Standalone deployment scripts (CommonJS by design — runs outside Next.js)
    "scripts/**",
  ]),
]);

export default eslintConfig;
