# Primer commit y release

## Publicar la librería

Antes de hacer nuestro primer commit y subirlo al repositorio, es importante publicar la librería en npm. Esto es necesario para evitar errores cuando se ejecuten las acciones de GitHub Actions.

El motivo es que el playground tiene como dependencia la propia librería. Si esta no está publicada previamente, fallará la instalación de las dependencias y, por tanto, las acciones de GitHub.

Además, publicar primero nos permitirá comprobar si el nombre elegido para la librería está disponible en npm y cumple con las reglas de nomenclatura del registro.

```bash
npm publish
```

::: warning Importante
Si cambias el nombre de la librería, debes actualizar no solo el `package.json` de la raíz del proyecto, sino también los siguientes archivos del directorio `playground`:

- `package.json`
- `tsconfig.json`
- `index.ts`
  :::

Inicialmente, la librería se publicará con la versión `0.0.1`. Tras el primer commit con semantic-release, la versión se incrementará automáticamente a `1.0.0` y seguirá el versionado semántico a partir de ahí.

## Primer commit

Una vez que tenemos el proyecto configurado y la librería publicada en npm, podemos realizar nuestro primer commit.

```bash
git add .
git commit -m "feat: update project information and configuration"
git push
```

::: info
Es importante que este primer commit use el tipo feat en el mensaje para que semantic-release genere correctamente la primera versión mayor (1.0.0).
:::

## Primera release

Si todo ha funcionado correctamente, al subir el primer commit se ejecutarán las acciones de GitHub configuradas. Esto generará:

- La creación de la primera release con la versión 1.0.0
- La publicación automática de la nueva versión en npm
- La documentación publicada en GitHub Pages en la url: `https://tu-usuario.github.io/tu-biblioteca` (ej: `https://fvena.github.io/consoleUI/`)

::: warning Importante
Si no has publicado previamente la librería en npm con npm publish, las acciones de GitHub fallarán debido a que no podrán instalar las dependencias del playground, y no se creará la release.
:::
