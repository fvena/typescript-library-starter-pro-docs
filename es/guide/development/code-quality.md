# Calidad del código

TypeScript Library Template Pro integra varias herramientas para garantizar la calidad de código.

## ESLint

[ESLint](https://eslint.org/) es una herramienta para identificar errores y problemas en el código, así como para aplicar convenciones de estilo.

### Configuración básica

El archivo `eslint.config.js` contiene la configuración:

```javascript
import eslintNode from "personal-style-guide/eslint/node";

export default [...eslintNode];
```

Esta configuración extiende un conjunto predefinido de reglas para proyectos de Node.js. Si tu biblioteca está destinada a otros entornos (como navegadores web), puedes ajustar la configuración:

```javascript
// Para bibliotecas destinadas a navegadores
import eslintBrowser from "personal-style-guide/eslint/browser";

export default [...eslintBrowser];
```

### Reglas personalizadas

Puedes personalizar las reglas de ESLint según los requisitos específicos de tu proyecto:

```javascript
import eslintNode from "personal-style-guide/eslint/node";

export default [
  ...eslintNode,
  {
    rules: {
      "no-console": "off",
      "prefer-const": "warn",
      "max-len": ["error", { code: 100, ignoreComments: true }],
    },
  },
];
```

### Ejecutar ESLint

```bash
npm run lint
```

### Ignorar archivos específicos

Si necesitas excluir ciertos archivos del análisis de ESLint, puedes crear un archivo `.eslintignore` en la raíz del proyecto:

```
dist/
node_modules/
coverage/
```

## Prettier

[Prettier](https://prettier.io/) asegura la consistencia en el estilo de código del proyecto.

### Configuración básica

El archivo `.prettierrc.config.js` contiene la configuración:

```javascript
export { default } from "personal-style-guide/prettier/index.js";
```

Esta configuración importa un conjunto predefinido de reglas de formato. Si necesitas personalizaciones específicas, puedes modificar este archivo:

```javascript
import baseConfig from "personal-style-guide/prettier/index.js";

export default {
  ...baseConfig,
  // Tus personalizaciones
  printWidth: 100,
  tabWidth: 2,
  semi: true,
  singleQuote: false,
};
```

### Ignorar archivos

La plantilla incluye un archivo `.prettierignore` que especifica qué archivos deben ser excluidos del formateo:

```
dist
node_modules
```

### Ejecutar Prettier

```bash
npm run format
```

## TypeScript

TypeScript ayuda a detectar errores potenciales durante el desarrollo.

### Configuración básica

El archivo `tsconfig.json` contiene la configuración:

```json
{
  "extends": "personal-style-guide/typescript/node",
  "include": ["src", "test", "docs/.vitepress/**/*", "*.config.*"]
}
```

Esta configuración extiende un conjunto predefinido de opciones para proyectos de Node.js. Si tu biblioteca está destinada a otros entornos, puedes ajustar la configuración:

```json
{
  "extends": "personal-style-guide/typescript/browser",
  "include": ["src", "test", "docs/.vitepress/**/*", "*.config.*"]
}
```

### Verificar los tipos

```bash
npm run typecheck
```

## Verificación de exportaciones

La plantilla incluye una utilidad para verificar que los tipos exportados son precisos y completos, lo que es crucial para bibliotecas que serán utilizadas por otros desarrolladores.

```bash
npm run check-exports
```

## Husky y lint-staged

Estas herramientas ejecutan verificaciones de código antes de cada commit.

- **[Husky](https://typicode.github.io/husky/)**: Configura los hooks de Git (`.husky/`)
- **[lint-staged](https://github.com/okonet/lint-staged)**: Ejecuta linters solo en archivos modificados

## Herramientas adicionales

Además de las herramientas incluidas en la plantilla, considera integrar estas herramientas adicionales para mejorar aún más la calidad del código:

### Code Spell Checker

[Code Spell Checker](https://github.com/streetsidesoftware/cspell) es una herramienta que verifica el uso de palabras correctas en el código.

### SonarQube / SonarCloud

SonarQube (o su versión en la nube, SonarCloud) proporciona análisis estático avanzado que puede identificar:

- Olores de código (code smells)
- Bugs potenciales
- Vulnerabilidades de seguridad
- Deuda técnica
- Cobertura de código

### CodeClimate

CodeClimate ofrece métricas de calidad de código y puede identificar:

- Código duplicado
- Complejidad excesiva
- Problemas de mantenibilidad
- Violaciones de estilo

### Dependabot

La plantilla ya incluye configuración para Dependabot, que mantiene tus dependencias actualizadas automáticamente:

```yaml
# .github/dependabot.yml
version: 2
updates:
  - package-ecosystem: "npm"
    directory: "/"
    schedule:
      interval: "monthly"
    commit-message:
      prefix: "npm"
    groups:
      all:
        patterns:
          - "*"
```

### Bundle size analysis

Para bibliotecas destinadas a navegadores, es importante monitorear el tamaño del bundle:

- [bundlephobia](https://bundlephobia.com/) para análisis manual
- [size-limit](https://github.com/ai/size-limit) para límites automatizados en CI

## Seguridad

La calidad del código también incluye aspectos de seguridad:

### Auditoría de dependencias

Ejecuta regularmente auditorías de seguridad para identificar vulnerabilidades en las dependencias:

```bash
npm audit
```

### Análisis de seguridad

Integra herramientas de análisis de seguridad:

- [Snyk](https://snyk.io/) para seguridad de dependencias y código
- [npm-audit-action](https://github.com/oke-py/npm-audit-action) para GitHub Actions
