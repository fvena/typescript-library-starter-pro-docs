# Librerías de componentes

Las bibliotecas de componentes son fundamentales en el ecosistema frontend moderno, permitiendo a los desarrolladores compartir interfaces de usuario reutilizables y consistentes entre proyectos. La plantilla TypeScript Library Template Pro puede adaptarse para crear bibliotecas de componentes robustas, especialmente para Vue.js. Este documento detalla la configuración, desarrollo y distribución de bibliotecas de componentes Vue con TypeScript.

## Configuración para Vue/TypeScript

Configurar correctamente la integración entre Vue y TypeScript es el primer paso para desarrollar una biblioteca de componentes de alta calidad.

### Instalación de dependencias

Comienza instalando las dependencias necesarias:

```bash
# Vue core
npm install --save-dev vue vue-loader @vue/compiler-sfc

# TypeScript para Vue
npm install --save-dev @vue/tsconfig

# Dependencias para compilación y empaquetado
npm install --save-dev vite @vitejs/plugin-vue typescript rollup-plugin-vue
```

### Estructura de archivos recomendada

Una estructura organizada facilita el mantenimiento de la biblioteca:

```
src/
  ├── components/            # Componentes individuales
  │   ├── Button/
  │   │   ├── Button.vue     # Implementación del componente
  │   │   ├── Button.test.ts # Tests unitarios
  │   │   └── index.ts       # Punto de exportación
  │   ├── Card/
  │   │   ├── Card.vue
  │   │   ├── Card.test.ts
  │   │   └── index.ts
  │   └── index.ts           # Re-exporta todos los componentes
  ├── composables/           # Composables reutilizables
  │   ├── useForm.ts
  │   ├── useToggle.ts
  │   └── index.ts
  ├── directives/            # Directivas personalizadas
  │   ├── clickOutside.ts
  │   ├── tooltip.ts
  │   └── index.ts
  ├── styles/                # Estilos compartidos
  │   ├── variables.scss
  │   ├── mixins/
  │   └── components/
  ├── utils/                 # Utilidades
  │   ├── helpers.ts
  │   └── validators.ts
  ├── types/                 # Definiciones de tipo
  │   ├── components.ts
  │   └── common.ts
  └── index.ts               # Punto de entrada principal
```

### Configuración de TypeScript para Vue

Crea o modifica tu archivo `tsconfig.json` para soportar Vue:

```json
{
  "extends": "@vue/tsconfig/tsconfig.web.json",
  "compilerOptions": {
    "target": "ES2020",
    "module": "ESNext",
    "moduleResolution": "node",
    "jsx": "preserve",
    "sourceMap": true,
    "resolveJsonModule": true,
    "esModuleInterop": true,
    "lib": ["ESNext", "DOM"],
    "skipLibCheck": true,
    "outDir": "dist",
    "declaration": true,
    "declarationDir": "dist/types"
  },
  "include": ["src/**/*.ts", "src/**/*.d.ts", "src/**/*.tsx", "src/**/*.vue"],
  "references": [
    {
      "path": "./tsconfig.node.json"
    }
  ]
}
```

Y un archivo `tsconfig.node.json` para configuración de Node.js:

```json
{
  "extends": "@vue/tsconfig/tsconfig.node.json",
  "include": ["vite.config.ts", "vitest.config.ts"],
  "compilerOptions": {
    "composite": true,
    "module": "ESNext",
    "types": ["node"]
  }
}
```

### Declaraciones de tipos para archivos Vue

Crea un archivo `src/vue-shim.d.ts` para permitir a TypeScript entender los archivos `.vue`:

```typescript
declare module "*.vue" {
  import type { DefineComponent } from "vue";
  const component: DefineComponent<{}, {}, any>;
  export default component;
}
```

## Componentes Vue con TypeScript

### Componente Vue básico con TypeScript

A continuación se muestra un ejemplo de un componente Button tipado con TypeScript y usando la Composition API:

