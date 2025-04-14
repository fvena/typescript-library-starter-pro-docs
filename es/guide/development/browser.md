# Librerías para navegador

La plantilla TypeScript Library Template Pro puede adaptarse fácilmente para crear bibliotecas optimizadas para entornos de navegador.

## Ajuste del tsconfig.json

Para adaptar la plantilla para navegadores, modifica el archivo `tsconfig.json`:

```json
{
  "extends": "personal-style-guide/typescript/browser",
  "include": ["src", "test", "docs/.vitepress/**/*", "*.config.*"]
}
```

Esta configuración incluye `"DOM"` y `"DOM.Iterable"` para acceder a las APIs del navegador.

## Configuración de ESLint

Modifica la configuración de ESLint para incluir reglas específicas de navegador:

```javascript
// eslint.config.js
import eslintBrowser from "personal-style-guide/eslint/browser";

export default [...eslintBrowser];
```

Esta configuración incluye reglas adaptadas para navegadores, como prevenir el uso de APIs específicas de Node.js y fomentar prácticas seguras para el DOM.

## Testing con jsdom

Para testear código que interactúa con el DOM, debes configurar tu entorno de pruebas para usar jsdom.

### Instalación de jsdom

```bash
npm install --save-dev jsdom
```

### Configuración de Vitest con jsdom

Modifica el archivo `vitest.config.ts`:

```typescript
import { defineConfig } from "vitest/config";

export default defineConfig({
  test: {
    environment: "jsdom",
    globals: true,
    setupFiles: ["./test/setup.ts"], // Opcional: para configuración adicional
  },
});
```

## Configuración de Tsup

Modifica el archivo `tsup.config.ts` para incluir la configuración de salida para navegadores:

```typescript
const nodeConfig: Options = {
  // ... configuración existente
}

/**
 * Browser Build Configuration
 *
 * This configuration generates bundles optimized for browser environments.
 * It produces two formats:
 * - ESM for modern browsers
 * - IIFE for direct browser usage and legacy support
 */
const browserConfig: Options = {
  bundle: true, // Enable bundling to include all dependencies in a single file. Important for browser usage to reduce HTTP requests
  define: {
    'process.env.NODE_ENV': '"production"', // Define the environment variable for production builds
  },
  entry: {
    'index.browser': 'src/index.ts', // ESM for modern browsers
    'index.global': 'src/index.ts', // IIFE for direct browser usage and legacy support
  },
  format: ['esm', 'iife'], // Generates both ESM and IIFE formats simultaneously
  globalName: 'MyLibrary', // The global variable name. Affects the IIFE format only
  minify: true, // Minifies the output to reduce bundle size
  outDir: './dist/browser', // Output directory for browser-specific builds
  platform: 'browser', // Explicitly set browser as the target platform. This ensures browser-compatible code transformations
  sourcemap: true, // Generate source maps to make debugging easier
  // splitting: true, // Enables code splitting to split the output into smaller chunks. This can improve loading performance for larger libraries
  treeshake: true, // Enables tree shaking to remove unused code and reduce bundle size
}

export default defineConfig({
  // ... configuración existente

  return [
    { ...nodeConfig, ...options },  // Node.js builds (ESM, CJS)
    { ...browserConfig, ...options } // Browser builds (ESM, IIFE)
  ]
}
```

:::warning Importante

Recuerda que debes modificar el la propiedad `globalName` para que coincida con el nombre de la librería.

:::

## Configuración del package.json

Modifica el archivo `package.json` para incluir la configuración de salida para navegadores:

```json
{
  "exports": {
    ".": {
      "types": "./dist/index.d.ts",
      "import": "./dist/index.js",
      "require": "./dist/index.cjs"
    },
    "./browser": {
      "types": "./dist/browser/index.browser.d.ts",
      "import": "./dist/browser/index.browser.js",
      "script": "./dist/browser/index.global.js"
    }
  }
}
```
