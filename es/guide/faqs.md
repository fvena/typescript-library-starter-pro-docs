# Preguntas Frecuentes (FAQs)

Esta sección contiene respuestas a las preguntas más frecuentes sobre la creación, desarrollo y publicación de librerías TypeScript utilizando este template. Si tienes alguna pregunta que no esté cubierta aquí, por favor abre un issue en el repositorio.

### Error: "Repository not found" o "Not found"

- **Causa**: El token de GitHub no tiene los permisos adecuados.
- **Solución**: Verifica que hayas seleccionado los permisos correctos y que el token tenga acceso al repositorio.

### Error: "npm ERR! 403 Forbidden"

- **Causa**: El token de NPM no tiene permisos para publicar o el nombre del paquete ya está en uso.
- **Solución**: Verifica que el token tenga permisos de publicación y que el nombre del paquete sea único.

### Error: "Unable to locate npm token"

- **Causa**: El secreto `NPM_TOKEN` no está configurado correctamente o no está siendo pasado al entorno.
- **Solución**: Verifica que el secreto esté configurado correctamente y que el flujo de trabajo lo esté referenciando correctamente.

## Problemas comunes de publicación

<details id="errores-publicacion-npm">
  <summary><strong>Errores al publicar el paquete en NPM</strong></summary>

### Recibo el error `npm ERR! code E403` al intentar publicar

Este error ocurre generalmente por alguna de estas razones:

1. **Email no verificado en NPM**: Verifica que hayas confirmado tu dirección de email en NPM:

   ```bash
   npm profile get
   ```

   Si aparece `email_verified: false`, sigue las instrucciones enviadas a tu email o solicita un nuevo correo de verificación desde la página de configuración de NPM.

2. **Nombre del paquete ya existente**: El nombre que has elegido para tu paquete ya está siendo utilizado. Verifica la disponibilidad:

   ```bash
   npm view nombre-del-paquete
   ```

   Si recibe información sobre un paquete, el nombre ya está tomado. Prueba con un nombre alternativo.

3. **Permisos insuficientes**: No tienes los permisos necesarios para publicar bajo el ámbito (scope) especificado. Esto ocurre especialmente con paquetes con ámbito de organización (@organización/paquete).

### Recibo el error `npm error code ENEEDAUTH` al publicar

Este error indica que no estás autenticado correctamente con NPM. Sigue estos pasos:

1. Verifica tu autenticación actual:

   ```bash
   npm whoami
   ```

   Si recibe un error, no estás autenticado.

2. Inicia sesión en NPM:

   ```bash
   npm login
   ```

3. Si estás utilizando un registro personalizado o un ámbito específico, asegúrate de incluir la información correcta:

   ```bash
   npm login --registry=https://registry.npmjs.org/ --scope=@tu-alcance
   ```

4. Si estás utilizando CI/CD para publicar, verifica que el token de NPM esté configurado correctamente en tus secretos del repositorio.

### Mi paquete se publica pero contiene archivos incorrectos o falta contenido

Verifica la configuración del campo `files` en tu `package.json`:

```json
{
  "files": ["dist"]
}
```

Este campo determina qué archivos y directorios se incluyen en el paquete publicado. Asegúrate de que incluya todos los archivos necesarios (distribución, tipos, etc.).

Para verificar exactamente qué archivos se incluirán sin publicar realmente, ejecuta:

```bash
npm pack
```

Esto generará un archivo `.tgz` que puedes examinar para ver qué se incluiría en la publicación.

### Semantic-release no está publicando automáticamente mi paquete

Algunos problemas comunes incluyen:

1. **Tokens incorrectos o faltantes**: Verifica que hayas configurado correctamente `GH_TOKEN` y `NPM_TOKEN` en los secretos de GitHub.