```vue
<!-- src/components/Button/Button.vue -->
<template>
  <button
    :class="[
      'my-button',
      `my-button--${variant}`,
      `my-button--${size}`,
      { 'my-button--disabled': disabled },
    ]"
    :disabled="disabled"
    @click="$emit('click', $event)"
  >
    <slot></slot>
  </button>
</template>

<script lang="ts">
import { defineComponent, computed, PropType } from "vue";

export type ButtonVariant = "primary" | "secondary" | "danger" | "ghost";
export type ButtonSize = "small" | "medium" | "large";

export default defineComponent({
  name: "MyButton",

  props: {
    variant: {
      type: String as PropType<ButtonVariant>,
      default: "primary",
      validator: (value: string) =>
        ["primary", "secondary", "danger", "ghost"].includes(value),
    },
    size: {
      type: String as PropType<ButtonSize>,
      default: "medium",
      validator: (value: string) =>
        ["small", "medium", "large"].includes(value),
    },
    disabled: {
      type: Boolean,
      default: false,
    },
  },

  emits: ["click"],

  setup(props) {
    // Lógica del componente usando Composition API
    const isLargeButton = computed(() => props.size === "large");

    return {
      isLargeButton,
    };
  },
});
</script>

<style scoped lang="scss">
.my-button {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  border-radius: 4px;
  font-weight: 500;
  cursor: pointer;
  transition: all 0.2s ease;
  border: 1px solid transparent;

  &--primary {
    background-color: var(--color-primary);
    color: white;

    &:hover:not(:disabled) {
      background-color: var(--color-primary-dark);
    }
  }

  &--secondary {
    background-color: transparent;
    border-color: var(--color-primary);
    color: var(--color-primary);

    &:hover:not(:disabled) {
      background-color: var(--color-primary-light);
    }
  }

  &--danger {
    background-color: var(--color-danger);
    color: white;

    &:hover:not(:disabled) {
      background-color: var(--color-danger-dark);
    }
  }

  &--ghost {
    background-color: transparent;
    color: var(--color-text);

    &:hover:not(:disabled) {
      background-color: var(--color-gray-100);
    }
  }

  &--small {
    padding: 0.25rem 0.5rem;
    font-size: 0.875rem;
  }

  &--medium {
    padding: 0.5rem 1rem;
    font-size: 1rem;
  }

  &--large {
    padding: 0.75rem 1.5rem;
    font-size: 1.125rem;
  }

  &--disabled {
    opacity: 0.6;
    cursor: not-allowed;
  }
}
</style>
```

### Usando la API <script setup>

Para componentes más concisos, puedes usar la sintaxis `<script setup>` de Vue 3:

```vue
<!-- src/components/Card/Card.vue -->
<template>
  <div class="my-card" :class="{ 'my-card--clickable': clickable }">
    <div v-if="$slots.header || title" class="my-card__header">
      <slot name="header">
        <h3 class="my-card__title">{{ title }}</h3>
      </slot>
    </div>

    <div class="my-card__body">
      <slot></slot>
    </div>

    <div v-if="$slots.footer" class="my-card__footer">
      <slot name="footer"></slot>
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed } from "vue";

// Definición de props con TypeScript
interface Props {
  title?: string;
  clickable?: boolean;
}

// Valores por defecto para props
const props = withDefaults(defineProps<Props>(), {
  title: "",
  clickable: false,
});

// Eventos tipados
const emit = defineEmits<{
  (e: "click", event: MouseEvent): void;
}>();

// Expone slots
defineSlots<{
  header(): void;
  default(): void;
  footer(): void;
}>();

// Computadas
const hasHeader = computed(() => !!props.title);
</script>

<style scoped lang="scss">
.my-card {
  border-radius: 8px;
  border: 1px solid var(--color-border);
  overflow: hidden;
  background-color: var(--color-white);
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.05);

  &--clickable {
    cursor: pointer;
    transition:
      transform 0.2s,
      box-shadow 0.2s;

    &:hover {
      transform: translateY(-2px);
      box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
    }
  }

  &__header {
    padding: 1rem;
    border-bottom: 1px solid var(--color-border);
  }

  &__title {
    margin: 0;
    font-size: 1.25rem;
    font-weight: 600;
  }

  &__body {
    padding: 1rem;
  }

  &__footer {
    padding: 1rem;
    border-top: 1px solid var(--color-border);
    background-color: var(--color-gray-50);
  }
}
</style>
```

### Definición de tipos para componentes

Para mejorar la experiencia de desarrollo y el uso de tus componentes, define interfaces específicas:

```typescript
// src/types/components.ts
export interface ButtonProps {
  variant?: "primary" | "secondary" | "danger" | "ghost";
  size?: "small" | "medium" | "large";
  disabled?: boolean;
}

export interface CardProps {
  title?: string;
  clickable?: boolean;
}

export interface FormInputProps {
  modelValue: string;
  label?: string;
  placeholder?: string;
  error?: string;
  disabled?: boolean;
  required?: boolean;
}
```

### Exportación de componentes

Exporta los componentes de manera consistente:

```typescript
// src/components/Button/index.ts
import Button from "./Button.vue";
export { Button };
export type { ButtonVariant, ButtonSize } from "./Button.vue";
export default Button;

// src/components/index.ts
export * from "./Button";
export * from "./Card";
// Más componentes...

// src/index.ts
export * from "./components";
export * from "./composables";
export * from "./directives";
export * from "./types";
```

## Empaquetado para Vue

El empaquetado adecuado permite que tu biblioteca sea fácilmente consumida por otros proyectos Vue.

### Configuración de Vite

Vite es una excelente opción para desarrollar y construir bibliotecas de componentes Vue:

```typescript
// vite.config.ts
import { defineConfig } from "vite";
import vue from "@vitejs/plugin-vue";
import { resolve } from "path";
import dts from "vite-plugin-dts";

export default defineConfig({
  plugins: [
    vue(),
    dts({
      insertTypesEntry: true,
      staticImport: true,
      skipDiagnostics: false,
    }),
  ],
  build: {
    lib: {
      entry: resolve(__dirname, "src/index.ts"),
      name: "MyVueComponents",
      fileName: (format) => `my-vue-components.${format}.js`,
      formats: ["es", "cjs", "umd"],
    },
    rollupOptions: {
      external: ["vue"],
      output: {
        globals: {
          vue: "Vue",
        },
        exports: "named",
      },
    },
    cssCodeSplit: false,
    minify: "terser",
    sourcemap: true,
  },
  resolve: {
    alias: {
      "@": resolve(__dirname, "src"),
    },
  },
});
```

