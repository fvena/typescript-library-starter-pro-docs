# Proceso de release

TypeScript Library Template Pro integra [Semantic-release](https://semantic-release.gitbook.io/semantic-release/) para gestionar de forma automática y consistente las versiones, changelogs y releases de tu biblioteca, basándose en los mensajes de commit que siguen la especificación de Conventional Commits.

El proceso de release se activa automáticamente cuando se hace push a la rama `main`:

### Plugins configurados

1. **commit-analyzer**: Analiza los mensajes de commit para determinar la versión.
2. **release-notes-generator**: Genera notas de release a partir de los commits.
3. **changelog**: Actualiza el archivo CHANGELOG.md.
4. **npm**: Publica el paquete en npm.
5. **git**: Realiza un commit con los cambios en package.json y CHANGELOG.md.
6. **github**: Crea una release en GitHub.

## Tipos de versiones (SemVer)

El versionado sigue el estándar semántico `MAJOR.MINOR.PATCH`, y se determina automáticamente según los tipos de cambios introducidos desde la última release.

| Tipo              | Desencadenado por                                                                                           |
| ----------------- | ----------------------------------------------------------------------------------------------------------- |
| **Patch** (0.0.x) | Commits con del tipo `fix:`                                                                                 |
| **Minor** (0.x.0) | Commits con del tipo `feat:`                                                                                |
| **Major** (x.0.0) | Commits que contienen `BREAKING CHANGE:`<br> Commits con el sufijo después del tipo `!` (e.g. `feat!: ...`) |

## Pre-releases

Las pre-releases son versiones de una biblioteca que se publican antes de su lanzamiento. Se utilizan para probar nuevas funcionalidades antes de su lanzamiento. Algunos tipos de pre-releases son:

- **alpha:** Son las primeras versiones de prueba, normalmente con funcionalidades incompletas y muchos errores. Se utilizan principalmente para pruebas internas. Formato: `1.0.0-alpha.1`, `1.0.0-alpha.2`, etc.
- **beta:** Versiones más completas que las alpha, con todas las funcionalidades implementadas pero que pueden contener errores. Se suelen compartir con usuarios externos para pruebas más amplias. Formato: `1.0.0-beta.1`, `1.0.0-beta.2`, etc.
- **rc:** Versiones candidatas a ser la versión final. Son prácticamente idénticas a la versión estable, y se utilizan para pruebas finales antes del lanzamiento oficial. Formato: `1.0.0-rc.1`, `1.0.0-rc.2`, etc.
- **canary:** Versiones que se publican frecuentemente, normalmente con cambios pequeños y frecuentes. Se utilizan para pruebas de rendimiento y estabilidad. Formato: `1.0.0-canary.1`, `1.0.0-canary.2`, etc.

### Publicar pre-releases

1. Crea una rama dedicada por cada tipo de pre-release: `alpha`, `beta`, `rc`, `canary`.
2. Configura semantic-release para que publique las pre-releases usando estas ramas.

   ```javascript{5}
   // release.config.js
   export default {
      branches: [
         'main',
         { name: 'beta', prerelease: true },
         { name: 'alpha', prerelease: true },
         { name: 'rc', prerelease: true },
         { name: 'canary', prerelease: true },
      ],
      // ...
   };
   ```

3. Configura el flujo de trabajo para que publique las pre-releases.

   ```yaml
   # .github/workflows/release.yml
   name: Release

   ...

   jobs:
      release:
         name: Release
         runs-on: ubuntu-latest
         if: ${{ github.ref == 'refs/heads/main' }} # [!code --]
         if: ${{ github.ref == 'refs/heads/main' || github.ref == 'refs/heads/beta' }} # [!code ++]
   ```

4. Publica la pre-release, solo tienes que hacer push a la rama correspondiente y se iniciará el proceso de publicación.

5. Usar la pre-release en un proyecto. Añade al nombre del paquete el sufijo de la pre-release.

   ```bash
   npm install tu-biblioteca@beta
   ```

## Entornos de desarrollo

También puedes trabajar con entornos de desarrollo para probar nuevas funcionalidades antes de su lanzamiento.

- **dev (development):** Versiones orientadas específicamente a desarrollo y pruebas internas. Similar a una versión alpha pero a veces con un enfoque más específico hacia desarrolladores. Formato: `1.0.0-dev.1`, `1.0.0-dev.2`, etc.
- **pre (prerelease):** Es un término general que engloba cualquier versión antes de la estable. Alpha, beta y RC son tipos específicos de prereleases. Formato: `1.0.0-pre.1`, `1.0.0-pre.2`, etc.
- **prod (production):** Versión estable para producción, no tienen sufijo. Formato: `1.0.0`, `1.1.0`, etc.

### Publicar entorno de desarrollo

El proceso de publicación de los entornos de `dev` y `pre` es el mismo que el de las pre-releases. El entorno de producción se publica automáticamente cuando se hace push a la rama `main`.

## Revertir una release

Si descubres un problema serio con una release recién publicada:

1. **Publica una nueva versión patch** con la corrección lo antes posible.

2. **Si es necesario, depreca la versión problemática**:

   ```bash
   npm deprecate tu-biblioteca@1.2.3 "Versión con error crítico, por favor actualiza a 1.2.4"
   ```

3. **Para casos extremos, considera despublicar**:

   ```bash
   npm unpublish tu-biblioteca@1.2.3
   ```

   ::: warning Importante
   NPM tiene restricciones sobre despublicar paquetes. Solo se puede hacer en las primeras 72 horas.
   :::

## Solución de problemas comunes

::: details No se determina ninguna nueva versión

**Problema**: Semantic-release no encuentra cambios que justifiquen una nueva versión.

**Causas posibles**:

1. No hay commits con tipos `fix:` o `feat:` desde la última release.
2. Los mensajes de commit no siguen las convenciones correctamente.

**Soluciones**:

1. Asegúrate de usar los tipos de commit correctos para los cambios que deberían desencadenar una nueva versión.
2. Verifica que los mensajes de commit siguen el formato de Conventional Commits.

:::

::: details npm ERR! 403 Forbidden

**Problema**: Error al publicar en npm.

**Causas posibles**:

1. El token de NPM no tiene permisos para publicar
2. El nombre del paquete ya está en uso.

**Soluciones**:

1. Verifica que el token tenga permisos de publicación
2. Verifica que el nombre del paquete sea único.

:::

::: details Error de autenticación en npm

**Problema**: Semantic-release no puede publicar en npm debido a errores de autenticación.

**Causas posibles**:

1. El token de npm ha expirado o no tiene permisos suficientes.
2. El token no está configurado correctamente en los secretos de GitHub.

**Soluciones**:

1. Genera un nuevo token en npm con los permisos adecuados.
2. Verifica que el token está configurado correctamente como secreto `NPM_TOKEN` en GitHub.

:::

::: details Error de autenticación en GitHub

**Problema**: Semantic-release no puede crear etiquetas o releases en GitHub.

**Causas posibles**:

1. El token de GitHub no tiene los permisos necesarios.
2. El token no está configurado correctamente.

**Soluciones**:

1. Asegúrate de que el token tiene permisos de escritura para contenidos (contents), issues y pull requests.
2. Verifica que el token está configurado correctamente como secreto `GH_TOKEN` en GitHub.

:::

::: details Conflictos con la rama

**Problema**: Semantic-release falla porque no puede hacer push a la rama.

**Causas posibles**:

1. La rama está protegida y no permite pushes directos.
2. Ha habido cambios en la rama desde que comenzó el flujo de trabajo.

**Soluciones**:

1. Configura la protección de rama para permitir pushes desde GitHub Actions, o usa un flujo de trabajo que cree un pull request en lugar de un push directo.
2. Asegúrate de que no haya cambios concurrentes durante el proceso de release.

:::