2. **Formato de commits incorrecto**: Semantic-release depende de [Conventional Commits](https://www.conventionalcommits.org/) para determinar el próximo número de versión. Asegúrate de que tus mensajes de commit sigan este formato.

3. **Rama incorrecta**: Por defecto, semantic-release solo se ejecuta en la rama principal (configurada en `release.config.js`). Verifica que estés trabajando en la rama correcta.

4. **Problemas en la configuración de CI**: Revisa los logs de GitHub Actions para identificar posibles errores en el flujo de trabajo.

</details>

## Actualización de dependencias

<details id="actualizacion-dependencias">
  <summary><strong>¿Cómo actualizo las dependencias de mi proyecto?</strong></summary>

### Actualización interactiva con npm-check-updates

La forma recomendada de actualizar las dependencias es utilizar `npm-check-updates` en modo interactivo:

```bash
npx npm-check-updates --interactive --format group
```

Esto mostrará un resumen de los paquetes que pueden actualizarse junto con sus versiones actuales y las últimas disponibles. El modo interactivo te permite seleccionar qué paquetes actualizar.

Para más control, puedes actualizar por grupos:

```bash
# Actualizar solo dependencias de desarrollo
npx npm-check-updates --interactive --format group --dep dev

# Actualizar solo dependencias de producción
npx npm-check-updates --interactive --format group --dep prod
```

Después de actualizar las versiones en el `package.json`, instala las nuevas dependencias:

```bash
npm install
```

### Actualización selectiva

Si prefieres actualizar paquetes específicos:

```bash
npm update nombre-del-paquete
```

Para actualizar a la última versión (incluso si implica cambios mayores):

```bash
npm install nombre-del-paquete@latest
```

### Verificación después de actualizar

Después de actualizar las dependencias, es importante:

1. Ejecutar la suite de pruebas:

   ```bash
   npm test
   ```

2. Verificar la construcción del proyecto:

   ```bash
   npm run build
   ```

3. Revisar posibles problemas de tipos:

   ```bash
   npm run typecheck
   ```

4. Comprobar el linting:

   ```bash
   npm run lint
   ```

### Gestión de vulnerabilidades

Para verificar vulnerabilidades en las dependencias:

```bash
npm audit
```

Para arreglar automáticamente los problemas cuando sea posible:

```bash
npm audit fix
```

Para casos más complejos que requieran actualizaciones mayores:

```bash
npm audit fix --force
```

> **Importante**: Usar `--force` puede introducir cambios importantes que rompan la compatibilidad. Siempre revisa los cambios y ejecuta las pruebas después.

</details>

## Adaptación para diferentes entornos

<details id="adaptacion-para-navegador">
  <summary><strong>¿Cómo adapto la librería para su uso en navegadores?</strong></summary>

Por defecto, este template está optimizado para Node.js, pero puede adaptarse fácilmente para entornos de navegador siguiendo estos pasos:

### 1. Actualizar la configuración de TypeScript

Modifica tu `tsconfig.json` para incluir configuraciones específicas para navegador:

```json
{
  "compilerOptions": {
    "lib": ["ESNext", "DOM"],
    "target": "ESNext",
    "module": "ESNext",
    "moduleResolution": "node",
    "outDir": "./dist",
    "rootDir": "./src",
    "types": ["node"]
  }
}
```

Alternativamente, puedes usar la configuración predefinida para navegador:

```json
{
  "extends": "personal-style-guide/typescript/browser"
}
```

### 2. Configurar ESLint para entorno de navegador

Si tu librería usa APIs específicas del navegador, actualiza la configuración de ESLint:

```javascript
// eslint.config.js
import eslintBrowser from "personal-style-guide/eslint/browser";

export default [...eslintBrowser];
```

### 3. Configurar el entorno de pruebas

Para probar código que utiliza APIs de navegador, configura `jsdom` como tu entorno de pruebas:

```bash
npm install jsdom --save-dev
```

Luego, configura Vitest para usar `jsdom` en el archivo `vitest.config.ts`:

```typescript
import { defineConfig } from "vitest/config";

export default defineConfig({
  test: {
    environment: "jsdom",
    globals: true,
  },
});
```

### 4. Actualizar la configuración de construcción

Asegúrate de que la configuración de tsup incluya las opciones adecuadas para el navegador:

```typescript
// tsup.config.ts
import { defineConfig } from "tsup";

export default defineConfig({
  entry: ["src/index.ts"],
  format: ["esm", "cjs", "iife"],
  dts: true,
  clean: true,
  minify: true,
  globalName: "TuLibreria", // Para el formato IIFE
  sourcemap: true,
});
```

### 5. Ejemplos de pruebas para entorno de navegador

Ahora puedes escribir pruebas que utilicen APIs del navegador:

```typescript
import { describe, expect, it } from "vitest";
import { almacenarPreferencia, obtenerPreferencia } from "../src/storage";

describe("Funciones de almacenamiento", () => {
  beforeEach(() => {
    // Limpiar localStorage antes de cada prueba
    localStorage.clear();
  });

  it("almacena y recupera preferencias correctamente", () => {
    almacenarPreferencia("tema", "oscuro");
    expect(localStorage.getItem("app_tema")).toBe("oscuro");
    expect(obtenerPreferencia("tema")).toBe("oscuro");
  });

  it("devuelve null para preferencias no existentes", () => {
    expect(obtenerPreferencia("idioma")).toBeNull();
  });
});
```

### 6. Creación de un playground para pruebas manuales

Para probar tu librería en un entorno de navegador real:

1. Crea un directorio `playground` con un proyecto simple basado en Vite
2. Enlaza tu librería como dependencia local
3. Crea ejemplos de uso que puedas probar manualmente

Consulta la sección [Check your library](/#check-your-library) en el README para instrucciones detalladas sobre cómo configurar un playground.

</details>

<details id="cobertura-de-tests">
  <summary><strong>¿Cómo añado cobertura de tests a mi proyecto?</strong></summary>

Este template ya incluye configuración para generar informes de cobertura de código utilizando [Vitest](https://vitest.dev/) y [c8](https://github.com/bcoe/c8). Aquí tienes los pasos para utilizarlo y personalizarlo:

### 1. Ejecutar tests con cobertura

Para generar un informe de cobertura, simplemente ejecuta:

```bash
npm run test:coverage
```

Este comando ejecutará todas tus pruebas y generará un informe de cobertura en la terminal, mostrando qué porcentaje de tu código está cubierto por pruebas.

### 2. Configuración de cobertura

La configuración de cobertura se encuentra en `vitest.config.ts`:

```typescript
export default defineConfig({
  test: {
    clearMocks: true,
    coverage: {
      include: ["src/**/*.ts"],
      provider: "v8",
      reporter: ["text", "lcovonly"],
    },
    environment: "node",
    globals: true,
  },
});
```

Puedes personalizar esta configuración según tus necesidades:

- `include`: Patrones para incluir archivos en el informe de cobertura
- `exclude`: Patrones para excluir archivos
- `provider`: Proveedor de cobertura ('v8' o 'istanbul')
- `reporter`: Formatos de salida del informe

### 3. Añadir más formatos de reporte

Para añadir más formatos de reporte, como HTML para visualización en navegador:

```typescript
coverage: {
  include: ["src/**/*.ts"],
  provider: "v8",
  reporter: ["text", "lcov", "html"],
}
```

Con esta configuración, se generará un informe HTML en `coverage/index.html` que puedes abrir en tu navegador.

### 4. Configurar umbrales de cobertura

Puedes establecer umbrales mínimos de cobertura para asegurar que tu código mantiene un nivel adecuado de tests:

```typescript
coverage: {
  include: ["src/**/*.ts"],
  provider: "v8",
  reporter: ["text", "lcov"],
  thresholds: {
    lines: 80,
    functions: 80,
    branches: 70,
    statements: 80
  }
}
```

Con esta configuración, los tests fallarán si la cobertura cae por debajo de los umbrales especificados.

### 5. Integración con CI/CD

Para incorporar la cobertura de código en tu flujo de CI/CD, puedes modificar tu archivo `.github/workflows/ci.yml`:

```yaml
test:
  name: Test with Coverage
  runs-on: ubuntu-22.04

  steps:
    - uses: actions/checkout@v4
    - uses: actions/setup-node@v4
      with:
        node-version: "lts/*"
    - uses: actions/cache@v3
      with:
        path: ~/.npm
        key: ${{ runner.os }}-node-${{ hashFiles('**/package-lock.json') }}
        restore-keys: |
          ${{ runner.os }}-node-

    - run: npm ci --ignore-scripts
    - run: npm run test:coverage

    # Opcionalmente, publicar resultados de cobertura
    - name: Upload coverage report
      uses: codecov/codecov-action@v3
      with:
        file: ./coverage/lcov.info
```

### 6. Ignorar archivos o líneas específicas

Para excluir ciertos archivos o líneas de la cobertura:

- **Excluir archivos**: Actualiza la configuración de cobertura:

  ```typescript
  coverage: {
    include: ["src/**/*.ts"],
    exclude: ["src/**/*.spec.ts", "src/types/**/*"],
    // ...
  }
  ```

- **Excluir líneas específicas**: Añade comentarios en el código:

  ```typescript
  /* istanbul ignore next */
  function debugLog(message: string): void {
    console.log(`[DEBUG]: ${message}`);
  }
  ```

</details>

<details id="desactivar-documentacion">
  <summary><strong>¿Cómo desactivo la documentación en mi proyecto?</strong></summary>

Si no necesitas la documentación generada con VitePress, puedes desactivarla siguiendo estos pasos:

### 1. Eliminar el directorio de documentación

Elimina la carpeta `docs` del proyecto:

```bash
rm -rf docs
```

### 2. Eliminar scripts relacionados con la documentación

Edita tu archivo `package.json` para eliminar los scripts relacionados con la documentación:

```json
{
  "scripts": {
    // Eliminar estas líneas
    "docs:dev": "vitepress dev docs",
    "docs:build": "vitepress build docs",
    "docs:preview": "vitepress preview docs"
  }
}
```

### 3. Eliminar dependencias de documentación

Elimina VitePress de tus dependencias de desarrollo:

```bash
npm uninstall vitepress
```

### 4. Eliminar flujo de trabajo de despliegue

Elimina el archivo de flujo de trabajo para el despliegue de la documentación:

```bash
rm .github/workflows/deploy.yml
```

### 5. Actualizar el README

Asegúrate de actualizar el README.md para eliminar cualquier referencia a la documentación. Busca y elimina:

- Secciones sobre documentación
- Enlaces a la documentación
- Instrucciones sobre cómo ejecutar o construir la documentación

### 6. Actualizar Configuración de CI/CD

Si tienes referencias a la construcción de documentación en otros flujos de trabajo, asegúrate de eliminarlas también.

### Alternativa: Documentación mínima

Si prefieres mantener algún tipo de documentación pero de forma más simple:

1. Mantén solo los archivos README.md en la raíz del proyecto y posiblemente en subdirectorios
2. Considera usar [JSDoc](https://jsdoc.app/) para documentar tu código, lo que generará documentación basada en comentarios
3. Para una solución intermedia, podrías usar [TypeDoc](https://typedoc.org/) que genera documentación directamente desde el código TypeScript:

   ```bash
   npm install --save-dev typedoc
   ```

   Y añadir un script para generarla:

   ```json
   {
     "scripts": {
       "docs:api": "typedoc --out docs/api src/index.ts"
     }
   }
   ```

</details>

<details id="plantillas-de-issues">
  <summary><strong>¿Cómo puedo configurar plantillas de issues en GitHub?</strong></summary>

Las plantillas de issues en GitHub ayudan a estandarizar la forma en que los usuarios reportan problemas o solicitan nuevas funcionalidades. Sigue estos pasos para configurarlas:

### 1. Crear el directorio de plantillas

Primero, crea el directorio necesario:

```bash
mkdir -p .github/ISSUE_TEMPLATE
```

### 2. Crear plantillas básicas

#### Plantilla para reportar bugs

Crea un archivo `.github/ISSUE_TEMPLATE/bug_report.md`:

```markdown
---
name: 🐞 Reporte de error
about: Crea un reporte para ayudarnos a mejorar
title: "[BUG] "
labels: bug
assignees: ""
---

**Describe el error**
Una descripción clara y concisa del error.

**Para reproducir**
Pasos para reproducir el comportamiento:

1. Ir a '...'
2. Hacer clic en '....'
3. Desplazarse hacia abajo hasta '....'
4. Ver el error

**Comportamiento esperado**
Una descripción clara y concisa de lo que esperabas que ocurriera.

**Capturas de pantalla**
Si aplica, añade capturas de pantalla para ayudar a explicar tu problema.

**Entorno (por favor completa la siguiente información):**

- Versión de la librería: [ej. 1.0.0]
- Node.js versión: [ej. 20.9.0]
- Sistema operativo: [ej. Windows 11]
- Navegador (si aplica): [ej. Chrome 119]

**Contexto adicional**
Añade cualquier otro contexto sobre el problema aquí.
```

#### Plantilla para solicitar funcionalidades

Crea un archivo `.github/ISSUE_TEMPLATE/feature_request.md`:

```markdown
---
name: 💡 Solicitud de funcionalidad
about: Sugiere una idea para este proyecto
title: "[FEATURE] "
labels: enhancement
assignees: ""
---

**¿Tu solicitud de funcionalidad está relacionada con un problema? Por favor descríbelo.**
Una descripción clara y concisa del problema. Ej. Siempre me frustro cuando [...]

**Describe la solución que te gustaría**
Una descripción clara y concisa de lo que quieres que ocurra.

**Describe alternativas que has considerado**
Una descripción clara y concisa de cualquier solución o característica alternativa que hayas considerado.

**Casos de uso**
Explica cómo se utilizaría esta función y quién se beneficiaría de ella.

**Contexto adicional**
Añade cualquier otro contexto o capturas de pantalla sobre la solicitud de funcionalidad aquí.
```

### 3. Configurar el formulario de selección (opcional)

Para crear un menú de selección cuando alguien crea un nuevo issue, crea un archivo `.github/ISSUE_TEMPLATE/config.yml`:

```yaml
blank_issues_enabled: false
contact_links:
  - name: 📝 Preguntas y Discusiones
    url: https://github.com/username/repo/discussions
    about: Por favor haz tus preguntas en la sección de discusiones
  - name: 💬 Comunidad Discord
    url: https://discord.gg/example
    about: Chatea con la comunidad y el equipo de mantenimiento
```

### 4. Plantillas en formato YAML (Alternativa)

GitHub también soporta un formato YAML más estructurado que crea formularios con validación. Por ejemplo:

Crea un archivo `.github/ISSUE_TEMPLATE/bug_report.yml`:

```yaml
name: 🐞 Reporte de error
description: Crea un reporte para ayudarnos a mejorar
title: "[BUG]: "
labels: ["bug", "triage"]
body:
  - type: markdown
    attributes:
      value: |
        ¡Gracias por tomarte el tiempo de reportar un error!
  - type: input
    id: version
    attributes:
      label: Versión
      description: ¿Qué versión de la librería estás utilizando?
      placeholder: "1.0.0"
    validations:
      required: true
  - type: textarea
    id: what-happened
    attributes:
      label: ¿Qué ocurrió?
      description: Describe el error y cómo reproducirlo
      placeholder: Cuando hago X, ocurre Y en lugar de Z
    validations:
      required: true
  - type: textarea
    id: code-example
    attributes:
      label: Ejemplo de código
      description: Por favor proporciona un ejemplo mínimo que reproduzca el problema
      render: typescript
  - type: dropdown
    id: environment
    attributes:
      label: Entorno
      description: ¿Dónde estás utilizando la librería?
      options:
        - Node.js
        - Navegador
        - React
        - Vue
        - Otro (especificar en la descripción)
    validations:
      required: true
  - type: checkboxes
    id: checks
    attributes:
      label: Verificaciones previas
      description: Por favor confirma lo siguiente
      options:
        - label: He buscado issues existentes y no encontré una similar
          required: true
        - label: Estoy utilizando la última versión de la librería
          required: true
```

### 5. Plantillas de Pull Request

También puedes crear una plantilla para Pull Requests. Crea un archivo `.github/pull_request_template.md`:

```markdown
## Descripción

<!-- Describe los cambios implementados en este PR -->

## Tipo de cambio

- [ ] 🐛 Corrección de error (cambio no disruptivo que soluciona un problema)
- [ ] ✨ Nueva funcionalidad (cambio no disruptivo que añade funcionalidad)
- [ ] 💥 Cambio disruptivo (cambio que no es compatible con versiones anteriores)
- [ ] 📝 Cambio en la documentación
- [ ] 🧹 Refactor de código o mejora de rendimiento

## Lista de verificación

<!-- Marca las casillas que apliquen -->

- [ ] Mi código sigue el estilo de código de este proyecto
- [ ] He realizado una autorevisión de mi propio código
- [ ] He comentado mi código, especialmente en áreas difíciles de entender
- [ ] He realizado los cambios correspondientes en la documentación
- [ ] Mis cambios no generan nuevas advertencias
- [ ] He añadido pruebas que demuestran que mi corrección es efectiva o que mi característica funciona
- [ ] Las pruebas unitarias nuevas y existentes pasan localmente con mis cambios
```

### 6. Recursos adicionales

Puedes encontrar un conjunto completo de plantillas personalizables y configuraciones en este [GitHub gist](https://gist.github.com/fvena/2876b888b9f9375683a866dbb6c52886). Incluye:

- Plantillas predefinidas para bugs, solicitudes de funcionalidades y preguntas generales
- Un archivo de configuración para opciones predeterminadas y etiquetas
- Directrices de contribución (`CONTRIBUTING.md`)
- Código de conducta (`CODE_OF_CONDUCT.md`)

</details>

## Configuración de herramientas

<details id="personalizacion-eslint">
  <summary><strong>¿Cómo personalizo la configuración de ESLint?</strong></summary>

El template utiliza una configuración predefinida de ESLint a través del paquete `personal-style-guide`. Sin embargo, puedes personalizarla según tus necesidades:

### 1. Modificar la configuración existente

Edita el archivo `eslint.config.js` para añadir, modificar o desactivar reglas:

```javascript
import eslintNode from "personal-style-guide/eslint/node";

export default [
  ...eslintNode,
  {
    rules: {
      // Desactivar reglas específicas
      "no-console": "off",

      // Modificar severidad
      "@typescript-eslint/explicit-function-return-type": "warn",

      // Personalizar reglas
      "max-len": ["error", { code: 120, ignoreComments: true }],
    },
  },
];
```

### 2. Crear una configuración personalizada desde cero

Si prefieres no usar la configuración predefinida, puedes crear tu propia configuración desde cero:

```javascript
// eslint.config.js
export default [
  {
    files: ["**/*.ts"],
    languageOptions: {
      parser: "@typescript-eslint/parser",
      parserOptions: {
        ecmaVersion: "latest",
        sourceType: "module",
      },
    },
    plugins: {
      "@typescript-eslint": tseslint,
    },
    rules: {
      // Tus reglas personalizadas aquí
      "no-unused-vars": "off",
      "@typescript-eslint/no-unused-vars": "error",
      // ...más reglas
    },
  },
];
```

### 3. Configurar diferentes entornos

Puedes tener diferentes configuraciones para diferentes tipos de archivos:

```javascript
export default [
  // Configuración para archivos de código fuente
  {
    files: ["src/**/*.ts"],
    // ...reglas estrictas para código fuente
  },

  // Configuración para archivos de prueba
  {
    files: ["test/**/*.ts"],
    // ...reglas más permisivas para pruebas
  },

  // Configuración para scripts
  {
    files: ["scripts/**/*.js"],
    // ...configuración para JavaScript
  },
];
```

### 4. Integrar con Prettier

El template ya integra ESLint con Prettier, pero si quieres personalizarlo:

```javascript
// .prettierrc.config.js
export default {
  printWidth: 100,
  tabWidth: 2,
  semi: true,
  singleQuote: true,
  trailingComma: "all",
  bracketSpacing: true,
  arrowParens: "avoid",
};
```

### 5. Desactivar reglas por archivo

Si necesitas desactivar reglas específicas para archivos particulares, puedes usar comentarios:

```typescript
// Desactivar para toda la línea
const unusedVar = "test"; // eslint-disable-line no-unused-vars

// Desactivar para la siguiente línea
// eslint-disable-next-line @typescript-eslint/no-explicit-any
function example(param: any): void {
  // ...
}

// Desactivar para todo el archivo
/* eslint-disable @typescript-eslint/no-explicit-any */
```

</details>

<details id="typescript-configuracion">
  <summary><strong>¿Cómo personalizo la configuración de TypeScript?</strong></summary>

El template utiliza una configuración predefinida a través de `personal-style-guide/typescript/node`, pero puedes personalizarla según tus necesidades:

### 1. Crear una configuración personalizada

Modifica tu archivo `tsconfig.json` para sobrescribir o extender la configuración base:

```json
{
  "extends": "personal-style-guide/typescript/node",
  "compilerOptions": {
    // Sobrescribir opciones específicas
    "target": "ES2022",
    "strictNullChecks": true,
    "noImplicitAny": true,

    // Añadir opciones adicionales
    "paths": {
      "@/*": ["./src/*"]
    }
  },
  "include": ["src", "test", "*.config.*"]
}
```

### 2. Configurar múltiples entornos de construcción

Para diferentes entornos o formatos de salida, puedes crear múltiples configuraciones:

```json
// tsconfig.json (configuración base)
{
  "extends": "personal-style-guide/typescript/node",
  "compilerOptions": {
    // Opciones comunes
  },
  "include": ["src"]
}
```

```json
// tsconfig.esm.json (para ESM)
{
  "extends": "./tsconfig.json",
  "compilerOptions": {
    "module": "ESNext",
    "outDir": "./dist/esm"
  }
}
```

```json
// tsconfig.cjs.json (para CommonJS)
{
  "extends": "./tsconfig.json",
  "compilerOptions": {
    "module": "CommonJS",
    "outDir": "./dist/cjs"
  }
}
```

Luego puedes configurar diferentes scripts en tu `package.json`:

```json
{
  "scripts": {
    "build:esm": "tsc -p tsconfig.esm.json",
    "build:cjs": "tsc -p tsconfig.cjs.json",
    "build": "npm run build:esm && npm run build:cjs"
  }
}
```

### 3. Configurar rutas de alias

Para facilitar las importaciones en proyectos grandes, puedes configurar alias de rutas:

```json
{
  "compilerOptions": {
    "baseUrl": ".",
    "paths": {
      "@core/*": ["src/core/*"],
      "@utils/*": ["src/utils/*"],
      "@types/*": ["src/types/*"]
    }
  }
}
```

Esto permite importaciones más limpias:

```typescript
// En lugar de
import { formatDate } from "../../../utils/date";

// Puedes usar
import { formatDate } from "@utils/date";
```

Para que estos alias funcionen con tsup, actualiza tu configuración:

```typescript
// tsup.config.ts
import { defineConfig } from "tsup";
import * as path from "path";

export default defineConfig({
  entry: ["src/index.ts"],
  format: ["cjs", "esm"],
  dts: true,
  sourcemap: true,
  clean: true,
  esbuildOptions(options) {
    options.alias = {
      "@core": path.resolve(__dirname, "./src/core"),
      "@utils": path.resolve(__dirname, "./src/utils"),
      "@types": path.resolve(__dirname, "./src/types"),
    };
  },
});
```

### 4. Configurar opciones estrictas

Para proyectos que requieren máxima seguridad de tipos:

```json
{
  "compilerOptions": {
    "strict": true,
    "noImplicitAny": true,
    "strictNullChecks": true,
    "strictFunctionTypes": true,
    "strictBindCallApply": true,
    "strictPropertyInitialization": true,
    "noImplicitThis": true,
    "useUnknownInCatchVariables": true,
    "alwaysStrict": true,
    "noImplicitReturns": true,
    "noFallthroughCasesInSwitch": true,
    "noUncheckedIndexedAccess": true,
    "noPropertyAccessFromIndexSignature": true
  }
}
```

Estas opciones proporcionan el máximo nivel de comprobación de tipos, lo que puede ayudar a detectar errores potenciales durante el desarrollo.

### 5. Configuración para diferentes versiones de TypeScript

Si necesitas compatibilidad con diferentes versiones de TypeScript:

```json
{
  "compilerOptions": {
    "target": "ES2019",
    "lib": ["ES2019", "DOM"],
    "downlevelIteration": true
  }
}
```

Esta configuración garantiza la compatibilidad con entornos más antiguos mientras sigues utilizando características modernas de TypeScript.

</details>

## Integración con otras herramientas

<details id="storybook-integracion">
  <summary><strong>¿Cómo integro Storybook con mi librería de componentes?</strong></summary>

Si estás desarrollando una librería de componentes UI (React, Vue, etc.), Storybook es una excelente herramienta para documentar y probar tus componentes de forma interactiva.

### 1. Instalación

```bash
npx storybook@latest init
```

Este comando detectará automáticamente tu entorno (React, Vue, etc.) e instalará las dependencias necesarias.

### 2. Configuración para TypeScript

Asegúrate de que Storybook pueda manejar correctamente TypeScript:

```javascript
// .storybook/main.js
/** @type { import('@storybook/react-webpack5').StorybookConfig } */
const config = {
  stories: ["../src/**/*.stories.@(js|jsx|ts|tsx)"],
  addons: [
    "@storybook/addon-links",
    "@storybook/addon-essentials",
    "@storybook/addon-interactions",
  ],
  framework: {
    name: "@storybook/react-webpack5",
    options: {},
  },
  typescript: {
    check: true,
    reactDocgen: "react-docgen-typescript",
  },
};
export default config;
```

### 3. Configurar scripts en package.json

```json
{
  "scripts": {
    "storybook": "storybook dev -p 6006",
    "build-storybook": "storybook build",
    "docs:storybook": "npm run build-storybook -- -o docs/public/storybook"
  }
}
```

### 4. Crear una historia de ejemplo

```typescript
// src/components/Button/Button.stories.tsx
import type { Meta, StoryObj } from "@storybook/react";
import { Button } from "./Button";

const meta: Meta<typeof Button> = {
  title: "Components/Button",
  component: Button,
  tags: ["autodocs"],
};

export default meta;
type Story = StoryObj<typeof Button>;

export const Primary: Story = {
  args: {
    variant: "primary",
    children: "Botón Primario",
  },
};

export const Secondary: Story = {
  args: {
    variant: "secondary",
    children: "Botón Secundario",
  },
};

export const Large: Story = {
  args: {
    size: "large",
    children: "Botón Grande",
  },
};
```

### 5. Integración con VitePress

Para integrar Storybook con tu documentación de VitePress:

1. Configura Storybook para construir en un directorio dentro de tu documentación:

```json
{
  "scripts": {
    "docs:storybook": "npm run build-storybook -- -o docs/public/storybook"
  }
}
```

2. Añade un enlace a Storybook en tu configuración de VitePress:

```typescript
// docs/.vitepress/config.ts
export default defineConfig({
  // ...
  themeConfig: {
    // ...
    sidebar: [
      // ...
      {
        text: "Componentes",
        items: [{ text: "Storybook", link: "/storybook/" }],
      },
    ],
  },
});
```

3. Crea un archivo `docs/storybook/index.md` que enlace a Storybook:

```markdown
# Biblioteca de Componentes

Explora nuestra biblioteca de componentes interactiva con Storybook:

<a href="/storybook/index.html" target="_blank">Abrir Storybook</a>
```

### 6. Despliegue automatizado

Para desplegar Storybook automáticamente en GitHub Pages, modifica el flujo de trabajo de despliegue:

```yaml
# .github/workflows/deploy.yml
buildDocs:
  # ...
  steps:
    # ...
    - name: Build Documentation
      run: npm run docs:build

    - name: Build Storybook
      run: npm run build-storybook -- -o docs/.vitepress/dist/storybook

    - uses: actions/upload-pages-artifact@v3
      with:
        path: docs/.vitepress/dist
```

</details>

<details id="ci-cd-personalizacion">
  <summary><strong>¿Cómo personalizo los flujos de trabajo de CI/CD?</strong></summary>

Los flujos de trabajo de CI/CD incluidos en el template se pueden personalizar para adaptarse a tus necesidades específicas:

### 1. Personalizar el flujo de CI

El flujo de trabajo de CI (`ci.yml`) verifica que tu código cumpla con los estándares y pase todas las pruebas. Para personalizarlo:

```yaml
# .github/workflows/ci.yml
name: CI/CD

on:
  push:
    branches:
      - main
      - "feature/**" # Añadir otras ramas para verificar
  pull_request:
    branches:
      - main

jobs:
  lint:
    name: Lint and Typecheck
    runs-on: ubuntu-22.04

    steps:
      # Pasos existentes...

      # Añadir pasos adicionales
      - run: npm run security-audit # Verificación de seguridad

  test:
    name: Test
    runs-on: ubuntu-22.04
    strategy:
      matrix:
        node-version: [18.x, 20.x] # Probar en múltiples versiones de Node

    steps:
      # ...pasos existentes

      # Guardar resultados de pruebas
      - name: Upload test results
        if: always()
        uses: actions/upload-artifact@v3
        with:
          name: test-results
          path: ./test-results
```

### 2. Personalizar el flujo de release

El flujo de trabajo de release (`release.yml`) gestiona la publicación automática de nuevas versiones:

```yaml
# .github/workflows/release.yml
name: Release

on:
  push:
    branches:
      - main
    paths-ignore:
      - "docs/**" # Ignorar cambios en documentación
      - "**.md" # Ignorar cambios en archivos markdown

permissions:
  contents: read

jobs:
  release:
    # ...configuración existente

    steps:
      # ...pasos existentes

      # Añadir paso de notificación
      - name: Notify team
        if: success()
        uses: rtCamp/action-slack-notify@v2
        env:
          SLACK_WEBHOOK: ${{ secrets.SLACK_WEBHOOK }}
          SLACK_TITLE: Nueva versión publicada
          SLACK_MESSAGE: "Se ha publicado la versión ${{ steps.semantic.outputs.new_release_version }}"
```

### 3. Añadir verificación de seguridad

Para añadir verificación de seguridad automática:

```yaml
# .github/workflows/security.yml
name: Security Scan

on:
  schedule:
    - cron: "0 0 * * 0" # Ejecutar semanalmente
  workflow_dispatch: # Permitir ejecución manual

jobs:
  security:
    name: Security Scan
    runs-on: ubuntu-latest

    steps:
      - uses: actions/checkout@v4

      - name: Run npm audit
        run: npm audit --audit-level=high

      - name: Run Snyk to check for vulnerabilities
        uses: snyk/actions/node@master
        env:
          SNYK_TOKEN: ${{ secrets.SNYK_TOKEN }}
```

### 4. Configurar despliegue en múltiples entornos

Para librerías que necesitan ser probadas en diferentes entornos antes de la publicación:

```yaml
# .github/workflows/preview.yml
name: Preview Package

on:
  pull_request:
    types:
      - opened
      - synchronize

jobs:
  build-and-publish-preview:
    runs-on: ubuntu-latest

    steps:
      - uses: actions/checkout@v4
      - uses: actions/setup-node@v4
        with:
          node-version: "lts/*"
          registry-url: "https://npm.pkg.github.com"

      # Generar una versión única para la vista previa
      - name: Set preview version
        run: |
          PR_NUMBER=${{ github.event.pull_request.number }}
          COMMIT_SHA=${{ github.sha }}
          SHORT_SHA=${COMMIT_SHA:0:7}
          echo "PREVIEW_VERSION=0.0.0-pr-${PR_NUMBER}-${SHORT_SHA}" >> $GITHUB_ENV

      # Actualizar package.json con la versión de vista previa
      - name: Update version
        run: npm version ${{ env.PREVIEW_VERSION }} --no-git-tag-version

      - run: npm ci
      - run: npm run build

      # Publicar paquete de vista previa
      - run: npm publish --tag pr-${{ github.event.pull_request.number }}
        env:
          NODE_AUTH_TOKEN: ${{ secrets.GITHUB_TOKEN }}

      # Comentar en el PR con instrucciones de instalación
      - name: Comment on PR
        uses: actions/github-script@v6
        with:
          script: |
            github.rest.issues.createComment({
              issue_number: context.issue.number,
              owner: context.repo.owner,
              repo: context.repo.repo,
              body: `📦 Paquete de vista previa publicado: \`${{ env.PREVIEW_VERSION }}\`

              Puedes instalarlo con:
              \`\`\`
              npm install your-package-name@${{ env.PREVIEW_VERSION }}
              \`\`\``
            })
```

### 5. Automatizar la publicación de changelogs en redes sociales

Para compartir automáticamente los cambios en redes sociales cuando se publica una nueva versión:

```yaml
# Añadir este job al archivo release.yml
announce:
  needs: release
  if: success()
  runs-on: ubuntu-latest

  steps:
    - name: Get release notes
      id: release-notes
      uses: actions/github-script@v6
      with:
        script: |
          const { data } = await github.rest.repos.getLatestRelease({
            owner: context.repo.owner,
            repo: context.repo.repo
          });
          return data.body;

    - name: Post to Twitter
      uses: ethomson/send-tweet-action@v1
      with:
        status: "Nueva versión ${{ needs.release.outputs.version }} disponible! ${{ github.repository }}. Novedades: ${{ steps.release-notes.outputs.result }}"
        consumer-key: ${{ secrets.TWITTER_CONSUMER_API_KEY }}
        consumer-secret: ${{ secrets.TWITTER_CONSUMER_API_SECRET }}
        access-token: ${{ secrets.TWITTER_ACCESS_TOKEN }}
        access-token-secret: ${{ secrets.TWITTER_ACCESS_TOKEN_SECRET }}
```

</details>

## Misceláneas

<details id="api-privada">
  <summary><strong>¿Cómo puedo crear y exportar una API privada?</strong></summary>

A veces necesitas mantener ciertos métodos o clases para uso interno pero accesibles desde diferentes partes de tu librería. Aquí hay varias estrategias para manejar APIs privadas:

### 1. Usar convenciones de nomenclatura

La forma más simple es usar una convención para indicar que algo es privado:

```typescript
// src/utils.ts
// Función pública
export function formatDate(date: Date): string {
  // Implementación
  return _formatToISOString(date);
}

// Función "privada" con prefijo _
export function _formatToISOString(date: Date): string {
  // Implementación interna
  return date.toISOString();
}
```

Luego, en tu punto de entrada principal, solo exportas las funciones públicas:

```typescript
// src/index.ts
export { formatDate } from "./utils";
// No exportamos _formatToISOString
```

### 2. Usar archivos internos

Otra estrategia es mantener una estructura clara de lo que es público y lo que es interno:

```
src/
  ├── index.ts           # Exportaciones públicas
  ├── public/
  │   ├── formatters.ts
  │   └── validators.ts
  └── internal/
      ├── helpers.ts
      └── types.ts
```

En este caso, solo exportas desde la carpeta `public` en tu archivo `index.ts`:

```typescript
// src/index.ts
export * from "./public/formatters";
export * from "./public/validators";
// No exportamos nada de internal/
```

### 3. Usar módulos TypeScript con encapsulación

TypeScript permite encapsular código dentro de módulos:

```typescript
// src/validator.ts
// API pública
export class Validator {
  validate(value: unknown): boolean {
    return internalValidate(value);
  }
}

// API interna - no se exporta fuera de este módulo
function internalValidate(value: unknown): boolean {
  // Implementación
  return true;
}
```

### 4. Usar barrels para exportaciones

Los "barrels" (archivo index.ts en cada carpeta) te permiten controlar exactamente qué se exporta:

```typescript
// src/validation/string-validator.ts
export class StringValidator {
  // Implementación
}

// Función interna no exportada en el barrel
export function parseRegexPattern(pattern: string): RegExp {
  // Implementación
}
```

```typescript
// src/validation/index.ts (barrel)
export { StringValidator } from "./string-validator";
// No exportamos parseRegexPattern
```

```typescript
// src/index.ts
export * from "./validation";
```

### 5. Documentación de API privada

Para funciones que son técnicamente públicas (necesitan ser exportadas para uso interno) pero que no quieres que los usuarios finales utilicen, usa JSDoc para documentar esto claramente:

```typescript
/**
 * @internal
 * Esta función es para uso interno de la librería.
 * No debe ser utilizada directamente por los consumidores de la API.
 * Está sujeta a cambios sin previo aviso.
 */
export function internalHelper(): void {
  // Implementación
}
```

También puedes usar el modificador `/** @deprecated */` para desalentar el uso de ciertas APIs:

```typescript
/**
 * @deprecated Esta función será eliminada en la próxima versión mayor.
 * Utiliza la nueva API `newFunction()` en su lugar.
 */
export function oldFunction(): void {
  // Implementación
}
```

</details>

<details id="changelog-manual">
  <summary><strong>¿Cómo genero un changelog manualmente?</strong></summary>

Aunque el template utiliza `semantic-release` para generar changelogs automáticamente, a veces necesitas crear o actualizar un changelog de forma manual:

### 1. Estructura básica de un changelog

El formato recomendado para changelogs sigue el estándar [Keep a Changelog](https://keepachangelog.com/):

```markdown
# Changelog

Todos los cambios notables en este proyecto serán documentados en este archivo.

El formato está basado en [Keep a Changelog](https://keepachangelog.com/es/1.0.0/),
y este proyecto sigue [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

## [1.2.0] - 2025-03-12

### Añadido

- Nueva funcionalidad X que permite hacer Y
- Soporte para formato Z

### Cambiado

- Mejorado el rendimiento de la función A
- Actualizada la dependencia B a la versión 2.0.0

### Corregido

- Solucionado el error que causaba C cuando D ocurría
- Arreglado problema de tipado en E

## [1.1.0] - 2025-02-15

### Añadido

- ...

### Cambiado

- ...

## [1.0.0] - 2025-01-01

### Añadido

- Versión inicial
```

### 2. Generar changelog a partir de commits

Si no tienes un changelog automático pero sigues la convención de Conventional Commits, puedes generar uno manual basado en tus commits:

```bash
git log --pretty=format:"- %s" $(git describe --tags --abbrev=0)..HEAD
```

Este comando mostrará todos los mensajes de commit desde el último tag. Puedes organizarlos manualmente en categorías.

### 3. Script para generar changelog

Para proyectos más grandes, puedes crear un script que automatice parte del proceso:

```javascript
// scripts/generate-changelog.js
const { execSync } = require("child_process");
const fs = require("fs");
const path = require("path");

// Obtener el último tag
const lastTag = execSync("git describe --tags --abbrev=0").toString().trim();
console.log(`Último tag: ${lastTag}`);

// Obtener commits desde el último tag
const commitCommand = `git log --pretty=format:"%s|%h" ${lastTag}..HEAD`;
const commits = execSync(commitCommand).toString().split("\n");

// Categorizar commits basados en convenciones
const categorized = {
  feat: [],
  fix: [],
  docs: [],
  style: [],
  refactor: [],
  perf: [],
  test: [],
  build: [],
  ci: [],
  chore: [],
  revert: [],
  other: [],
};

commits.forEach((commit) => {
  if (!commit) return;

  const [message, hash] = commit.split("|");

  // Analizar el mensaje para extraer el tipo
  const match = message.match(
    /^(feat|fix|docs|style|refactor|perf|test|build|ci|chore|revert)(\(.*\))?:\s*(.*)/,
  );

  if (match) {
    const [, type, scope, description] = match;
    categorized[type].push({
      hash,
      scope: scope ? scope.replace(/[\(\)]/g, "") : "",
      description,
    });
  } else {
    categorized.other.push({ hash, description: message });
  }
});

// Generar markdown para el changelog
let changelogContent = `## [Unreleased] - ${new Date().toISOString().split("T")[0]}\n\n`;

if (categorized.feat.length > 0) {
  changelogContent += "### Añadido\n";
  categorized.feat.forEach((commit) => {
    changelogContent += `- ${commit.description} (${commit.hash})\n`;
  });
  changelogContent += "\n";
}

if (categorized.fix.length > 0) {
  changelogContent += "### Corregido\n";
  categorized.fix.forEach((commit) => {
    changelogContent += `- ${commit.description} (${commit.hash})\n`;
  });
  changelogContent += "\n";
}

if (categorized.perf.length > 0) {
  changelogContent += "### Optimizado\n";
  categorized.perf.forEach((commit) => {
    changelogContent += `- ${commit.description} (${commit.hash})\n`;
  });
  changelogContent += "\n";
}

// Otras categorías importantes
const otherCategories = [
  { key: "docs", title: "Documentación" },
  { key: "refactor", title: "Refactorizado" },
  { key: "style", title: "Estilo" },
  { key: "test", title: "Tests" },
];

otherCategories.forEach(({ key, title }) => {
  if (categorized[key].length > 0) {
    changelogContent += `### ${title}\n`;
    categorized[key].forEach((commit) => {
      changelogContent += `- ${commit.description} (${commit.hash})\n`;
    });
    changelogContent += "\n";
  }
});

// Escribir al archivo CHANGELOG.md
const changelogPath = path.join(__dirname, "..", "CHANGELOG.md");
let existingChangelog = "";

if (fs.existsSync(changelogPath)) {
  existingChangelog = fs.readFileSync(changelogPath, "utf8");

  // Buscar la posición donde insertar el nuevo contenido
  const unreleased = existingChangelog.indexOf("## [Unreleased]");
  const firstVersionHeader = existingChangelog.indexOf("## [");

  if (unreleased !== -1) {
    // Reemplazar la sección Unreleased
    existingChangelog = existingChangelog.replace(
      /## \[Unreleased\][^\n]*\n(?:[\s\S]*?)(?=## \[\d+\.\d+\.\d+\]|$)/,
      changelogContent,
    );
  } else if (firstVersionHeader !== -1) {
    // Insertar antes de la primera versión
    existingChangelog =
      existingChangelog.slice(0, firstVersionHeader) +
      changelogContent +
      existingChangelog.slice(firstVersionHeader);
  } else {
    // Añadir al final
    existingChangelog += "\n" + changelogContent;
  }
} else {
  // Crear nuevo changelog
  existingChangelog = `# Changelog

Todos los cambios notables en este proyecto serán documentados en este archivo.

El formato está basado en [Keep a Changelog](https://keepachangelog.com/es/1.0.0/),
y este proyecto sigue [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

${changelogContent}`;
}

fs.writeFileSync(changelogPath, existingChangelog);
console.log(`Changelog actualizado en ${changelogPath}`);
```

### 4. Creación manual de release

Si necesitas crear una release manualmente:

1. Actualiza la versión en `package.json`
2. Actualiza el `CHANGELOG.md` con los cambios de la nueva versión
3. Crea un commit para la nueva versión:

   ```bash
   git add package.json CHANGELOG.md
   git commit -m "chore(release): 1.2.0 [skip ci]"
   ```

4. Crea un tag para la nueva versión:

   ```bash
   git tag v1.2.0
   ```

5. Publica los cambios:

   ```bash
   git push origin main --tags
   ```

6. Publica el paquete:

   ```bash
   npm publish
   ```

</details>

## ¿No encuentras lo que buscas?

Si tu pregunta no está respondida aquí, considera estas opciones:

1. Revisa la [documentación completa](/) para encontrar información más detallada.
2. Abre un [issue](https://github.com/fvena/typescript-library-template-pro/issues) en el repositorio con tu pregunta.
3. Consulta la [documentación oficial](https://www.typescriptlang.org/docs/) de TypeScript para dudas específicas del lenguaje.
4. Para preguntas sobre herramientas específicas, revisa su documentación oficial:
   - [ESLint](https://eslint.org/docs/user-guide/)
   - [Vitest](https://vitest.dev/guide/)
   - [semantic-release](https://semantic-release.gitbook.io/semantic-release/)
   - [Tsup](https://tsup.egoist.dev/)
   - [VitePress](https://vitepress.dev/)
