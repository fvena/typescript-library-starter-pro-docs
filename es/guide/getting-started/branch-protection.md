# Protección de ramas

La protección de ramas te permite establecer reglas para controlar cómo y cuándo se pueden modificar las ramas en tu repositorio.

## Reglas para la rama main

La rama `main` es la columna vertebral de tu proyecto. Al seguir un flujo de trabajo trunk-based, todos los cambios que se fusionan en esta rama eventualmente se publican como una nueva versión de tu biblioteca, por lo que es esencial protegerla adecuadamente:

1. Ve a tu repositorio en GitHub.
2. Haz clic en la pestaña **Settings**.
3. En el menú lateral, selecciona **Branches**.
4. Haz clic en **Add ruleset**.
5. En **Ruleset name**, ingresa `Protect main branch`.
6. En **Enforcement status**, selecciona `Active`.
7. En **Target branches**, añade `default` para aplicar la regla a la rama `main`.

## Configuraciones recomendadas

### Configuración típica para un proyecto individual

Si eres el único desarrollador del proyecto, puedes optar por una configuración más ligera:

- Requerir status checks (`lint`, `test`, `build`).
- Bloquear push forzado y eliminación de la rama.
- No requerir revisiones de código (o configurarte a ti mismo como revisor).

### Configuración para un pequeño equipo

Para un equipo de 2-5 desarrolladores:

- Requerir 1 revisión para cada Pull Request.
- Requerir status checks (`lint`, `test`, `build`).
- Requerir que las ramas estén actualizadas antes de la fusión.
- Bloquear push forzado y eliminación de la rama.
- Requerir historial lineal para facilitar el seguimiento de cambios.

### Configuración para proyectos críticos

Para bibliotecas de producción de alta importancia:

- Requerir 2 o más revisiones para cada Pull Request.
- Requerir todos los status checks, incluyendo cobertura y análisis de seguridad.
- Requerir commits firmados para verificar la identidad de los contribuyentes.
- Restringir quién puede descartar revisiones.
- Implementar reglas adicionales para ramas de release si se utiliza un flujo gitflow.

## Configuración de reglas

La plantilla TypeScript Library Template Pro recomienda las siguientes reglas de protección:

#### Restricciones generales

- **Restrict deletions** : Evita que la rama sea eliminada.
- **Require linear history**: Garantiza que el historial de la rama sea lineal, lo que facilita el seguimiento de los cambios.
- **Require signed commits**: Asegura que todos los commits estén firmados, añadiendo una capa adicional de seguridad.
- **Block force push** (Bloquear push forzado): Evita que se sobrescriba el historial de la rama.

#### Pull Requests y revisiones

- **Require a pull request before merging**: Asegura que todos los cambios se revisen antes de fusionarse.
  - Desmarca `Merge` de la lista de métodos de fusión permitidos para favorecer un historial lineal.
  - Opcionalmente, puedes establecer **Required approvals** a un número específico (como 1 o 2) para garantizar que los cambios sean revisados por otros miembros del equipo.
- **Dismiss stale pull request approvals when new commits are pushed**: Evita que se puedan fusionar las Pull Requests que ya han sido aprobadas si se añaden nuevos commits.

#### Verificaciones de estado

- **Require status checks to pass**: Asegura que todos los flujos de trabajo de CI pasen antes de permitir la fusión.
  - Marca **Require branches to be up to date before merging** para evitar conflictos.
  - Añade los trabajos `lint`, `test` y `build` a la lista de **status checks** y selecciona `GitHub Actions` como fuente.
  - Si no aparecen en la lista, es posible que necesites ejecutar el flujo de trabajo de CI al menos una vez para que GitHub los reconozca.

Dependiendo de las necesidades de tu proyecto, puedes considerar añadir verificaciones adicionales:

- **Cobertura de código**: Para mantener un porcentaje mínimo de cobertura de pruebas.
- **Análisis de seguridad**: Para detectar vulnerabilidades en el código o dependencias.
- **Verificación de tamaño del bundle**: Para controlar el tamaño de tu biblioteca.

## Solución de problemas comunes

::: details Los status checks no aparecen en la lista

- **Causa**: Los flujos de trabajo de GitHub Actions aún no se han ejecutado en el repositorio.
- **Solución**: Realiza un push a cualquier rama para activar los flujos de trabajo, luego vuelve a configurar la protección.
  :::

::: details Los contribuyentes no pueden fusionar sus propios Pull Requests

- **Causa**: La configuración de revisiones puede estar bloqueando la autoaprobación.
- **Solución**: Configura cuidadosamente las reglas de "Required reviewers" (Revisores requeridos) para equilibrar la seguridad con la practicidad.
  :::

::: details Los status checks fallan constantemente

- **Causa**: Puede haber problemas en la configuración de CI o en los propios tests.
- **Solución**: Revisa los logs de error en GitHub Actions, ajusta la configuración o los tests según sea necesario.
  :::
