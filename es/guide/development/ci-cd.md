# CI/CD (GitHub Actions)

TypeScript Library Template Pro utiliza GitHub Actions para automatizar pruebas, publicación y despliegue de tu biblioteca.

## Flujos de trabajo incluidos

- **CI/CD**: Ejecuta pruebas, linting y compilación para verificar la calidad del código.
- **Release**: Publica nuevas versiones de la biblioteca en npm y en GitHub.
- **Deploy**: Despliega la documentación en GitHub Pages después de una release exitosa.

```
/
├── .github/
│   └── workflows/
│       ├── ci-cd.yml
│       ├── release.yml
│       └── deploy.yml
└── src/
```

## Diagrama de flujo

Los flujos de trabajo están configurados para ejecutarse de forma secuencial y dependiendo del resultado.

- **CI/CD**: Se ejecuta cuando se hace push a cualquier rama o se cree una PR.
- **Release**: Se ejecuta después del workflow `CI/CD` y solo si está en la rama `main`.
- **Deploy**: Se ejecuta después de que se haya creado una nueva release.

```
                ┌───────────────────┐
                │   Desarrollador   │
                │     hace push     │
                └─────────┬─────────┘
                          │             merge a main
                          ├────────────────────────────┐
                          │                            │
                          ▼                            │
┌───────────────────────────────────────────────────┐  │
│                  CI/CD workflow                   │  │
│                                                   │  │
│    ┌───────────┐  ┌───────────┐  ┌───────────┐    │  │
│    │   lint    │  │   test    │  │   build   │    │  │
│    └─────┬─────┘  └─────┬─────┘  └─────┬─────┘    │  │
│          └──────────────┼──────────────┘          │  │
│                         │                         │  │
│                         │ ¿Éxito?                 │  │
│                         │                         │  │
│               No        │   Sí                    │  │
│            ┌────────────┴──────┐                  │  │
│            ▼                   │                  │  │
│  ┌────────────────────┐        │                  │  │
│  │  Notificar error   │        │ ¿Destino?        │  │
│  │  al desarrollador  │        │                  │  │
│  └────────────────────┘        │                  │  │
│                          main  │   PR             │  │
│                        ┌───────┴──────┐           │  │
│                        │              ▼           │  │
│                        │     ┌─────────────────┐  │  │
│                        │     │  Aprobar la PR  │  │  │
│                        │     └────────┬────────┘  │  │
│                        │              │           │  │
└───────────────────────────────────────────────────┘  │
                         │              │              │
                         │              └──────────────┘
                         │
                         ▼
┌───────────────────────────────────────────────────┐
│                 RELEASE workflow                  │
│                                                   │
│             ┌──────────────────────┐              │
│             │   Analiza commits    │              │
│             └──────────┬───────────┘              │
│                        ▼                          │
│             ┌──────────────────────┐              │
│             │  Determina versión   │              │
│             └──────────┬───────────┘              │
│                        │                          │
│                        │ ¿Nueva versión?          │
│                        │                          │
│               No       │        Sí                │
│            ┌───────────┴────────────┐             │
│            ▼                        ▼             │
│ ┌─────────────────────┐   ┌─────────────────────┐ │
│ │   Fin del proceso   │   │ Actualiza changelog │ │
│ └─────────────────────┘   └──────────┬──────────┘ │
│                                      ▼            │
│                           ┌─────────────────────┐ │
│                           │    Publica en npm   │ │
│                           └──────────┬──────────┘ │
│                                      ▼            │
│                           ┌─────────────────────┐ │
│                           │ Crea GitHub Release │ │
│                           └──────────┬──────────┘ │
│                        ┌─────────────┘            │
│                        │                          │
└───────────────────────────────────────────────────┘
                         │
                         ▼
┌───────────────────────────────────────────────────┐
│                 DEPLOY workflow                   │
│                                                   │
│           ┌──────────────────────────┐            │
│           │  Compila documentación   │            │
│           └────────────┬─────────────┘            │
│                        ▼                          │
│           ┌──────────────────────────┐            │
│           │ Despliega a GitHub Pages │            │
│           └──────────────────────────┘            │
└───────────────────────────────────────────────────┘
```

## Monitoreo de acciones

GitHub proporciona varias herramientas para monitorear el estado y el rendimiento de tus flujos de trabajo:

### Visualización en GitHub

1. **Pestaña Actions**: Accede a `https://github.com/tu-usuario/tu-repo/actions` para ver todas las ejecuciones de los flujos de trabajo.

2. **Insignias de estado**: Añade insignias de estado a tu README.md para mostrar el estado actual de tus flujos de trabajo:

```markdown
![CI/CD](https://github.com/tu-usuario/tu-repo/workflows/CI%2FCD/badge.svg)
![Release](https://github.com/tu-usuario/tu-repo/workflows/Release/badge.svg)
```

3. **Notificaciones**: Configura notificaciones en GitHub para recibir alertas sobre el estado de las ejecuciones de los flujos de trabajo.

## Personalización

