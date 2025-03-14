# Documentación

TypeScript Library Template Pro utiliza [VitePress](https://vitepress.dev/) para crear documentación técnica eficiente y atractiva.

## VitePress: Generador de documentación

VitePress permite crear documentación utilizando archivos Markdown, ofreciendo:

- Alto rendimiento
- Simplicidad de uso
- Markdown mejorado con extensiones
- Soporte para componentes Vue
- Generación de sitios estáticos

## Configuración básica

La configuración principal se encuentra en `docs/.vitepress/config.ts`:

```typescript
import { defineConfig } from "vitepress";

export default defineConfig({
  base: "/tu-biblioteca/", // Actualiza con el nombre de tu repositorio
  title: "Nombre de tu biblioteca",
  description: "Descripción de tu biblioteca",

  themeConfig: {
    ...
  }
});
```

::: warning Importante
Actualiza el valor de `base` con el nombre de tu repositorio para que GitHub Pages funcione correctamente.

:::

## Comandos principales

| Comando                | Descripción                              |
| ---------------------- | ---------------------------------------- |
| `npm run docs:dev`     | Inicia servidor de desarrollo local      |
| `npm run docs:build`   | Compila la documentación para producción |
| `npm run docs:preview` | Previsualiza la documentación compilada  |

## Más información

Para obtener información detallada sobre cómo crear contenido avanzado, personalizar el tema, incorporar componentes interactivos y desplegar tu documentación, consulta la [referencia sobre documentación](/referencia/documentacion-avanzada.md).
