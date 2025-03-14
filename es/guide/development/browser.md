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

Para probar código que interactúa con el DOM, debes configurar tu entorno de pruebas para usar jsdom.

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
