# Librerías para Node.js

Desarrollar una biblioteca específicamente para Node.js requiere consideraciones particulares en cuanto a configuración, estructura y optimización. La plantilla TypeScript Library Template Pro proporciona una base sólida que puedes adaptar para crear bibliotecas Node.js de alta calidad. Este documento detalla las configuraciones recomendadas y buenas prácticas para desarrollar bibliotecas Node.js con la plantilla.

## Configuración recomendada

La plantilla está preconfigurada con ajustes optimizados para el desarrollo de bibliotecas Node.js, pero es importante entender estas configuraciones y cómo personalizarlas según tus necesidades específicas.

#### Ajustes importantes

- **target**: `ES2020` proporciona un buen equilibrio entre características modernas y compatibilidad con versiones de Node.js.
- **module** y **moduleResolution**: `NodeNext` permite usar tanto importaciones ESM como require de CommonJS.
- **declaration** y **declarationMap**: Genera archivos `.d.ts` y mapas de fuente para ellos, esenciales para una biblioteca TypeScript.
- **strict**: Activa todas las comprobaciones estrictas de TypeScript para mejorar la calidad del código.

### Configuración de ESLint

La configuración de ESLint para Node.js se encuentra en `eslint.config.js`:

```javascript
import eslintNode from "personal-style-guide/eslint/node";

export default [...eslintNode];
```

Esta configuración incluye reglas específicas para Node.js, como evitar APIs específicas del navegador y promover el uso de promesas en lugar de callbacks.

### Configuración de construcción (tsup)