### Package.json para bibliotecas Vue

Configura tu `package.json` para que otros proyectos puedan consumir tu biblioteca:

```json
{
  "name": "my-vue-components",
  "version": "0.1.0",
  "type": "module",
  "files": ["dist"],
  "main": "./dist/my-vue-components.umd.js",
  "module": "./dist/my-vue-components.es.js",
  "types": "./dist/index.d.ts",
  "exports": {
    ".": {
      "import": "./dist/my-vue-components.es.js",
      "require": "./dist/my-vue-components.umd.js",
      "types": "./dist/index.d.ts"
    },
    "./style.css": "./dist/style.css"
  },
  "peerDependencies": {
    "vue": "^3.2.0"
  },
  "scripts": {
    "dev": "vite",
    "build": "vue-tsc --noEmit && vite build",
    "test": "vitest run",
    "test:watch": "vitest",
    "test:coverage": "vitest run --coverage"
  }
}
```

## Testing para componentes Vue

El testing adecuado asegura que tus componentes funcionen como se espera en diferentes escenarios.

### Configuración de Vitest para Vue

Configura Vitest para probar componentes Vue:

```typescript
// vitest.config.ts
import { defineConfig } from "vitest/config";
import vue from "@vitejs/plugin-vue";

export default defineConfig({
  plugins: [vue()],
  test: {
    globals: true,
    environment: "jsdom",
    include: ["src/**/*.{test,spec}.{js,ts}"],
    coverage: {
      provider: "v8",
      reporter: ["text", "json", "html"],
    },
  },
});
```

### Testing de componentes

Utiliza `@vue/test-utils` para probar componentes Vue:

```bash
npm install --save-dev @vue/test-utils jsdom
```

Ejemplo de test para el componente Button:

```typescript
// src/components/Button/Button.test.ts
import { describe, it, expect } from "vitest";
import { mount } from "@vue/test-utils";
import Button from "./Button.vue";

describe("Button", () => {
  it("renders properly", () => {
    const wrapper = mount(Button, {
      props: {
        variant: "primary",
        size: "medium",
      },
      slots: {
        default: "Click me",
      },
    });

    expect(wrapper.text()).toBe("Click me");
    expect(wrapper.classes()).toContain("my-button--primary");
    expect(wrapper.classes()).toContain("my-button--medium");
  });

  it("emits click event when clicked", async () => {
    const wrapper = mount(Button);

    await wrapper.trigger("click");

    expect(wrapper.emitted()).toHaveProperty("click");
  });

  it("does not emit click event when disabled", async () => {
    const wrapper = mount(Button, {
      props: {
        disabled: true,
      },
    });

    await wrapper.trigger("click");

    expect(wrapper.emitted()).not.toHaveProperty("click");
  });

  it("applies correct classes based on props", () => {
    const wrapper = mount(Button, {
      props: {
        variant: "danger",
        size: "large",
      },
    });

    expect(wrapper.classes()).toContain("my-button--danger");
    expect(wrapper.classes()).toContain("my-button--large");
  });
});
```

### Testing de composables

También es importante probar los composables Vue:

```typescript
// src/composables/useToggle.test.ts
import { describe, it, expect } from "vitest";
import { useToggle } from "./useToggle";
import { ref } from "vue";

describe("useToggle", () => {
  it("should toggle the value", () => {
    const { value, toggle } = useToggle(false);

    expect(value.value).toBe(false);

    toggle();
    expect(value.value).toBe(true);

    toggle();
    expect(value.value).toBe(false);
  });

  it("should accept an external ref", () => {
    const externalRef = ref(true);
    const { value, toggle } = useToggle(externalRef);

    expect(value.value).toBe(true);

    toggle();
    expect(value.value).toBe(false);
    expect(externalRef.value).toBe(false);
  });
});
```

## Documentación con Storybook

Storybook es una herramienta excelente para documentar y desarrollar componentes interactivamente.

### Configuración de Storybook para Vue 3

```bash
# Instalar Storybook
npx storybook init

# Configurar específicamente para Vue 3
npm install --save-dev @storybook/vue3 @storybook/addon-essentials
```

### Historias para componentes Vue

Crea historias para tus componentes:

