# Librerías de estilos

La plantilla TypeScript Library Template Pro puede adaptarse para crear bibliotecas de estilos sofisticadas utilizando CSS, Sass, Less u otras tecnologías.

## Configuración para SASS/CSS

La plantilla base no incluye procesadores de CSS, por lo que necesitarás extenderla para trabajar con estilos.

### Instalación de dependencias

Primero, instala las dependencias necesarias para trabajar con Sass y procesar CSS:

```bash
# Para Sass
npm install --save-dev sass sass-loader

# Para PostCSS (procesamiento avanzado de CSS)
npm install --save-dev postcss postcss-cli autoprefixer cssnano

# Para empaquetado y extracción de CSS
npm install --save-dev mini-css-extract-plugin css-loader style-loader
```

### Estructura de archivos

Recomendamos organizar los archivos de estilos siguiendo una arquitectura modular:

```
src/
  ├── styles/                # Directorio principal de estilos
  │   ├── index.scss         # Punto de entrada principal
  │   ├── variables/         # Variables y tokens de diseño
  │   │   ├── _colors.scss
  │   │   ├── _typography.scss
  │   │   ├── _spacing.scss
  │   │   └── _index.scss     # Re-exporta todas las variables
  │   ├── mixins/            # Mixins reutilizables
  │   │   ├── _responsive.scss
  │   │   ├── _typography.scss
  │   │   └── _index.scss
  │   ├── components/        # Estilos de componentes
  │   │   ├── _buttons.scss
  │   │   ├── _forms.scss
  │   │   └── _index.scss
  │   └── themes/            # Temas (opcional)
  │       ├── _light.scss
  │       ├── _dark.scss
  │       └── _index.scss
  └── index.ts               # Punto de entrada TypeScript
```

### Configuración del punto de entrada

En `src/index.ts`, importa y exporta tus estilos:

```typescript
// Importar estilos
import "./styles/index.scss";

// Exportar utilidades relacionadas con estilos (si las hay)
export { setupTheme } from "./theme";
export { getColorVariables, getFontVariables } from "./variables";
export type { ThemeOptions, ColorPalette } from "./types";
```

## Bundling de estilos

Para incluir tus estilos en el bundle final, necesitas configurar las herramientas de empaquetado adecuadamente.

### Configuración de tsup

Modifica `tsup.config.ts` para incluir el procesamiento de estilos:

```typescript
import { defineConfig } from "tsup";
import autoprefixer from "autoprefixer";
import cssnano from "cssnano";

export default defineConfig({
  clean: true,
  dts: true,
  entryPoints: ["src/index.ts"],
  format: ["esm", "cjs"],
  sourcemap: true,
  outDir: "dist",

  // Configuración para CSS
  esbuildOptions(options) {
    options.loader = {
      ...options.loader,
      ".scss": "css",
      ".css": "css",
    };
  },
});
```

## Optimización para producción

Al preparar tu biblioteca de estilos para producción, es importante optimizar los archivos CSS para un rendimiento óptimo.

### Minificación y autoprefixing

Configura una pipeline de PostCSS para optimizar los archivos CSS finales:

```javascript
// postcss.config.js
module.exports = {
  plugins: [
    require("autoprefixer"),
    require("cssnano")({
      preset: [
        "default",
        {
          discardComments: { removeAll: true },
          normalizeWhitespace: true,
          minifyFontValues: { removeQuotes: false },
        },
      ],
    }),
  ],
};
```

### Compresión de archivos

Para bibliotecas de gran tamaño, considera implementar estrategias de compresión:

```bash
# Comprime los archivos CSS para distribución
gzip -9 -c dist/styles.css > dist/styles.css.gz
```

Añade esto a tu script de compilación en package.json:

```json
"scripts": {
  "build": "tsup && postcss dist/styles.css -o dist/styles.min.css && npm run compress",
  "compress": "gzip -9 -c dist/styles.min.css > dist/styles.min.css.gz"
}
```

### Purging de CSS no utilizado

Para eliminar estilos no utilizados en producción:

```bash
npm install --save-dev postcss-purgecss
```

Añade PurgeCSS a tu configuración de PostCSS:

```javascript
// postcss.config.js
module.exports = {
  plugins: [
    // Otros plugins...
    require("@fullhuman/postcss-purgecss")({
      content: ["./src/**/*.{ts,tsx,js,jsx}"],
      safelist: [
        // Clases que no deben ser eliminadas
        /^btn-/,
        /^card-/,
        /^col-/,
      ],
    }),
  ],
};
```

## Internacionalización y RTL

Para bibliotecas que necesitan soportar múltiples idiomas y direcciones de texto:

