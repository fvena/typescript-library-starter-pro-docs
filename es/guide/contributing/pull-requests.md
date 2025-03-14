# Pull Requests

Las Pull Requests (PR) son fundamentales en nuestro flujo de trabajo colaborativo, ya que permiten revisar, discutir y mejorar los cambios antes de integrarlos en el proyecto principal. Esta guía explica en detalle cómo crear, gestionar y revisar Pull Requests de manera efectiva.

## Proceso de envío

### Cuándo crear una Pull Request

Debes crear una Pull Request en los siguientes casos:

1. **Implementación de nueva funcionalidad**: Cuando has completado una nueva característica.
2. **Corrección de errores**: Tras solucionar un bug reportado.
3. **Mejoras de documentación**: Para cambios significativos en la documentación.
4. **Refactorización de código**: Al realizar mejoras estructurales que no modifican la funcionalidad.
5. **Actualizaciones de dependencias**: Para actualizaciones importantes de dependencias.

Para cambios muy pequeños como correcciones tipográficas o ajustes menores, puedes considerar enviar estos directamente a la rama principal si tienes los permisos adecuados.

### Preparación antes del envío

Antes de enviar tu PR, asegúrate de:

1. **Sincronizar con la rama principal**:

   ```bash
   git fetch upstream
   git rebase upstream/main
   ```

2. **Ejecutar todas las verificaciones locales**:

   ```bash
   npm run lint     # Verificación de lint
   npm run test     # Ejecución de pruebas
   npm run build    # Compilación del proyecto
   ```

3. **Revisar tus cambios**:

   ```bash
   git diff main
   ```

4. **Comprobar la estructura de los commits**: Asegúrate de que tus commits son limpios, siguen las convenciones y pueden aplicarse de forma limpia.

### Creación de la Pull Request

Para crear tu Pull Request:

1. **Haz push de tu rama** a tu fork:

   ```bash
   git push origin nombre-de-tu-rama
   ```

2. **Navega a tu fork** en GitHub y verás un mensaje sugiriendo crear una PR desde tu rama recién enviada.

3. **Haz clic en "Compare & pull request"**.

4. **Completa la plantilla** provista con todos los detalles necesarios.

5. **Asigna revisores** si conoces a quienes deberían revisar tu código.

6. **Añade etiquetas** apropiadas para categorizar tu PR.

7. **Haz clic en "Create pull request"**.

## Plantillas de PR

Las plantillas de PR ayudan a estandarizar la información que proporcionan los contribuyentes. Nuestra plantilla por defecto incluye:

```markdown
# Pull Request

## Descripción

<!-- Descripción breve de los cambios realizados. -->

---

## Lista de verificación

### Código y funcionalidad

- [ ] ✔️ He probado la nueva funcionalidad y funciona como se esperaba.
- [ ] 🧹 He limpiado el código y eliminado comentarios o logs innecesarios.
- [ ] 🧪 He añadido pruebas para cubrir mis cambios.

### Documentación

- [ ] 📘 He actualizado el README.
- [ ] ✍️ He actualizado la documentación correspondiente.
- [ ] 📚 He actualizado los ejemplos en la documentación.
- [ ] 🌐 He actualizado el sitio web del proyecto.
```

### Personalización de la plantilla

Si necesitas personalizar la plantilla para diferentes tipos de contribuciones, puedes crear múltiples plantillas:

1. Crea un directorio `.github/PULL_REQUEST_TEMPLATE/` en tu repositorio.
2. Añade archivos markdown para cada tipo de plantilla:

   - `bugfix.md`
   - `feature.md`
   - `documentation.md`

3. Al crear una PR, especifica la plantilla en la URL:

   ```
   https://github.com/usuario/repo/compare/main...rama?template=feature.md
   ```

### Elementos de una buena descripción de PR

Una descripción de PR efectiva debe incluir:

1. **Resumen conciso**: Una explicación clara de qué cambia y por qué.
2. **Contexto**: Referencia a issues relacionados (#123) o discusiones previas.
3. **Cambios principales**: Lista de los cambios más importantes.
4. **Capturas de pantalla/GIFs**: Para cambios visuales o de UI (si aplica).
5. **Notas de implementación**: Decisiones técnicas importantes o enfoques considerados.
6. **Áreas de preocupación**: Partes donde aprecias especialmente la revisión.

Ejemplo de una buena descripción:

```markdown
## Validación mejorada de entradas de formulario

Esta PR implementa una validación más robusta para las entradas de formulario,
resolviendo el issue #45 sobre validación insuficiente de emails.

### Cambios principales

- Agrega validadores de expresiones regulares configurables
- Implementa validación en tiempo real con feedback visual
- Añade soporte para mensajes de error personalizados
- Mejora la accesibilidad de los mensajes de error

### Implementación

Opté por un enfoque basado en composición en lugar de herencia para permitir
mayor flexibilidad en la combinación de validadores. La validación se realiza
mediante una cadena de responsabilidad para mantener el código limpio y extensible.

### Capturas de pantalla

![Validación de ejemplo](https://ejemplo.com/captura.png)

### Áreas para revisar

La implementación de expresiones regulares en `src/validators/regex.ts` podría
beneficiarse de optimización adicional.
```

## Revisión de código

El proceso de revisión de código es una parte crítica del desarrollo colaborativo que mejora la calidad del código y facilita el aprendizaje entre colaboradores.

### Proceso de revisión

Después de enviar tu PR, el proceso típicamente sigue estos pasos:

1. **Verificaciones automáticas**: Se ejecutan CI/CD pipelines para verificar que tu código pasa pruebas, linting y otras verificaciones.

2. **Revisión inicial**: Un mantenedor o colaborador hará una primera revisión.

3. **Solicitud de cambios**: Es normal que se soliciten ajustes en tu primera presentación.

4. **Iteración**: Implementa los cambios solicitados, haz commit y push a la misma rama.

5. **Re-revisión**: Los revisores verificarán tus cambios actualizados.

6. **Aprobación**: Cuando los revisores estén satisfechos, aprobarán la PR.

7. **Fusión**: Un mantenedor fusionará la PR en la rama principal.

### Cómo responder al feedback

Al recibir comentarios en tu PR:

1. **Responde a todos los comentarios**: Incluso con un simple "Hecho" o "Gracias".

2. **Explica tus decisiones**: Si no estás de acuerdo con un cambio sugerido, explica tu razonamiento respetuosamente.

3. **Marca como resueltos** los comentarios que hayas abordado.

4. **Notifica cuando estés listo para otra revisión**: Comenta en la PR cuando hayas abordado todos los comentarios.

5. **Sé paciente**: Los revisores tienen sus propias responsabilidades y pueden tardar en responder.

### Para revisores: Cómo proporcionar feedback efectivo

Si estás revisando PRs, sigue estas pautas:

1. **Sé específico**: Señala exactamente qué cambiar y por qué.

2. **Sé constructivo**: Ofrece soluciones, no solo críticas.

3. **Explica el razonamiento**: No solo digas qué cambiar, sino también por qué.

4. **Prioriza los problemas**: Distingue entre bloqueantes (must-fix) y mejoras opcionales (nice-to-have).

5. **Reconoce lo positivo**: Destaca también aspectos bien implementados.

6. **Usa un tono respetuoso**: Céntrate en el código, no en la persona.

7. **Ofrece ejemplos**: Proporciona snippets de código cuando sea útil.

8. **Haz preguntas**: Si algo no está claro, pregunta en lugar de asumir.

Ejemplo de feedback efectivo:

````
### Rendimiento en `src/validator.ts`

El uso de `Array.forEach` dentro de un bucle anidado podría causar problemas de rendimiento con conjuntos de datos grandes. Considera usar `for...of` que tiene mejor rendimiento:

```typescript
// En lugar de
items.forEach(item => {
  item.properties.forEach(prop => {
    // procesamiento
  });
});

// Considera
for (const item of items) {
  for (const prop of item.properties) {
    // procesamiento
  }
}
````

Esto reduciría la sobrecarga de las funciones de callback y mejoraría el rendimiento con grandes conjuntos de datos.

````

## Gestión de conflictos

Los conflictos ocurren cuando diferentes ramas modifican la misma parte de un archivo. Aquí explicamos cómo manejarlos:

### Prevención de conflictos

Para minimizar los conflictos:

1. **Mantén tus PRs enfocadas y pequeñas**: Menos código = menos posibilidades de conflicto.

2. **Actualiza tu rama regularmente**: Sincroniza con la rama principal para incorporar otros cambios:
   ```bash
   git fetch upstream
   git rebase upstream/main
````

3. **Comunícate con otros colaboradores**: Si sabes que alguien está trabajando en un área similar, coordínate.

### Resolución de conflictos

Si encuentras conflictos:

1. **Identifica los conflictos**:

   ```bash
   git fetch upstream
   git rebase upstream/main
   ```

   Git mostrará los archivos con conflictos.

2. **Resuelve cada archivo conflictivo**:

   - Abre los archivos marcados como conflictivos.
   - Busca secciones marcadas con `<<<<<<<`, `=======`, y `>>>>>>>`.
   - Edita el archivo para resolver el conflicto, eliminando los marcadores.

3. **Marca como resuelto**:

   ```bash
   git add archivo-con-conflicto.ts
   ```

4. **Continúa el rebase**:

   ```bash
   git rebase --continue
   ```

5. **Fuerza el push si es necesario**:

   ```bash
   git push --force-with-lease origin tu-rama
   ```

> **Nota**: `--force-with-lease` es más seguro que `--force` ya que fallará si hay cambios remotos que no has incorporado.

### Ejemplo de resolución de conflicto

Supongamos que tienes este conflicto:

```
<<<<<<< HEAD (Rama actual, main)
export function validateEmail(email: string): boolean {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
}
=======
export function validateEmail(email: string): boolean {
  if (!email) return false;
  return /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,6}$/.test(email);
}
>>>>>>> feature/better-validation (Tu rama)
```

Para resolverlo, decides combinar ambos enfoques:

```typescript
export function validateEmail(email: string): boolean {
  if (!email) return false;
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
}
```

Guarda el archivo, añádelo con `git add` y continúa el rebase.

## Ciclo de vida de un PR

### Estados de un PR

Una Pull Request puede pasar por varios estados:

1. **Draft (Borrador)**: Indica que el trabajo está en progreso y no listo para revisión.
2. **Open (Abierto)**: Listo para revisión y fusión.
3. **Needs Work (Necesita trabajo)**: Cuando los revisores solicitan cambios.
4. **Approved (Aprobado)**: Cuando los revisores han aprobado los cambios.
5. **Merged (Fusionado)**: Cuando la PR ha sido integrada en la rama principal.
6. **Closed (Cerrado)**: Cuando la PR ha sido cerrada sin fusionar.

### Convertir un PR a Draft

Si necesitas más tiempo para trabajar:

1. En la página de la PR, haz clic en el menú desplegable junto a "Ready for review".
2. Selecciona "Convert to draft" para indicar que aún no está listo.

### Preparar un Draft PR para revisión

Cuando tu PR borrador está listo:

1. En la página de la PR, haz clic en "Ready for review".
2. Esto notificará a los mantenedores que tu PR está listo para ser revisado.

### Cierre de PRs

Hay varias razones para cerrar una PR sin fusionarla:

1. **Duplicada**: Otro PR ya implementa la misma funcionalidad.
2. **Obsoleta**: La funcionalidad ya no es relevante o ha sido superada.
3. **Abandonada**: El autor no ha respondido a los comentarios durante un tiempo prolongado.
4. **No alineada**: La PR no se alinea con la dirección del proyecto.

Si tu PR es cerrada, no lo tomes como algo personal. Pregunta por los motivos específicos si no están claros y considera si puedes abordarlos en una nueva PR.

## Buenas prácticas para PRs efectivas

### Tamaño y alcance

1. **Mantén las PRs pequeñas**: Idealmente menos de 500 líneas de cambios.
2. **Un propósito, una PR**: Cada PR debe abordar un solo problema o mejora.
3. **Divide cambios grandes**: Si tu cambio es extenso, divídelo en PRs más pequeñas y secuenciales.

### Commits

1. **Historia de commits limpia**: Utiliza `git rebase -i` para organizar, combinar o editar commits.
2. **Mensajes de commit significativos**: Cada mensaje debe explicar claramente qué hace el cambio.
3. **Referencia a issues**: Incluye referencias a issues (ej: `Fix #123`) cuando sea relevante.

### Título y descripción

1. **Título descriptivo**: Debe resumir claramente el propósito de la PR.
2. **Descripción completa**: Proporciona todos los detalles necesarios para entender tu cambio.
3. **Documentación de decisiones**: Explica por qué elegiste una implementación particular.

### Revisiones y comentarios

1. **Respuesta rápida**: Responde a los comentarios de forma oportuna.
2. **Apertura al feedback**: Mantente abierto a sugerencias y críticas constructivas.
3. **Agradece a los revisores**: Reconoce el tiempo y esfuerzo dedicado a revisar tu código.

## Automatización y CI/CD

Nuestro proyecto utiliza varios sistemas automatizados para mejorar el proceso de PR:

### Verificaciones automáticas

Cada PR desencadena estas verificaciones automáticas:

1. **Linting**: Verifica que el código siga las reglas de estilo.
2. **Tests**: Ejecuta la suite de pruebas para asegurar que nada se rompe.
3. **Typecheck**: Verifica los tipos de TypeScript.
4. **Build**: Asegura que el proyecto compila correctamente.

### Herramientas de colaboración

Aprovecha estas herramientas para facilitar la colaboración:

1. **Codespaces o Gitpod**: Para entornos de desarrollo consistentes.
2. **Pull Request Preview**: Para visualizar cambios en documentación o componentes visuales.
3. **Code Climate o SonarCloud**: Para análisis de calidad de código.

### Resolución de problemas con CI

Si las verificaciones de CI fallan:

1. **Lee los logs**: Examina los logs de error para identificar el problema.
2. **Reproduce localmente**: Intenta reproducir el error en tu máquina.
3. **Busca problemas conocidos**: Verifica si es un problema conocido en las issues del proyecto.
4. **Pide ayuda**: Si no puedes resolver el problema, pide ayuda en la PR.

## Conclusión

Las Pull Requests son una herramienta poderosa para la colaboración en el desarrollo de software. Siguiendo estas guías, puedes crear PRs efectivas que sean fáciles de revisar y contribuyan positivamente al proyecto.

Recuerda que el proceso de revisión de código no solo es para encontrar problemas, sino también para compartir conocimiento, aprender nuevas técnicas y mejorar como equipo.

Si tienes sugerencias para mejorar este proceso, no dudes en contribuir a esta documentación con tus propias PRs.

## Recursos adicionales

- [Guía de GitHub sobre Pull Requests](https://docs.github.com/es/pull-requests)
- [Convenciones de Conventional Commits](https://www.conventionalcommits.org/es/v1.0.0/)
- [Más información sobre rebase interactivo](https://git-scm.com/book/es/v2/Herramientas-de-Git-Reescribiendo-la-Historia)
- [Consejos para revisiones de código efectivas](https://google.github.io/eng-practices/review/)