```typescript
// src/components/Button/Button.stories.ts
import type { Meta, StoryObj } from "@storybook/vue3";
import Button from "./Button.vue";

const meta: Meta<typeof Button> = {
  title: "Components/Button",
  component: Button,
  argTypes: {
    variant: {
      control: { type: "select" },
      options: ["primary", "secondary", "danger", "ghost"],
    },
    size: {
      control: { type: "select" },
      options: ["small", "medium", "large"],
    },
    disabled: {
      control: "boolean",
    },
    onClick: { action: "clicked" },
  },
};

export default meta;
type Story = StoryObj<typeof Button>;

export const Primary: Story = {
  args: {
    variant: "primary",
    size: "medium",
    disabled: false,
  },
  render: (args) => ({
    components: { Button },
    setup() {
      return { args };
    },
    template: '<Button v-bind="args">Primary Button</Button>',
  }),
};

export const Secondary: Story = {
  args: {
    variant: "secondary",
    size: "medium",
    disabled: false,
  },
  render: (args) => ({
    components: { Button },
    setup() {
      return { args };
    },
    template: '<Button v-bind="args">Secondary Button</Button>',
  }),
};

export const Small: Story = {
  args: {
    variant: "primary",
    size: "small",
    disabled: false,
  },
  render: (args) => ({
    components: { Button },
    setup() {
      return { args };
    },
    template: '<Button v-bind="args">Small Button</Button>',
  }),
};
```

## Uso de composables

Los composables son una parte fundamental de la Composition API de Vue, permitiendo extraer y reutilizar lógica entre componentes.

### Composable básico

```typescript
// src/composables/useToggle.ts
import { ref, Ref } from "vue";

export function useToggle(initialValue: boolean | Ref<boolean> = false) {
  const value = ref(
    initialValue instanceof Ref ? initialValue.value : initialValue,
  );

  const toggle = () => {
    if (initialValue instanceof Ref) {
      initialValue.value = !initialValue.value;
      value.value = initialValue.value;
    } else {
      value.value = !value.value;
    }
  };

  const setTrue = () => {
    if (initialValue instanceof Ref) {
      initialValue.value = true;
      value.value = true;
    } else {
      value.value = true;
    }
  };

  const setFalse = () => {
    if (initialValue instanceof Ref) {
      initialValue.value = false;
      value.value = false;
    } else {
      value.value = false;
    }
  };

  return {
    value,
    toggle,
    setTrue,
    setFalse,
  };
}
```

### Composable para formularios

```typescript
// src/composables/useForm.ts
import { reactive, computed, ref } from "vue";

export function useForm<T extends Record<string, any>>(initialValues: T) {
  const values = reactive({ ...initialValues });
  const errors = reactive<Record<string, string>>({});
  const touched = reactive<Record<string, boolean>>({});
  const isSubmitting = ref(false);

  const resetForm = () => {
    Object.keys(values).forEach((key) => {
      values[key] = initialValues[key];
    });
    Object.keys(errors).forEach((key) => {
      delete errors[key];
    });
    Object.keys(touched).forEach((key) => {
      touched[key] = false;
    });
  };

  const setFieldValue = (field: keyof T, value: any) => {
    values[field as string] = value;
  };

  const setFieldError = (field: keyof T, error: string) => {
    errors[field as string] = error;
  };

  const clearFieldError = (field: keyof T) => {
    delete errors[field as string];
  };

  const touchField = (field: keyof T) => {
    touched[field as string] = true;
  };

  const isValid = computed(() => Object.keys(errors).length === 0);

  return {
    values,
    errors,
    touched,
    isSubmitting,
    isValid,
    resetForm,
    setFieldValue,
    setFieldError,
    clearFieldError,
    touchField,
  };
}
```

## Directives personalizadas

Las directivas son otra forma de reutilizar funcionalidad en Vue.

### Ejemplo de directiva clickOutside

```typescript
// src/directives/clickOutside.ts
import type { Directive, DirectiveBinding } from "vue";

type ClickOutsideHandler = (event: MouseEvent) => void;

interface ClickOutsideElement extends HTMLElement {
  _clickOutsideHandler?: ClickOutsideHandler;
}

export const clickOutside: Directive = {
  mounted(el: ClickOutsideElement, binding: DirectiveBinding) {
    const handler: ClickOutsideHandler = (event: MouseEvent) => {
      if (el && !el.contains(event.target as Node) && binding.value) {
        binding.value(event);
      }
    };

    el._clickOutsideHandler = handler;
    document.addEventListener("click", handler);
  },

  unmounted(el: ClickOutsideElement) {
    if (el._clickOutsideHandler) {
      document.removeEventListener("click", el._clickOutsideHandler);
      delete el._clickOutsideHandler;
    }
  },
};

// Uso en componente
// <div v-click-outside="onClickOutside">Contenido</div>
```

## Plugins de Vue

Los plugins permiten añadir funcionalidades globales a tu aplicación Vue.

### Creación de un plugin para tu biblioteca