La plantilla utiliza [tsup](https://github.com/egoist/tsup) para la construcción, que es una herramienta basada en esbuild optimizada para bibliotecas TypeScript. La configuración se encuentra en `tsup.config.ts`:

```typescript
import type { Options } from "tsup";
import { defineConfig } from "tsup";

const config: Options = {
  clean: true,
  dts: true,
  entryPoints: ["src/index.ts"],
  format: ["cjs", "esm"],
  outDir: "dist",
};

export default defineConfig(config);
```

#### Aspectos clave

- **dts**: Genera archivos de declaración TypeScript.
- **format**: Genera tanto formatos CommonJS (`.cjs`) como ESM (`.js` o `.mjs`), proporcionando compatibilidad con diferentes sistemas de módulos.

### Configuración del package.json

El archivo `package.json` contiene configuraciones importantes específicas para Node.js:

```json
{
  "name": "tu-biblioteca",
  "version": "0.1.0",
  "type": "module",
  "main": "dist/index.js",
  "module": "dist/index.js",
  "types": "dist/index.d.ts",
  "files": ["dist"],
  "exports": {
    ".": {
      "types": "./dist/index.d.ts",
      "import": "./dist/index.js",
      "require": "./dist/index.cjs"
    }
  },
  "engines": {
    "node": ">=22.11.0"
  }
}
```

#### Campos clave

- **type**: `module` indica que los archivos `.js` se tratarán como módulos ES por defecto.
- **exports**: Define los puntos de entrada para diferentes tipos de importación, permitiendo tanto `import` como `require`.
- **engines**: Especifica la versión mínima de Node.js compatible con tu biblioteca.

## Consideraciones específicas

### Compatibilidad con versiones de Node.js

Es importante definir claramente qué versiones de Node.js soporta tu biblioteca:

1. **Versiones LTS**: Se recomienda soportar al menos las versiones LTS activas de Node.js.
2. **Especificar en package.json**: Usa el campo `engines` para indicar la versión mínima:

```json
"engines": {
  "node": ">=18.0.0"
}
```

3. **Transpilación**: Ajusta el target de TypeScript según las versiones soportadas.

### Soporte para CommonJS y ESM

Node.js soporta tanto CommonJS (require/module.exports) como ECMAScript Modules (import/export). Para una máxima compatibilidad:

1. **Genera ambos formatos**: La configuración predeterminada de tsup genera ambos formatos.

2. **Configura exports en package.json**:

```json
"exports": {
  ".": {
    "types": "./dist/index.d.ts",
    "import": "./dist/index.js",
    "require": "./dist/index.cjs"
  }
}
```

3. **Consideraciones para usar require en ESM**:
   - En archivos ESM, solo puedes usar import/export, no require/module.exports.
   - Para importar módulos CommonJS en ESM, usa `import * as x from 'module'` o `import x from 'module'`.

### APIs asincrónicas

Node.js tiene diferentes paradigmas para manejar código asíncrono:

1. **Promesas sobre callbacks**: Diseña APIs basadas en promesas:

```typescript
// Preferido
export async function readConfig(path: string): Promise<Config> {
  // Implementación
}

// Evitar
export function readConfig(
  path: string,
  callback: (error: Error | null, config?: Config) => void,
): void {
  // Implementación
}
```

2. **Soporte para async/await**: Asegúrate de que el target de TypeScript sea compatible con async/await.

3. **Manejo de streams**: Para operaciones con grandes volúmenes de datos, considera usar streams:

```typescript
import { createReadStream } from "fs";
import { parse } from "csv-parse";

export function processLargeCSV(path: string) {
  return createReadStream(path).pipe(parse({ columns: true }));
}
```

### Inclusión de typings

Asegúrate de que tu biblioteca incluya definiciones de tipos adecuadas:

1. **Generar typings**: Activa `dts: true` en tsup.config.ts o `declaration: true` en tsconfig.json.

2. **Exportaciones públicas limpias**: Exporta solo lo que es parte de la API pública desde tu archivo principal.

3. **Prueba de typings**: Usa la utilidad `check-exports` para verificar la precisión de los tipos:

```bash
npm run check-exports
```

## Ejemplos

### Estructura básica de una biblioteca Node.js

```
src/
  ├── index.ts         # Punto de entrada principal, re-exporta la API pública
  ├── core/            # Funcionalidad principal
  │   ├── processor.ts
  │   └── validator.ts
  ├── utils/           # Utilidades reutilizables
  │   ├── fs.ts
  │   └── format.ts
  └── types/           # Definiciones de tipos
      └── index.ts
```

### Ejemplo de API pública bien diseñada

```typescript
// src/index.ts
export { processFile, processStream } from "./core/processor";
export { validateConfig } from "./core/validator";
export type { Config, Options, Result } from "./types";

// No exportar utilidades internas o implementaciones
// import * as utils from './utils'; // No exportar
```

### Ejemplo de manejo de archivos

```typescript
// src/core/processor.ts
import { readFile } from "fs/promises";
import { validate } from "./validator";
import type { Options, Result } from "../types";

export async function processFile(
  path: string,
  options: Options = {},
): Promise<Result> {
  try {
    const content = await readFile(path, "utf-8");
    return processContent(content, options);
  } catch (error) {
    if (error instanceof Error) {
      throw new Error(`Failed to process file: ${error.message}`);
    }
    throw error;
  }
}

function processContent(content: string, options: Options): Result {
  // Implementación
  return { success: true };
}
```

### Implementación con soporte para ambos sistemas de módulos

```typescript
// Asegura compatibilidad con require() e import
export default class Parser {
  // Implementación
}

// Exportaciones nombradas
export { parse, stringify } from "./utils";
export type { ParserOptions, ParseResult } from "./types";

// Para CommonJS, también sería accesible como:
// const Parser = require('tu-biblioteca').default;
// const { parse } = require('tu-biblioteca');
```

## Seguridad para bibliotecas Node.js

La seguridad es una preocupación importante en las bibliotecas Node.js, especialmente aquellas que manejan archivos, red o ejecutan código.

### Validación de entrada

Siempre valida las entradas de usuario para prevenir vulnerabilidades:

```typescript
import { z } from "zod";

// Esquema de validación
const ConfigSchema = z.object({
  path: z.string().min(1),
  timeout: z.number().positive().optional(),
  retry: z.boolean().default(false),
});

type Config = z.infer<typeof ConfigSchema>;

export function processConfig(userConfig: unknown): Config {
  // Valida y convierte a tipos seguros
  return ConfigSchema.parse(userConfig);
}
```

### Rutas de archivo seguras

Para operaciones con archivos, normaliza y valida las rutas:

```typescript
import { resolve, normalize } from "path";

export function readSafeFile(
  basePath: string,
  relativePath: string,
): Promise<string> {
  // Prevenir path traversal
  const normalizedPath = normalize(relativePath);
  if (normalizedPath.startsWith("..")) {
    throw new Error("Path traversal attempt detected");
  }

  const fullPath = resolve(basePath, normalizedPath);
  // Continuar con la operación de archivo
}
```

### Manejo de dependencias

Minimiza y audita regularmente las dependencias:

1. **Dependencias mínimas**: Incluye solo lo que realmente necesites.
2. **Auditoría regular**: Ejecuta `npm audit` para identificar vulnerabilidades.
3. **Versiones fijas**: Para dependencias críticas, considera fijar versiones exactas.

## Optimización de rendimiento

Para bibliotecas Node.js, el rendimiento puede ser crucial, especialmente en aplicaciones con alta carga.

### Carga lazy de módulos

Para módulos pesados o raramente utilizados, considera la carga bajo demanda:

```typescript
// Evitar importar módulos pesados directamente
// import heavyModule from 'heavy-module';

export async function processSpecialCase() {
  // Importar solo cuando se necesite
  const heavyModule = (await import("heavy-module")).default;
  return heavyModule.process();
}
```

### Caché y memoización

Para operaciones costosas y repetitivas, implementa estrategias de caché:

```typescript
const cache = new Map<string, any>();

export function expensiveOperation(key: string, forceRefresh = false): any {
  if (!forceRefresh && cache.has(key)) {
    return cache.get(key);
  }

  const result = performExpensiveCalculation(key);
  cache.set(key, result);
  return result;
}
```

### Procesamiento en lotes

Para operaciones que pueden acumular muchas llamadas, considera procesar en lotes:

```typescript
class BatchProcessor {
  private queue: any[] = [];
  private timer: NodeJS.Timeout | null = null;

  constructor(
    private readonly processBatch: (items: any[]) => Promise<void>,
    private readonly options = { maxSize: 100, maxWait: 1000 },
  ) {}

  add(item: any): void {
    this.queue.push(item);

    if (this.queue.length >= this.options.maxSize) {
      this.flush();
      return;
    }

    if (!this.timer) {
      this.timer = setTimeout(() => this.flush(), this.options.maxWait);
    }
  }

  private async flush(): Promise<void> {
    if (this.timer) {
      clearTimeout(this.timer);
      this.timer = null;
    }

    if (this.queue.length === 0) return;

    const batch = [...this.queue];
    this.queue = [];

    await this.processBatch(batch);
  }
}
```

## Testing específico para Node.js

La plantilla incluye Vitest, que es ideal para probar bibliotecas Node.js.

### Configuración de Vitest para Node.js

El archivo `vitest.config.ts` ya está configurado para entornos Node.js:

```typescript
import { defineConfig } from "vitest/config";

export default defineConfig({
  test: {
    environment: "node",
    globals: true,
    // otras configuraciones...
  },
});
```

### Mocking de módulos del sistema

Para probar código que interactúa con el sistema de archivos o la red:

```typescript
import { describe, expect, it, vi } from "vitest";
import { promises as fs } from "fs";
import { processFile } from "../src/core/processor";

// Mock del módulo fs
vi.mock("fs", () => ({
  promises: {
    readFile: vi.fn(),
  },
}));

describe("processFile", () => {
  it("should process file content correctly", async () => {
    // Configurar el mock
    (fs.readFile as any).mockResolvedValue("sample content");

    // Llamar a la función
    const result = await processFile("test.txt");

    // Verificar que se llamó a readFile con los argumentos correctos
    expect(fs.readFile).toHaveBeenCalledWith("test.txt", "utf-8");

    // Verificar el resultado
    expect(result).toEqual({ success: true });
  });
});
```

### Pruebas de integración

Para pruebas más completas, considera configurar pruebas de integración con entornos reales:

```typescript
import { describe, expect, it } from "vitest";
import { mkdtemp, writeFile } from "fs/promises";
import { tmpdir } from "os";
import { join } from "path";
import { processFile } from "../src/core/processor";

describe("integration tests", () => {
  it("should process an actual file", async () => {
    // Crear directorio temporal
    const tempDir = await mkdtemp(join(tmpdir(), "test-"));
    const filePath = join(tempDir, "test.txt");

    // Escribir archivo de prueba
    await writeFile(filePath, "sample content");

    // Probar con archivo real
    const result = await processFile(filePath);

    // Verificaciones
    expect(result).toEqual({ success: true });
  });
});
```

## Publicación y empaquetado

Optimizar el paquete para npm puede mejorar la experiencia del usuario y reducir el tamaño de instalación.

### Configuración del campo "files"

El campo `files` en package.json controla qué archivos se incluyen en el paquete npm:

```json
"files": [
  "dist",
  "README.md",
  "LICENSE"
]
```

Esto asegura que solo los archivos necesarios se incluyan en el paquete.

### Exclusión de archivos con .npmignore

Para un control más detallado, puedes crear un archivo `.npmignore`:

```
src/
test/
docs/
tsconfig.json
.eslintrc
*.log
*.tgz
```

### Bundling adecuado

La configuración de tsup ya genera bundles optimizados, pero puedes personalizarla para necesidades específicas:

```typescript
// tsup.config.ts
export default defineConfig({
  // Configuración base...

  // Excluir dependencias externas del bundle
  external: ["fs", "path", "crypto"],

  // Minificar solo para producción
  minify: process.env.NODE_ENV === "production",

  // Eliminar código muerto
  treeshake: true,
});
```

## Ejemplos prácticos

### Biblioteca de utilidades para manejo de archivos

```typescript
// src/index.ts
export { readJsonSafe, writeJsonSafe } from "./utils/json";
export { findFiles, createTempDir } from "./utils/files";
export type { JsonOptions, FilePattern } from "./types";

// src/utils/json.ts
import { readFile, writeFile } from "fs/promises";
import type { JsonOptions } from "../types";

export async function readJsonSafe<T>(
  path: string,
  options: JsonOptions = {},
): Promise<T> {
  try {
    const content = await readFile(path, "utf-8");
    return JSON.parse(content) as T;
  } catch (error) {
    if (options.fallback !== undefined) {
      return options.fallback as T;
    }
    throw error;
  }
}

export async function writeJsonSafe(
  path: string,
  data: unknown,
  options: JsonOptions = {},
): Promise<void> {
  const indent = options.pretty ? 2 : undefined;
  const content = JSON.stringify(data, null, indent);

  try {
    await writeFile(path, content, "utf-8");
  } catch (error) {
    if (!options.ignoreErrors) {
      throw error;
    }
  }
}
```

### Biblioteca para procesamiento asíncrono en lotes

```typescript
// src/index.ts
export { BatchProcessor } from "./core/batch";
export type { BatchOptions, ProcessFunction } from "./types";

// src/core/batch.ts
import type { BatchOptions, ProcessFunction } from "../types";

export class BatchProcessor<T> {
  private queue: T[] = [];
  private processing = false;
  private timer: NodeJS.Timeout | null = null;

  constructor(
    private readonly processFunction: ProcessFunction<T>,
    private readonly options: BatchOptions = {},
  ) {
    // Establecer opciones predeterminadas
    this.options = {
      maxBatchSize: 100,
      maxWaitMs: 1000,
      retryCount: 3,
      ...options,
    };
  }

  async add(item: T): Promise<void> {
    this.queue.push(item);

    if (this.queue.length >= this.options.maxBatchSize!) {
      await this.flush();
      return;
    }

    this.scheduleFlush();
  }

  private scheduleFlush(): void {
    if (this.timer || this.processing) return;

    this.timer = setTimeout(() => this.flush(), this.options.maxWaitMs);
  }

  async flush(): Promise<void> {
    if (this.timer) {
      clearTimeout(this.timer);
      this.timer = null;
    }

    if (this.queue.length === 0 || this.processing) return;

    this.processing = true;
    const batch = [...this.queue];
    this.queue = [];

    try {
      await this.processFunction(batch);
    } catch (error) {
      // Reintentar lógica
      // ...
    } finally {
      this.processing = false;

      // Si se agregaron más elementos mientras procesábamos, programar otro flush
      if (this.queue.length > 0) {
        this.scheduleFlush();
      }
    }
  }
}
```

## Conclusión

Desarrollar bibliotecas Node.js con TypeScript ofrece numerosas ventajas, como tipado estático, mejor autocompletado y documentación integrada. La plantilla TypeScript Library Template Pro proporciona una base sólida con configuraciones optimizadas para Node.js, pero es importante entender y personalizar estas configuraciones según las necesidades específicas de tu biblioteca.

Al seguir las recomendaciones y mejores prácticas detalladas en este documento, puedes crear bibliotecas Node.js robustas, performantes y fáciles de mantener que proporcionarán una excelente experiencia tanto para los desarrolladores que las utilicen como para los que las mantengan.

## Siguientes pasos

Si estás desarrollando una biblioteca que también necesita funcionar en el navegador, consulta [Librerías para navegador](/library-types/browser.md) para obtener información sobre cómo configurar y optimizar tu biblioteca para entornos de navegador.