Aunque los flujos de trabajo incluidos cubren la mayoría de los casos de uso, puedes personalizarlos según tus necesidades específicas.

### Modificación del flujo CI/CD

::: details Añadir verificación de cobertura de código

```yaml
test:
  name: Test
  runs-on: ubuntu-22.04

  steps:
    # ... pasos existentes ...
    - run: npm run test:coverage
    - name: Upload coverage to Codecov
      uses: codecov/codecov-action@v3
      with:
        token: ${{ secrets.CODECOV_TOKEN }} # opcional
        directory: ./coverage/
```

:::

::: details Probar en múltiples versiones de Node.js

```yaml
test:
  name: Test
  runs-on: ubuntu-22.04
  strategy:
    matrix:
      node-version: [16.x, 18.x, 20.x]

  steps:
    - uses: actions/checkout@v4
    - uses: actions/setup-node@v4
      with:
        node-version: ${{ matrix.node-version }}
    # ... resto de pasos ...
```

:::

::: details Añadir análisis de seguridad

```yaml
security:
  name: Security Analysis
  runs-on: ubuntu-22.04

  steps:
    - uses: actions/checkout@v4
    - uses: actions/setup-node@v4
      with:
        node-version: "lts/*"
    - run: npm ci --ignore-scripts
    - name: Run npm audit
      run: npm audit --audit-level=high
    - name: Run Snyk to check for vulnerabilities
      uses: snyk/actions/node@master
      env:
        SNYK_TOKEN: ${{ secrets.SNYK_TOKEN }}
```

:::

### Modificación del flujo de release

::: details Añadir notificaciones

```yaml
release:
  # ... configuración existente ...
  steps:
    # ... pasos existentes ...
    - name: Notify on success
      if: success()
      uses: rtCamp/action-slack-notify@v2
      env:
        SLACK_WEBHOOK: ${{ secrets.SLACK_WEBHOOK }}
        SLACK_TITLE: "Nueva versión publicada"
        SLACK_MESSAGE: "La versión ${{ env.RELEASE_VERSION }} ha sido publicada correctamente."
```

:::

::: details Configurar publicación en múltiples registros

```yaml
release:
  # ... configuración existente ...
  steps:
    # ... pasos existentes ...
    - name: Setup .npmrc for GitHub Packages
      run: |
        echo "//npm.pkg.github.com/:_authToken=${{ secrets.GITHUB_TOKEN }}" > .npmrc
        echo "@yourusername:registry=https://npm.pkg.github.com" >> .npmrc
    - name: Publish to GitHub Packages
      run: npm publish
```

:::

### Modificación del flujo de deploy

::: details Personalizar el proceso de documentación

```yaml
buildDocs:
  # ... configuración existente ...
  steps:
    # ... pasos existentes ...
    - name: Generate API documentation
      run: npx typedoc src/index.ts --out docs/.vitepress/public/api
    - run: npm run docs:build
    # ... resto de pasos ...
```

:::

::: details Añadir verificación de enlaces

```yaml
buildDocs:
  # ... configuración existente ...
  steps:
    # ... pasos existentes ...
    - run: npm run docs:build
    - name: Check for broken links
      run: npx broken-link-checker --recursive --ordered docs/.vitepress/dist
    # ... resto de pasos ...
```

:::

### Casos de uso avanzados

::: details Despliegue condicional

Si quieres desplegar solo en ciertas condiciones, puedes modificar el flujo de deploy:

```yaml
buildDocs:
  if: ${{ github.event.workflow_run.conclusion == 'success' && github.ref == 'refs/heads/main' }}
  # ... resto de la configuración ...
```

:::

::: details Flujos de trabajo programados

Para ejecutar flujos de trabajo en horarios específicos, añade un disparador `schedule`:

```yaml
on:
  push:
    branches:
      - main
  schedule:
    - cron: "0 0 * * 0" # Cada domingo a medianoche
```

:::

::: details Matriz de pruebas

Para probar en múltiples entornos, utiliza matrices:

```yaml
test:
  runs-on: ${{ matrix.os }}
  strategy:
    matrix:
      os: [ubuntu-latest, windows-latest, macos-latest]
      node-version: [16.x, 18.x, 20.x]

  steps:
    - uses: actions/checkout@v4
    - uses: actions/setup-node@v4
      with:
        node-version: ${{ matrix.node-version }}
    # ... resto de pasos ...
```

:::

## Solución de problemas comunes

::: details Fallos en la ejecución

**Problema**: Los flujos de trabajo fallan con errores como "Process completed with exit code 1".

**Soluciones**:

1. Revisa los logs detallados haciendo clic en el job fallido.
2. Verifica que las dependencias se instalan correctamente.
3. Asegúrate de que los scripts en `package.json` devuelven códigos de salida adecuados.

:::

::: details Problemas con los tokens

**Problema**: Errores relacionados con permisos o autenticación cuando se utilizan tokens.

**Soluciones**:

1. Verifica que los secrets estén correctamente configurados en la configuración del repositorio.
2. Asegúrate de que los tokens tienen los permisos necesarios.
3. Comprueba que los tokens no han expirado.

:::