```typescript
// src/plugin.ts
import type { App, Plugin } from "vue";
import * as components from "./components";
import * as directives from "./directives";

export interface PluginOptions {
  prefix?: string;
}

export const createVueComponentsPlugin = (
  options: PluginOptions = {},
): Plugin => {
  return {
    install(app: App) {
      // Registrar componentes
      Object.entries(components).forEach(([componentName, component]) => {
        if (componentName !== "default") {
          const name = options.prefix
            ? `${options.prefix}${componentName}`
            : componentName;
          app.component(name, component);
        }
      });

      // Registrar directivas
      Object.entries(directives).forEach(([directiveName, directive]) => {
        if (directiveName !== "default") {
          const name = directiveName.replace(/([A-Z])/g, "-$1").toLowerCase();
          app.directive(name, directive);
        }
      });
    },
  };
};

// Ejemplo de uso en la aplicación cliente:
// import { createApp } from 'vue';
// import { createVueComponentsPlugin } from 'my-vue-components';
// import App from './App.vue';
//
// const app = createApp(App);
// app.use(createVueComponentsPlugin({ prefix: 'My' }));
// app.mount('#app');
```

## Manejo de estilos

El manejo de estilos es crucial para bibliotecas de componentes.

### CSS Scoped vs. CSS Modules

Vue ofrece dos enfoques principales para el encapsulamiento de estilos:

1. **CSS Scoped**: Añade atributos de datos únicos a elementos HTML y selector de CSS correspondientes.

   ```vue
   <style scoped>
   .button {
     /* Los estilos solo afectan a este componente */
   }
   </style>
   ```

2. **CSS Modules**: Genera nombres de clase únicos para cada componente.

   ```vue
   <style module>
   .button {
     /* Se accede como $style.button */
   }
   </style>
   ```

   ```html
   <button :class="$style.button">Click me</button>
   ```

Para bibliotecas, el enfoque de `scoped` suele ser más conveniente, ya que es más intuitivo y no requiere cambios en la forma de usar los componentes.

### Variables CSS personalizables

Permite que los usuarios personalicen tus componentes con variables CSS:

```vue
<style>
:root {
  --my-btn-primary-color: #0d6efd;
  --my-btn-secondary-color: #6c757d;
  --my-btn-danger-color: #dc3545;
  --my-btn-border-radius: 4px;
  --my-btn-transition: all 0.2s ease;
}
</style>

<style scoped>
.my-button {
  border-radius: var(--my-btn-border-radius);
  transition: var(--my-btn-transition);

  &--primary {
    background-color: var(--my-btn-primary-color);
  }

  &--secondary {
    background-color: var(--my-btn-secondary-color);
  }

  &--danger {
    background-color: var(--my-btn-danger-color);
  }
}
</style>
```

### Integración con sistemas de diseño

Para bibliotecas basadas en sistemas de diseño, puedes proporcionar una integración con tokens de diseño:

```typescript
// src/theme/index.ts
import type { App } from "vue";

export interface ThemeOptions {
  colors?: Record<string, string>;
  spacing?: Record<string, string>;
  typography?: Record<string, string>;
}

export function createTheme(options: ThemeOptions = {}) {
  const createCSSVariables = () => {
    const variables: Record<string, string> = {};

    // Procesar colores
    if (options.colors) {
      Object.entries(options.colors).forEach(([key, value]) => {
        variables[`--my-color-${key}`] = value;
      });
    }

    // Procesar espaciado
    if (options.spacing) {
      Object.entries(options.spacing).forEach(([key, value]) => {
        variables[`--my-spacing-${key}`] = value;
      });
    }

    // Procesar tipografía
    if (options.typography) {
      Object.entries(options.typography).forEach(([key, value]) => {
        variables[`--my-typography-${key}`] = value;
      });
    }

    return variables;
  };

  const applyTheme = (selector = ":root") => {
    const variables = createCSSVariables();
    const styleEl = document.createElement("style");

    let css = `${selector} {\n`;
    Object.entries(variables).forEach(([name, value]) => {
      css += `  ${name}: ${value};\n`;
    });
    css += "}";

    styleEl.textContent = css;
    document.head.appendChild(styleEl);

    return () => {
      document.head.removeChild(styleEl);
    };
  };

  const install = (app: App) => {
    applyTheme();

    // Proporcionar el tema a la aplicación
    app.provide("theme", options);
  };

  return {
    install,
    applyTheme,
    createCSSVariables,
  };
}
```

## Ejemplos completos

### Componente avanzado: Dropdown

Un ejemplo completo de un componente Dropdown con TypeScript y Vue:

```vue
<!-- src/components/Dropdown/Dropdown.vue -->
<template>
  <div
    class="my-dropdown"
    :class="{ 'my-dropdown--open': isOpen }"
    v-click-outside="close"
  >
    <button
      class="my-dropdown__trigger"
      :aria-expanded="isOpen.toString()"
      aria-haspopup="true"
      @click="toggle"
    >
      <slot name="trigger">{{ label }}</slot>
      <span
        class="my-dropdown__icon"
        :class="{ 'my-dropdown__icon--open': isOpen }"
      >
        ▼
      </span>
    </button>

    <transition name="dropdown">
      <div v-if="isOpen" class="my-dropdown__menu" role="menu">
        <slot></slot>
      </div>
    </transition>
  </div>
</template>

<script setup lang="ts">
import { ref, watch } from "vue";
import { clickOutside } from "../../directives/clickOutside";

interface Props {
  label: string;
  modelValue?: boolean;
}

const props = withDefaults(defineProps<Props>(), {
  label: "Select an option",
  modelValue: false,
});

const emit = defineEmits<{
  (e: "update:modelValue", value: boolean): void;
  (e: "open"): void;
  (e: "close"): void;
}>();

const isOpen = ref(props.modelValue);

watch(
  () => props.modelValue,
  (newValue) => {
    isOpen.value = newValue;
  },
);

watch(isOpen, (newValue) => {
  emit("update:modelValue", newValue);
  if (newValue) {
    emit("open");
  } else {
    emit("close");
  }
});

const toggle = () => {
  isOpen.value = !isOpen.value;
};

const close = () => {
  isOpen.value = false;
};
</script>

<style scoped lang="scss">
.my-dropdown {
  position: relative;
  display: inline-block;

  &__trigger {
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding: 0.5rem 1rem;
    background-color: var(--color-white, white);
    border: 1px solid var(--color-gray-300, #dee2e6);
    border-radius: 4px;
    cursor: pointer;
    min-width: 150px;
    font-size: 1rem;
  }

  &__icon {
    margin-left: 8px;
    transition: transform 0.2s ease;
    font-size: 0.75rem;

    &--open {
      transform: rotate(180deg);
    }
  }

  &__menu {
    position: absolute;
    top: calc(100% + 4px);
    left: 0;
    min-width: 100%;
    background-color: var(--color-white, white);
    border: 1px solid var(--color-gray-300, #dee2e6);
    border-radius: 4px;
    box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
    z-index: 1000;
    padding: 0.5rem 0;
  }
}

.dropdown-enter-active,
.dropdown-leave-active {
  transition:
    opacity 0.2s,
    transform 0.2s;
}

.dropdown-enter-from,
.dropdown-leave-to {
  opacity: 0;
  transform: translateY(-8px);
}
</style>
```

### Componente de elemento de lista desplegable

```vue
<!-- src/components/Dropdown/DropdownItem.vue -->
<template>
  <div
    class="my-dropdown-item"
    :class="{
      'my-dropdown-item--active': active,
      'my-dropdown-item--disabled': disabled,
    }"
    role="menuitem"
    :tabindex="disabled ? -1 : 0"
    @click="!disabled && $emit('click', $event)"
    @keydown.enter="!disabled && $emit('click', $event)"
    @keydown.space="!disabled && $emit('click', $event)"
  >
    <slot></slot>
  </div>
</template>

<script setup lang="ts">
defineProps<{
  active?: boolean;
  disabled?: boolean;
}>();

defineEmits<{
  (e: "click", event: MouseEvent | KeyboardEvent): void;
}>();
</script>

<style scoped lang="scss">
.my-dropdown-item {
  padding: 0.5rem 1rem;
  cursor: pointer;

  &:hover:not(&--disabled) {
    background-color: var(--color-gray-100, #f8f9fa);
  }

  &--active {
    background-color: var(--color-primary-50, #e8f4ff);
    color: var(--color-primary, #0d6efd);
  }

  &--disabled {
    opacity: 0.5;
    cursor: not-allowed;
  }
}
</style>
```

### Sistema de formulario completo

A continuación se muestra un ejemplo más complejo de un sistema de formulario con validación:

```vue
<!-- src/components/Form/FormInput.vue -->
<template>
  <div class="my-form-input" :class="{ 'my-form-input--error': !!error }">
    <label v-if="label" class="my-form-input__label">
      {{ label }}
      <span v-if="required" class="my-form-input__required">*</span>
    </label>

    <div class="my-form-input__wrapper">
      <input
        class="my-form-input__field"
        :value="modelValue"
        :type="type"
        :placeholder="placeholder"
        :disabled="disabled"
        :required="required"
        @input="onInput"
        @blur="$emit('blur', $event)"
        @focus="$emit('focus', $event)"
      />
    </div>

    <div v-if="error" class="my-form-input__error">
      {{ error }}
    </div>

    <div v-if="$slots.helper" class="my-form-input__helper">
      <slot name="helper"></slot>
    </div>
  </div>
</template>

<script setup lang="ts">
withDefaults(
  defineProps<{
    modelValue: string;
    label?: string;
    type?: string;
    placeholder?: string;
    error?: string;
    disabled?: boolean;
    required?: boolean;
  }>(),
  {
    type: "text",
    placeholder: "",
    disabled: false,
    required: false,
  },
);

const emit = defineEmits<{
  (e: "update:modelValue", value: string): void;
  (e: "blur", event: FocusEvent): void;
  (e: "focus", event: FocusEvent): void;
}>();

const onInput = (event: Event) => {
  const target = event.target as HTMLInputElement;
  emit("update:modelValue", target.value);
};
</script>

<style scoped lang="scss">
.my-form-input {
  margin-bottom: 1rem;

  &__label {
    display: block;
    margin-bottom: 0.5rem;
    font-weight: 500;
  }

  &__required {
    color: var(--color-danger, #dc3545);
    margin-left: 2px;
  }

  &__field {
    width: 100%;
    padding: 0.5rem 0.75rem;
    font-size: 1rem;
    line-height: 1.5;
    border: 1px solid var(--color-gray-300, #dee2e6);
    border-radius: 4px;
    transition:
      border-color 0.15s ease-in-out,
      box-shadow 0.15s ease-in-out;

    &:focus {
      outline: none;
      border-color: var(--color-primary, #0d6efd);
      box-shadow: 0 0 0 0.25rem rgba(13, 110, 253, 0.25);
    }

    &:disabled {
      background-color: var(--color-gray-100, #f8f9fa);
      opacity: 0.7;
    }
  }

  &__error {
    margin-top: 0.25rem;
    font-size: 0.875rem;
    color: var(--color-danger, #dc3545);
  }

  &__helper {
    margin-top: 0.25rem;
    font-size: 0.875rem;
    color: var(--color-gray-600, #6c757d);
  }

  &--error &__field {
    border-color: var(--color-danger, #dc3545);

    &:focus {
      box-shadow: 0 0 0 0.25rem rgba(220, 53, 69, 0.25);
    }
  }
}
</style>
```

### Uso de composables con componentes

Ejemplo de un componente de Tabs que utiliza un composable para gestionar el estado:

```typescript
// src/composables/useTabs.ts
import { ref, computed } from "vue";

export function useTabs(initialTab = 0) {
  const activeTab = ref(initialTab);
  const tabs = ref<string[]>([]);

  const registerTab = (title: string) => {
    tabs.value.push(title);
    return tabs.value.length - 1;
  };

  const setActiveTab = (index: number) => {
    activeTab.value = index;
  };

  const isTabActive = (index: number) => {
    return activeTab.value === index;
  };

  const activeTabTitle = computed(() => tabs.value[activeTab.value] || "");

  return {
    activeTab,
    tabs,
    registerTab,
    setActiveTab,
    isTabActive,
    activeTabTitle,
  };
}
```

```vue
<!-- src/components/Tabs/Tabs.vue -->
<template>
  <div class="my-tabs">
    <div class="my-tabs__header">
      <button
        v-for="(title, index) in tabs"
        :key="index"
        class="my-tabs__tab"
        :class="{ 'my-tabs__tab--active': isTabActive(index) }"
        @click="setActiveTab(index)"
      >
        {{ title }}
      </button>
    </div>

    <div class="my-tabs__content">
      <slot></slot>
    </div>
  </div>
</template>

<script setup lang="ts">
import { provide } from "vue";
import { useTabs } from "../../composables/useTabs";

const props = defineProps<{
  initialTab?: number;
}>();

const { tabs, registerTab, setActiveTab, isTabActive, activeTab } = useTabs(
  props.initialTab || 0,
);

// Proporcionar valores para los componentes TabPanel
provide("tabs", {
  registerTab,
  activeTab,
});
</script>

<style scoped lang="scss">
.my-tabs {
  &__header {
    display: flex;
    border-bottom: 1px solid var(--color-gray-300, #dee2e6);
  }

  &__tab {
    padding: 0.75rem 1rem;
    border: none;
    background: none;
    font-weight: 500;
    cursor: pointer;
    position: relative;
    color: var(--color-gray-700, #495057);

    &--active {
      color: var(--color-primary, #0d6efd);

      &::after {
        content: "";
        position: absolute;
        bottom: -1px;
        left: 0;
        right: 0;
        height: 2px;
        background-color: var(--color-primary, #0d6efd);
      }
    }

    &:hover:not(&--active) {
      color: var(--color-primary-dark, #0b5ed7);
    }
  }

  &__content {
    padding: 1rem 0;
  }
}
</style>
```

```vue
<!-- src/components/Tabs/TabPanel.vue -->
<template>
  <div v-if="isActive" class="my-tab-panel">
    <slot></slot>
  </div>
</template>

<script setup lang="ts">
import { inject, computed, onMounted } from "vue";

const props = defineProps<{
  title: string;
}>();

// Inyectar el contexto de Tabs
const tabs = inject("tabs") as {
  registerTab: (title: string) => number;
  activeTab: { value: number };
};

// Registrar esta pestaña
const index = onMounted(() => tabs.registerTab(props.title));

// Determinar si este panel debe mostrarse
const isActive = computed(() => tabs.activeTab.value === index);
</script>

<style scoped>
.my-tab-panel {
  animation: fadeIn 0.2s ease-in-out;
}

@keyframes fadeIn {
  from {
    opacity: 0;
  }
  to {
    opacity: 1;
  }
}
</style>
```

## Integración en proyectos

### Uso en proyectos Vue

Para usar tu biblioteca en proyectos Vue:

```javascript
// main.js en proyecto Vue
import { createApp } from "vue";
import App from "./App.vue";
import { createVueComponentsPlugin } from "my-vue-components";

// Registrar todos los componentes con un prefijo
const app = createApp(App);
app.use(createVueComponentsPlugin({ prefix: "My" }));
app.mount("#app");

// O usar componentes específicos
import { Button, Card } from "my-vue-components";

app.component("MyButton", Button);
app.component("MyCard", Card);
```

### Importación de estilos

Asegúrate de que los usuarios importen los estilos de tu biblioteca:

```javascript
// Importar todos los estilos
import 'my-vue-components/dist/style.css';

// O en un archivo SCSS para personalización
@import 'my-vue-components/scss';
```

### Personalización de temas

Proporciona formas para que los usuarios personalicen el tema:

```javascript
import { createApp } from "vue";
import App from "./App.vue";
import { createVueComponentsPlugin, createTheme } from "my-vue-components";

// Crear un tema personalizado
const theme = createTheme({
  colors: {
    primary: "#4F46E5",
    secondary: "#9CA3AF",
    danger: "#DC2626",
    success: "#10B981",
  },
  spacing: {
    sm: "0.5rem",
    md: "1rem",
    lg: "1.5rem",
  },
});

const app = createApp(App);
app.use(createVueComponentsPlugin());
app.use(theme);
app.mount("#app");
```

## Publicación y versionado

### Publicación en npm

Configura correctamente la estructura de archivos para npm:

```json
{
  "name": "my-vue-components",
  "version": "0.1.0",
  "files": ["dist", "scss"],
  "exports": {
    ".": {
      "import": "./dist/my-vue-components.mjs",
      "require": "./dist/my-vue-components.umd.js"
    },
    "./scss": "./scss/index.scss",
    "./style.css": "./dist/style.css"
  },
  "publishConfig": {
    "access": "public"
  }
}
```

### Versionado semántico

Utiliza el versionado semántico para tu biblioteca:

1. **Versiones patch (1.0.0 → 1.0.1)**: Correcciones de errores.
2. **Versiones minor (1.0.0 → 1.1.0)**: Nuevas características compatibles con versiones anteriores.
3. **Versiones major (1.0.0 → 2.0.0)**: Cambios que rompen compatibilidad.

## Métodos para la documentación

Además de Storybook, considera estas opciones para documentar tu biblioteca de componentes:

### VuePress

VuePress es una excelente opción para crear documentación detallada para tu biblioteca:

```bash
npm install --save-dev vuepress@next
```

Configuración en `docs/.vuepress/config.js`:

```javascript
module.exports = {
  title: "My Vue Components",
  description: "A Vue 3 component library with TypeScript",
  themeConfig: {
    sidebar: [
      {
        title: "Introduction",
        path: "/",
      },
      {
        title: "Components",
        children: [
          "/components/button",
          "/components/card",
          "/components/dropdown",
          "/components/tabs",
        ],
      },
      {
        title: "Composables",
        children: [
          "/composables/use-toggle",
          "/composables/use-form",
          "/composables/use-tabs",
        ],
      },
    ],
  },
};
```

### VitePress

VitePress es otra opción moderna para documentación, especialmente bien integrada con Vite:

```bash
npm install --save-dev vitepress
```

## Pasos finales y mejores prácticas

Para completar tu biblioteca de componentes Vue, considera estos últimos consejos:

### 1. Accessibilidad

Asegúrate de que tus componentes sean accesibles:

- Usa atributos ARIA apropiados
- Garantiza un buen contraste de color
- Soporta navegación por teclado
- Prueba con lectores de pantalla

### 2. Internacionalización

Diseña tus componentes para ser compatibles con diferentes idiomas:

```vue
<template>
  <button class="my-button">
    {{ t("button.submit", "Submit") }}
  </button>
</template>

<script setup>
import { inject } from "vue";

// Opcional: inyectar una función de traducción si está disponible
const t = inject("t", (key, fallback) => fallback);
</script>
```

### 3. Rendimiento

Optimiza tus componentes para un rendimiento óptimo:

- Usa `v-once` para contenido estático
- Considera lazy loading para componentes grandes
- Evita watchers innecesarios
- Implementa memoización con `computed`

### 4. Pruebas completas

Asegúrate de tener una cobertura de pruebas adecuada:

- Pruebas unitarias para cada componente
- Pruebas de integración para componentes relacionados
- Pruebas de snapshot para UI
- Pruebas de accesibilidad

## Conclusión

Crear una biblioteca de componentes Vue con TypeScript utilizando la plantilla TypeScript Library Template Pro ofrece una base sólida para desarrollar componentes reutilizables, consistentes y bien documentados. Al seguir las prácticas recomendadas en este documento, puedes crear una biblioteca que:

- Proporcione una excelente experiencia de desarrollo con tipado completo
- Sea fácil de usar e integrar en proyectos Vue
- Mantenga consistencia visual y funcional
- Sea flexible y personalizable para diferentes necesidades
- Esté bien documentada y sea fácil de aprender

El desarrollo de componentes Vue con TypeScript combina lo mejor de ambos mundos: la reactividad y facilidad de uso de Vue con la seguridad de tipos y las herramientas de desarrollo de TypeScript.

## Siguientes pasos

Una vez que hayas configurado tu biblioteca de componentes, considera explorar técnicas avanzadas de desarrollo asistido por IA. Consulta [Definición y diseño](/ai-assisted/design.md) para aprender cómo la IA puede ayudarte a mejorar y acelerar el proceso de desarrollo de tu biblioteca.">
