# Actualizar información del proyecto

Es importante personalizar la información del proyecto para reflejar los detalles específicos de tu biblioteca.

## Package.json

El archivo `package.json` contiene la información principal de tu biblioteca y se usará para su publicación en npm. Debes actualizar, al menos, los siguientes campos:

```json
{
  "name": "tu-biblioteca",
  "version": "0.1.0",
  "description": "Una descripción concisa y clara de lo que hace tu biblioteca",
  "author": "Tu Nombre <tu.email@ejemplo.com> (https://tusitio.com)",
  "license": "MIT",
  "homepage": "https://github.com/tu-usuario/tu-biblioteca#readme",
  "repository": {
    "type": "git",
    "url": "git+https://github.com/tu-usuario/tu-biblioteca.git"
  },
  "bugs": {
    "url": "https://github.com/tu-usuario/tu-biblioteca/issues"
  },
  "keywords": ["typescript", "biblioteca", "palabra-clave-relevante"]
}
```

::: warning Importante
El campo `name` debe ser único en el registro de npm y seguir las [reglas de nomenclatura de npm](https://docs.npmjs.com/cli/v8/configuring-npm/package-json#name).
:::

::: info Nota
No modifiques el campo `version` manualmente, ya que será gestionado automáticamente por semantic-release.
:::

## LICENSE

El archivo `LICENSE` contiene los términos de licencia para tu biblioteca. La plantilla viene con una licencia MIT por defecto, pero debes actualizarla con tu nombre y el año actual:

```
MIT License

Copyright (c) [Año actual] [Tu nombre]

Permission is hereby granted...
```

## Configuración de VitePress

El archivo de configuración de VitePress se encuentra en `docs/.vitepress/config.ts` y tienes que actualizarlo con la información de tu proyecto:

```typescript
import { defineConfig } from "vitepress";

export default defineConfig({
  base: "/tu-biblioteca/", // Actualiza con el nombre de tu repositorio
  title: "Nombre de tu biblioteca", // Título que aparecerá en la documentación
  description: "Descripción de tu biblioteca", // Descripción breve

  themeConfig: {
    ...

    // Actualiza los enlaces sociales
    socialLinks: [
      { icon: "github", link: "https://github.com/tu-usuario/tu-biblioteca" }
    ]
  }
});
```
