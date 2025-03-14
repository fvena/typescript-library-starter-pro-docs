# Testing

La plantilla TypeScript Library Template Pro integra [Vitest](https://vitest.dev/), un marco de test moderno y rápido para proyectos TypeScript.

## Configuración básica

Vitest viene preconfigurado en el archivo `vitest.config.ts`:

```typescript
import { defineConfig } from "vitest/config";

export default defineConfig({
  test: {
    clearMocks: true,
    coverage: {
      include: ["src/**/*.ts"],
      provider: "v8",
      reporter: ["text", "lcovonly"],
    },
    environment: "node", // jsdom para bibliotecas de navegador
    globals: true,
  },
});
```

::: tip Nota
Si estás desarrollando una biblioteca para el navegador, cambia `environment` a `"jsdom"` e instala la dependencia con `npm install --save-dev jsdom`.
:::

## Escribir tests

Los archivos de test se almacenan en el directorio `test/` y siguen la nomenclatura `.test.ts` o `.spec.ts`.

### Ejemplo básico

```typescript
// test/utils.test.ts
import { add } from "../src/utils";

describe("Utils", () => {
  it("add", () => {
    expect(add(1, 2)).toBe(3);
  });
});
```

## Comandos disponibles

La plantilla incluye varios scripts para ejecutar test:

```bash
# Ejecutar todos los tests
npm test

# Ejecutar tests en modo observador (se volverán a ejecutar al cambiar archivos)
npm run test:watch

# Abrir interfaz de usuario visual para las test
npm run test:ui

# Generar informe de cobertura de código
npm run test:coverage
```

## Buenas prácticas para escribir tests

1. **Tests atómicos**: Cada test debe probar una sola funcionalidad o aspecto.

2. **Arrange-Act-Assert**: Estructura tus test siguiendo este patrón:

   ```typescript
   it("should multiply two numbers", () => {
     // Arrange
     const a = 2;
     const b = 3;

     // Act
     const result = multiply(a, b);

     // Assert
     expect(result).toBe(6);
   });
   ```

3. **Descripciones claras**: Usa descripciones significativas para tus bloques `describe` e `it`:

   ```typescript
   describe("multiply function", () => {
     it("should return the product of two positive numbers", () => {
       // ...
     });

     it("should return zero when one of the factors is zero", () => {
       // ...
     });
   });
   ```

4. **Tests independientes**: Cada test debe ser independiente y no depender del estado de otros tests.

5. **Evita la lógica compleja**: Los tests deben ser simples. Si necesitas lógica compleja, probablemente deberías dividir el test en múltiples tests más pequeños.