### Soporte para RTL (Right-to-Left)

```scss
// src/styles/mixins/_rtl.scss
@mixin rtl {
  [dir="rtl"] & {
    @content;
  }
}

// Ejemplo de uso
.component {
  margin-left: var(--spacing-md);

  @include rtl {
    margin-left: 0;
    margin-right: var(--spacing-md);
  }
}
```

### Generación automatizada de RTL

Para proyectos más grandes, considera usar herramientas como RTLCSS:

```bash
npm install --save-dev rtlcss
```

Añade el script en package.json:

```json
"scripts": {
  "build:rtl": "rtlcss dist/styles.css dist/styles.rtl.css"
}
```

## Accesibilidad

Asegúrate de que tu biblioteca de estilos cumpla con los estándares de accesibilidad:

### Contrastes y variables de color

```scss
// src/styles/utilities/_accessibility.scss
// Clases utilitarias para accesibilidad
.sr-only {
  position: absolute;
  width: 1px;
  height: 1px;
  padding: 0;
  margin: -1px;
  overflow: hidden;
  clip: rect(0, 0, 0, 0);
  white-space: nowrap;
  border-width: 0;
}

.focus-visible {
  outline: 2px solid var(--color-primary-500);
  outline-offset: 2px;
}
```

### Testing de contrastes

```typescript
// test/accessibility.test.ts
import { describe, expect, it } from "vitest";
import { getColorValue } from "../src/variables";

describe("Color contrast accessibility", () => {
  it("should have sufficient contrast for primary buttons", () => {
    const bgColor = getColorValue("primary-500");
    const textColor = getColorValue("white");

    // Usar una función de cálculo de contraste
    const contrast = calculateContrast(bgColor, textColor);

    // WCAG AA requiere 4.5:1 para texto normal, 3:1 para texto grande
    expect(contrast).toBeGreaterThanOrEqual(4.5);
  });
});

// Función simplificada para calcular contraste
function calculateContrast(bg: string, fg: string): number {
  // Implementación del cálculo de contraste
  // En la práctica, usarías una biblioteca como color o wcag-contrast
  return 5.0; // Valor de ejemplo
}
```

## Documentación específica para bibliotecas de estilos

### Generación de guía de estilos

Crea una guía de estilos generada automáticamente:

```typescript
// scripts/generate-styleguide.ts
import * as fs from "fs";
import * as path from "path";

// Leer variables SCSS
const colorsScss = fs.readFileSync(
  path.join(__dirname, "../src/styles/variables/_colors.scss"),
  "utf-8",
);

// Extraer variables usando regex
const colorRegex = /'([^']+)':\s*([^,]+),/g;
let match;
const colors: Record<string, string> = {};

while ((match = colorRegex.exec(colorsScss)) !== null) {
  colors[match[1]] = match[2].trim();
}

// Generar documentación markdown
let markdown = "# Color Palette\n\n";
markdown += "| Name | Value | Sample |\n";
markdown += "|------|-------|---------|\n";

Object.entries(colors).forEach(([name, value]) => {
  markdown += `| ${name} | ${value} | <div style="background-color: ${value}; width: 50px; height: 20px;"></div> |\n`;
});

// Escribir markdown
fs.writeFileSync(
  path.join(__dirname, "../docs/styleguide/colors.md"),
  markdown,
);

console.log("Color styleguide generated successfully!");
```

## Manejo de temas

Las bibliotecas de estilos modernas a menudo incluyen soporte para temas claros/oscuros o personalizables.

### Variables CSS para temas

```scss
// src/styles/themes/_light.scss
:root {
  --color-bg-primary: #ffffff;
  --color-bg-secondary: #f8f9fa;
  --color-text-primary: #212529;
  --color-text-secondary: #6c757d;
  --color-accent: #0d6efd;
  --color-border: #dee2e6;
}

// src/styles/themes/_dark.scss
.dark-theme {
  --color-bg-primary: #212529;
  --color-bg-secondary: #343a40;
  --color-text-primary: #f8f9fa;
  --color-text-secondary: #adb5bd;
  --color-accent: #3d8bfd;
  --color-border: #495057;
}
```

### Cambio de temas dinámico

