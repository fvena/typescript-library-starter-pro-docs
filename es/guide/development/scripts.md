# Scripts

## Desarrollo y compilación

| Script  | Descripción                                                                                                           |
| ------- | --------------------------------------------------------------------------------------------------------------------- |
| `dev`   | Inicia `tsup` en modo observador para desarrollo. Compila automáticamente cuando se detectan cambios en los archivos. |
| `build` | Compila la biblioteca para producción utilizando `tsup`.                                                              |

Por defecto, genera:

- Módulos ESM y CommonJS
- Definiciones de tipos TypeScript
- Archivos optimizados para producción

## Calidad de código

| Script          | Descripción                                                                           |
| --------------- | ------------------------------------------------------------------------------------- |
| `format`        | Formatea todo el código del proyecto utilizando Prettier.                             |
| `typecheck`     | Verifica los tipos con TypeScript sin generar archivos de salida.                     |
| `lint`          | Ejecuta ESLint para verificar problemas de estilo y potenciales errores en el código. |
| `check-exports` | Verifica la precisión de tipos para paquetes publicados.                              |

## Pruebas

| Script          | Descripción                                                                                                     |
| --------------- | --------------------------------------------------------------------------------------------------------------- |
| `test`          | Ejecuta las pruebas una sola vez en modo no interactivo utilizando Vitest.                                      |
| `test:watch`    | Ejecuta las pruebas en modo observador, reejecutándolas cuando cambian los archivos.                            |
| `test:ui`       | Ejecuta las pruebas con la interfaz de usuario de Vitest, proporcionando visualización y filtrado interactivos. |
| `test:coverage` | Ejecuta las pruebas y genera informes de cobertura de código.                                                   |

## Documentación

| Script         | Descripción                                                                          |
| -------------- | ------------------------------------------------------------------------------------ |
| `docs:dev`     | Inicia un servidor local para la documentación de VitePress con recarga en caliente. |
| `docs:build`   | Compila la documentación para producción.                                            |
| `docs:preview` | Previsualiza la documentación compilada localmente.                                  |

## Publicación

| Script             | Descripción                                                                            |
| ------------------ | -------------------------------------------------------------------------------------- |
| `semantic-release` | Publica una nueva versión, actualiza el changelog y sube las etiquetas al repositorio. |

## Hooks de Git

| Script    | Descripción                                                                             |
| --------- | --------------------------------------------------------------------------------------- |
| `prepare` | Se ejecuta automáticamente después de `npm install` para configurar los hooks de husky. |
