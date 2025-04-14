# Flujo de trabajo (trunk-based)

La plantilla TypeScript Library Template Pro utiliza un desarrollo basado en trunk (trunk-based), que prioriza la integración frecuente en la rama principal `main`.

## Principios clave

- La rama `main` siempre está lista para publicación
- Los cambios se integran frecuentemente
- Todo lo que se integra en `main` debe pasar por los tests y la build
- La calidad se mantiene mediante pruebas automatizadas
- Las versiones se generan automáticamente basándose en los mensajes de commit

## Proceso de desarrollo

### Para cambios pequeños

1. Trabaja directamente en la rama `main`
2. Realiza commits siguiendo las [convenciones de commit](/es/guide/development/commit-conventions.md)
3. Cuando hagas push, un hook pre-push ejecutará los tests, probará la build y el tamaño de la librería. Si todo está bien, se subirán los cambios al repositorio.
4. Las GitHub Actions ejecutarán las pruebas y, si los cambios lo requieren, publicarán una nueva versión.

### Para cambios más grandes

1. Crea una rama de corta duración:

   ```bash
   git checkout -b feature/nombre-descriptivo
   ```

2. Realiza commits frecuentes usando las convenciones establecidas:

   ```bash
   git commit -m "feat: implementar validación de entrada"
   ```

3. Mantén tu rama actualizada con `main`:

   ```bash
   git fetch origin
   git rebase origin/main
   ```

4. Crea un Pull Request cuando la funcionalidad esté lista

5. Una vez aprobado, intégralo a `main` usando uno de estos métodos:

   - Rebase y merge (historial lineal):

     ```bash
     git checkout feature/mi-caracteristica
     git rebase main
     git checkout main
     git merge --ff-only feature/mi-caracteristica
     ```

   - Squash y merge (para múltiples commits pequeños)
   - Merge commit (si necesitas preservar el historial completo)

## Actualizaciones continuas vs. liberaciones programadas

El desarrollo trunk-based puede adaptarse a diferentes cadencias de liberación:

- **Liberación continua** (predeterminada en la plantilla): Cada cambio en `main` puede potencialmente generar una nueva versión.
- **Liberación programada**: Se fusionan cambios continuamente a `main`, pero se controla cuándo se ejecuta el proceso de liberación.

Para implementar liberaciones programadas, puedes modificar el archivo `.github/workflows/release.yml` para que se active manualmente o según un cronograma.

## Buenas prácticas

### Para desarrolladores individuales

1. **Commits pequeños y frecuentes**: Incluso trabajando solo, mantén commits pequeños y bien documentados.
2. **Usa ramas para experimentar**: Crea ramas para probar ideas, fusiónalas o descártalas según sea necesario.

### Para equipos pequeños

1. **Revisión de código**: Incluso en equipos pequeños, la revisión de código es invaluable.
2. **Integración frecuente**: Rebase tus ramas con `main` al menos una vez al día.
3. **Test robustos**: Mantén una buena cobertura de test para detectar problemas temprano.

### Evitar problemas comunes

1. **Evita ramas de larga duración**: Si una rama vive más de una semana, considera dividirla en tareas más pequeñas.
2. **No acumules commits sin publicar**: Fusiona a `main` tan pronto como tengas un incremento funcional.
3. **Mantén los tests rápidos**: Si los tests tardan demasiado, los desarrolladores tenderán a saltarse pasos.
4. **Mantén el historial limpio**: Usa rebase y merge cuando fusiones una rama o PR a `main` para mantener el historial lineal y limpio.

## Escenarios comunes

::: details Desarrollo de una nueva característica grande
Para características que requieren mucho desarrollo:

1. Divide la característica en incrementos más pequeños que puedan funcionar independientemente.
2. Desarrolla y fusiona cada incremento por separado.
3. Usa feature toggles si es necesario para ocultar funcionalidad incompleta en producción.

:::

::: details Corrección de errores urgentes

Para hotfixes:

1. Si es simple, haz el cambio directamente en `main`.
2. Si requiere más trabajo o pruebas, crea una rama `fix/descripcion`.
3. Prioriza la revisión y fusión de estos cambios.

:::

::: details Experimentación

Para ideas experimentales:

1. Crea una rama `experimental/nombre-idea`.
2. No te preocupes por los mensajes de commit aquí; experimenta libremente.
3. Si la idea funciona, refactoriza y reorganiza en commits bien estructurados antes de proponer la fusión.
4. Si la idea no funciona, simplemente descarta la rama.

:::