```typescript
// src/theme.ts
export type ThemeMode = "light" | "dark";

export function setupTheme(initialTheme: ThemeMode = "light") {
  let currentTheme = initialTheme;

  // Aplicar tema inicial
  applyTheme(currentTheme);

  function applyTheme(theme: ThemeMode) {
    if (theme === "dark") {
      document.documentElement.classList.add("dark-theme");
    } else {
      document.documentElement.classList.remove("dark-theme");
    }

    // Guardar preferencia (opcional)
    localStorage.setItem("theme-preference", theme);

    // Actualizar estado
    currentTheme = theme;
  }

  function toggleTheme() {
    const newTheme = currentTheme === "light" ? "dark" : "light";
    applyTheme(newTheme);
    return newTheme;
  }

  function getTheme() {
    return currentTheme;
  }

  return {
    applyTheme,
    toggleTheme,
    getTheme,
  };
}

// Utilidad para detectar preferencia del sistema
export function detectSystemTheme(): ThemeMode {
  return window.matchMedia("(prefers-color-scheme: dark)").matches
    ? "dark"
    : "light";
}
```

## Sistema de diseño con tokens

Para crear una biblioteca de estilos cohesiva, es recomendable implementar un sistema de tokens de diseño.

### Definición de tokens

```scss
// src/styles/variables/_colors.scss
$colors: (
  // Colores base
  "black": #000000,
  "white": #ffffff,

  // Escala de grises
  "gray-100": #f8f9fa,
  "gray-200": #e9ecef,
  "gray-300": #dee2e6,
  "gray-400": #ced4da,
  "gray-500": #adb5bd,
  "gray-600": #6c757d,
  "gray-700": #495057,
  "gray-800": #343a40,
  "gray-900": #212529,

  // Colores primarios
  "primary-100": #d0e3ff,
  "primary-200": #a1c7ff,
  "primary-300": #72aaff,
  "primary-400": #448eff,
  "primary-500": #0d6efd,
  "primary-600": #0b5cd9,
  "primary-700": #094ab6,
  "primary-800": #073892,
  "primary-900": #05266e
);

// src/styles/variables/_typography.scss
$typography: (
  "font-family-base": 'system-ui, -apple-system, "Segoe UI", Roboto, sans-serif',
  "font-family-mono": "SFMono-Regular, Menlo, Monaco, Consolas, monospace",

  "font-size-xs": 0.75rem,
  // 12px
  "font-size-sm": 0.875rem,
  // 14px
  "font-size-md": 1rem,
  // 16px
  "font-size-lg": 1.125rem,
  // 18px
  "font-size-xl": 1.25rem,
  // 20px
  "font-size-2xl": 1.5rem,
  // 24px
  "font-size-3xl": 1.875rem,
  // 30px
  "font-size-4xl": 2.25rem,

  // 36px
  "line-height-tight": 1.25,
  "line-height-base": 1.5,
  "line-height-loose": 1.75,

  "font-weight-light": 300,
  "font-weight-normal": 400,
  "font-weight-medium": 500,
  "font-weight-semibold": 600,
  "font-weight-bold": 700,
);

// src/styles/variables/_spacing.scss
$spacing: (
  "none": 0,
  "xs": 0.25rem,
  // 4px
  "sm": 0.5rem,
  // 8px
  "md": 1rem,
  // 16px
  "lg": 1.5rem,
  // 24px
  "xl": 2rem,
  // 32px
  "2xl": 3rem,
  // 48px
  "3xl": 4rem,

  // 64px
  "borderRadius": 0.375rem, // 6px
);
```

### Generación de variables CSS

```scss
// src/styles/variables/_index.scss
@import "colors";
@import "typography";
@import "spacing";

:root {
  // Convertir tokens a variables CSS
  @each $key, $value in $colors {
    --color-#{$key}: #{$value};
  }

  @each $key, $value in $typography {
    --typography-#{$key}: #{$value};
  }

  @each $key, $value in $spacing {
    --spacing-#{$key}: #{$value};
  }
}

// Crear funciones de acceso
@function color($key) {
  @return var(--color-#{$key});
}

@function typography($key) {
  @return var(--typography-#{$key});
}

@function spacing($key) {
  @return var(--spacing-#{$key});
}
```

## Importación en proyectos

Hay varias formas de permitir que los consumidores de tu biblioteca importen los estilos.

### Importación directa de CSS compilado

```css
/* En tu aplicación */
@import "mi-biblioteca/dist/styles.css";
```

### Importación de SCSS para personalización

```scss
/* En tu aplicación */
// Primero, modificar variables
$primary-500: #ff0000; // Sobreescribir el color primario

// Luego importar la biblioteca
@import "mi-biblioteca/src/styles/index.scss";
```

Para facilitar esto, configura tu `package.json`:

```json
{
  "files": [
    "dist",
    "src/styles" // Incluir los archivos fuente de Sass
  ],
  "exports": {
    ".": {
      "import": "./dist/index.js",
      "require": "./dist/index.cjs"
    },
    "./styles": {
      "import": "./dist/styles.css"
    },
    "./scss": {
      "import": "./src/styles/index.scss"
    }
  }
}
```

## Testing de estilos

El testing de estilos asegura que tu biblioteca mantenga consistencia visual y funcione correctamente.

### Testing con Vitest y JSDOM

```typescript
// test/styles.test.ts
import { describe, expect, it, beforeEach, afterEach } from "vitest";
import "../src/styles/index.scss"; // Importar estilos

describe("Button styles", () => {
  let button: HTMLButtonElement;

  beforeEach(() => {
    // Configurar elementos para pruebas
    document.body.innerHTML = "";
    button = document.createElement("button");
    button.textContent = "Test Button";
    document.body.appendChild(button);
  });

  afterEach(() => {
    // Limpiar
    document.body.innerHTML = "";
  });

  it("should apply primary button styles correctly", () => {
    // Aplicar clases
    button.classList.add("btn", "btn-primary");

    // Obtener estilos computados
    const styles = getComputedStyle(button);

    // Verificar estilos
    expect(styles.backgroundColor).toBe("rgb(13, 110, 253)"); // primary-500
    expect(styles.color).toBe("rgb(255, 255, 255)"); // white
    expect(styles.borderRadius).toBe("6px"); // borderRadius
  });

  it("should change styles on hover", () => {
    // Esta prueba necesitaría un enfoque más avanzado para simular hover
    // Este es un ejemplo simplificado
    button.classList.add("btn", "btn-primary");

    // Simular hover (esto es una aproximación)
    const hoverStyles = `
      .btn-primary:hover {
        background-color: var(--color-primary-600);
      }
    `;
    const styleElement = document.createElement("style");
    styleElement.innerHTML = hoverStyles;
    document.head.appendChild(styleElement);

    // Disparar hover (nota: esto no funcionará completamente en JSDOM)
    button.dispatchEvent(new MouseEvent("mouseover"));

    // En un entorno de navegador real, podrías verificar los cambios
    // En JSDOM, este es más un ejemplo conceptual
  });
});
```

### Testing visual con Storybook

Para pruebas visuales más completas, considera integrar Storybook:

1. Instala Storybook:

```bash
npx storybook init
```

2. Crea historias para tus componentes de estilo:

```typescript
// stories/Button.stories.ts
import { buttonStyles } from "../src/styles/button";

export default {
  title: "Components/Button",
  argTypes: {
    variant: {
      control: { type: "select", options: ["primary", "secondary"] },
    },
    size: {
      control: { type: "select", options: ["small", "medium", "large"] },
    },
    disabled: {
      control: "boolean",
    },
  },
};

// Template para botones
const Template = ({ label, variant, size, disabled }) => {
  const button = document.createElement("button");
  button.textContent = label;
  button.disabled = disabled;

  // Aplicar clases
  button.className = `btn btn-${variant} btn-${size}`;

  return button;
};

// Variantes de historias
export const Primary = Template.bind({});
Primary.args = {
  label: "Primary Button",
  variant: "primary",
  size: "medium",
  disabled: false,
};

export const Secondary = Template.bind({});
Secondary.args = {
  label: "Secondary Button",
  variant: "secondary",
  size: "medium",
  disabled: false,
};

export const Small = Template.bind({});
Small.args = {
  label: "Small Button",
  variant: "primary",
  size: "small",
  disabled: false,
};

export const Large = Template.bind({});
Large.args = {
  label: "Large Button",
  variant: "primary",
  size: "large",
  disabled: false,
};

export const Disabled = Template.bind({});
Disabled.args = {
  label: "Disabled Button",
  variant: "primary",
  size: "medium",
  disabled: true,
};

// Configuración para captura de imágenes (opcional)
export const parameters = {
  // Integración con Storybook Docs para generar documentación visual
  docs: {
    source: {
      type: "dynamic",
    },
  },
};
```

3. Ejecuta Storybook para probar visualmente tus componentes:

```bash
npm run storybook
```

## Pruebas de regresión visual

Para proyectos que requieren alta consistencia visual, considera implementar pruebas de regresión visual:

```bash
npm install --save-dev @storybook/test-runner jest-image-snapshot
```

Configura las pruebas en `.storybook/test-runner.js`:

```javascript
const { toMatchImageSnapshot } = require("jest-image-snapshot");

module.exports = {
  setup() {
    expect.extend({ toMatchImageSnapshot });
  },
  async postRender(page, context) {
    // Solo capturar capturas de pantalla para componentes principales
    if (context.name.includes("Button") || context.name.includes("Card")) {
      const image = await page.screenshot();
      expect(image).toMatchImageSnapshot({
        customSnapshotsDir: `./snapshots/${context.id}`,
        customDiffDir: "./snapshots-diff",
      });
    }
  },
};
```
