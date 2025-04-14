# Guía de contribución

¡Gracias por tu interés en contribuir a este proyecto! Esta guía te ayudará a entender el proceso de contribución y te proporcionará las pautas necesarias para que tu aportación sea efectiva y valiosa.

## Filosofía del proyecto

Este proyecto se ha creado para facilitar el desarrollo de bibliotecas TypeScript profesionales, proporcionando una estructura base sólida, herramientas modernas y flujos de trabajo optimizados. Nos regimos por los siguientes principios:

1. **Simplicidad**: Buscamos soluciones simples pero completas, evitando la complejidad innecesaria.
2. **Calidad**: Mantenemos altos estándares de código, pruebas exhaustivas y documentación clara.
3. **Modularidad**: Diseñamos cada parte para que sea independiente pero bien integrada con el resto.
4. **Accesibilidad**: Facilitamos el uso tanto para principiantes como para desarrolladores experimentados.
5. **Comunidad**: Valoramos y fomentamos la colaboración y el intercambio de ideas.

## Proceso de contribución paso a paso

### 1. Preparación inicial

Antes de empezar a contribuir, asegúrate de:

1. **Revisar los issues existentes**: Comprueba si alguien ya ha reportado el mismo problema o está trabajando en la misma mejora.
2. **Discutir cambios mayores**: Para contribuciones significativas, abre primero un issue para discutir tu propuesta.
3. **Configurar tu entorno**: Asegúrate de tener Node.js (versión LTS o superior) y git instalados.

### 2. Configuración del repositorio

Para empezar a trabajar en el proyecto:

1. **Haz un fork** del repositorio a tu cuenta de GitHub.
2. **Clona** tu fork localmente:

   ```bash
   git clone https://github.com/tu-usuario/typescript-library-template-pro.git
   cd typescript-library-template-pro
   ```

3. **Añade el repositorio original como remoto**:

   ```bash
   git remote add upstream https://github.com/fvena/typescript-library-template-pro.git
   ```

4. **Instala las dependencias**:

   ```bash
   npm install
   ```

### 3. Creación de una rama para tus cambios

Siempre crea una nueva rama para tus contribuciones:

```bash
git checkout -b tipo/descripcion-breve
```

Donde `tipo` puede ser:

- `feature`: Para nuevas características
- `fix`: Para correcciones de errores
- `docs`: Para cambios en la documentación
- `refactor`: Para refactorizaciones que no añaden funcionalidades ni corrigen errores
- `test`: Para añadir o modificar pruebas
- `chore`: Para tareas de mantenimiento

Por ejemplo:

```bash
git checkout -b feature/soporte-react
```

### 4. Desarrollo de tu contribución

Durante el desarrollo, ten en cuenta estas recomendaciones:

1. **Sigue las convenciones de código**: Usa el estilo y las prácticas del proyecto.
2. **Escribe pruebas**: Añade pruebas para las nuevas funcionalidades o correcciones.
3. **Haz commits frecuentes**: Realiza commits pequeños y específicos.
4. **Usa mensajes de commit descriptivos**: Sigue el formato de [Conventional Commits](https://www.conventionalcommits.org/):

   ```
   tipo(alcance): descripción corta

   Cuerpo del mensaje con más detalles (opcional)
   ```

5. **Mantén tu rama actualizada**: Regularmente sincroniza tu rama con los últimos cambios del repositorio principal:

   ```bash
   git fetch upstream
   git rebase upstream/main
   ```

### 5. Verificación de tu contribución

Antes de enviar tu Pull Request, asegúrate de que todo esté correcto:

1. **Ejecuta las pruebas**:

   ```bash
   npm test
   ```

2. **Verifica el linting**:

   ```bash
   npm run lint
   ```

3. **Comprueba los tipos**:

   ```bash
   npm run typecheck
   ```

4. **Asegúrate de que la compilación funciona**:

   ```bash
   npm run build
   ```

5. **Revisa la documentación** si has añadido o modificado características.

### 6. Envío de tu Pull Request

Cuando estés listo para enviar tus cambios:

1. **Haz push de tu rama** a tu fork:

   ```bash
   git push origin tu-rama
   ```

2. **Crea un Pull Request** desde tu rama a la rama `main` del repositorio original.

3. **Completa la plantilla de PR** con toda la información necesaria.

4. **Responde a los comentarios** durante la revisión de código y realiza los cambios solicitados si es necesario.

### 7. Después de la fusión

Una vez que tu PR sea fusionado:

1. **Actualiza tu fork** con los últimos cambios:

   ```bash
   git checkout main
   git pull upstream main
   git push origin main
   ```

2. **Elimina tu rama** local y remota:

   ```bash
   git branch -d tu-rama
   git push origin --delete tu-rama
   ```

## Estándares de código

### Estilo de código

Seguimos un conjunto específico de reglas de estilo para mantener la coherencia en todo el proyecto:

1. **Indentación**: Usamos 2 espacios para la indentación.
2. **Longitud máxima de línea**: 100 caracteres.
3. **Comillas**: Preferimos comillas simples ('') para strings.
4. **Punto y coma**: Son obligatorios al final de cada declaración.
5. **Espaciado**: Un espacio después de las palabras clave y antes de los paréntesis en las estructuras de control.

La configuración de ESLint y Prettier en el proyecto ayuda a mantener estos estándares automáticamente.

### Nomenclatura

Seguimos estas convenciones de nomenclatura:

1. **Variables y funciones**: camelCase

   ```typescript
   const userId = 123;
   function getUserData() {
     /* ... */
   }
   ```

2. **Clases e interfaces**: PascalCase

   ```typescript
   class UserRepository {
     /* ... */
   }
   interface ApiResponse {
     /* ... */
   }
   ```

3. **Constantes**: UPPER_SNAKE_CASE

   ```typescript
   const MAX_RETRY_COUNT = 3;
   ```

4. **Tipos genéricos**: Prefijo T

   ```typescript
   function identity<T>(value: T): T {
     return value;
   }
   ```

5. **Archivos**: kebab-case para nombre de archivos

   ```
   string-utils.ts
   api-client.ts
   ```

### Documentación y comentarios

Documentamos nuestro código siguiendo estas pautas:

1. **Documentación de API**: Usamos JSDoc para documentar interfaces públicas.

   ````typescript
   /**
    * Formatea una fecha según el patrón especificado.
    *
    * @param date - La fecha a formatear
    * @param format - El formato deseado (por defecto: 'YYYY-MM-DD')
    * @returns La fecha formateada como string
    *
    * @example
    * ```ts
    * formatDate(new Date(2023, 0, 1), 'DD/MM/YYYY')
    * // Resultado: '01/01/2023'
    * ```
    */
   function formatDate(date: Date, format = "YYYY-MM-DD"): string {
     /* ... */
   }
   ````

2. **Comentarios de implementación**: Para código complejo, añadimos comentarios que explican el "por qué" y no solo el "qué".

   ```typescript
   // Usamos una expresión regular aquí en lugar de 'split'
   // porque necesitamos preservar los delimitadores
   const matches = text.match(/([a-z]+)/gi);
   ```

3. **TODOs**: Para mejoras futuras o trabajo pendiente, usamos comentarios `TODO` con una referencia a un issue cuando es posible.

   ```typescript
   // TODO: Mejorar el rendimiento de esta función (#123)
   function expensiveOperation() {
     /* ... */
   }
   ```

## Buenas prácticas

### Código

1. **Inmutabilidad**: Preferimos estructuras de datos inmutables y funciones puras.

   ```typescript
   // Bien
   const newArray = originalArray.map((item) => transformItem(item));

   // Evitar
   originalArray.forEach((item, index) => {
     originalArray[index] = transformItem(item);
   });
   ```

2. **Manejo de errores**: Usa excepciones para errores excepcionales y resultados/opcionales para casos esperados.

   ```typescript
   // Para errores excepcionales
   function readConfigFile(path: string): Config {
     if (!fileExists(path)) {
       throw new Error(`Config file not found: ${path}`);
     }
     // ...
   }

   // Para casos esperados
   function findUser(id: string): User | null {
     return users.find((user) => user.id === id) || null;
   }
   ```

3. **Evita any**: Usa tipos específicos o `unknown` si el tipo no está claro.

   ```typescript
   // Evitar
   function process(data: any): any {
     // ...
   }

   // Preferir
   function process<T>(data: T): Result<T> {
     // ...
   }
   ```

### Testing

1. **Unidades de prueba aisladas**: Cada unidad de prueba debe ser independiente.
2. **Nombrado descriptivo**: Los nombres de las pruebas deben describir el comportamiento esperado.

   ```typescript
   // Bien
   test("debería retornar null cuando el usuario no existe", () => {
     // ...
   });

   // Evitar
   test("findUser caso 2", () => {
     // ...
   });
   ```

3. **Estructura AAA**: Arrange-Act-Assert para organizar cada caso de prueba.

   ```typescript
   test("debería filtrar usuarios inactivos", () => {
     // Arrange
     const users = [
       { id: 1, active: true },
       { id: 2, active: false },
       { id: 3, active: true },
     ];

     // Act
     const activeUsers = filterActiveUsers(users);

     // Assert
     expect(activeUsers).toHaveLength(2);
     expect(activeUsers[0].id).toBe(1);
     expect(activeUsers[1].id).toBe(3);
   });
   ```

### Optimización

1. **Optimiza para legibilidad primero**: El código claro es más importante que pequeñas optimizaciones.
2. **Mide antes de optimizar**: Usa herramientas de profiling para identificar cuellos de botella reales.
3. **Evita optimizaciones prematuras**: No añadas complejidad por optimizaciones sin evidencia de necesidad.

## Recursos útiles

Para ayudarte a contribuir efectivamente, aquí tienes algunos recursos útiles:

### Documentación oficial

- [TypeScript Handbook](https://www.typescriptlang.org/docs/handbook/intro.html)
- [ESLint Documentation](https://eslint.org/docs/user-guide/)
- [Vitest Documentation](https://vitest.dev/guide/)
- [VitePress Documentation](https://vitepress.dev/)

### Artículos y guías

- [Conventional Commits](https://www.conventionalcommits.org/)
- [Semantic Versioning](https://semver.org/)
- [Effective TypeScript: 62 Specific Ways to Improve Your TypeScript](https://effectivetypescript.com/)

### Herramientas recomendadas

- **Editor**: VS Code con las extensiones:
  - ESLint
  - Prettier
  - TypeScript Hero
  - GitLens
- **Automatización**: Husky y lint-staged (ya configurados en el proyecto)
- **Depuración**: Node.js Debugging en VS Code

## Comunicación

### Canales

- **Issues de GitHub**: Para reportar bugs, proponer mejoras o discutir cambios.
- **Discusiones de GitHub**: Para preguntas, ideas o conversaciones más generales.
- **Pull Requests**: Para enviar contribuciones de código.

### Etiqueta

1. **Sé respetuoso**: Trata a todos con respeto y considera diferentes perspectivas.
2. **Sé constructivo**: Proporciona feedback útil y contextualizado.
3. **Sé paciente**: No todos pueden responder inmediatamente.
4. **Sé conciso**: Mantén tus comunicaciones claras y al punto.

## Reconocimiento de contribuciones

Valoramos todas las contribuciones, grandes o pequeñas. Los contribuyentes son reconocidos de las siguientes maneras:

1. **Lista de colaboradores** en el archivo README.md.
2. **Mención en los changelogs** cuando se publican nuevas versiones.
3. **Autoría en commits** preservada en el historial del proyecto.

## Manejo de problemas

### Reportando bugs

Cuando reportes un bug, por favor incluye:

1. **Descripción del problema**: ¿Qué ocurrió? ¿Qué esperabas que ocurriera?
2. **Pasos para reproducir**: Instrucciones detalladas para reproducir el problema.
3. **Entorno**: Versión de Node.js, sistema operativo, y cualquier otra información relevante.
4. **Evidencia**: Capturas de pantalla, logs o trazas de error si están disponibles.

### Solicitando funcionalidades

Para solicitar nuevas funcionalidades:

1. **Describe la necesidad**: ¿Qué problema resolvería esta funcionalidad?
2. **Propón una solución**: Si tienes ideas específicas sobre cómo implementarla.
3. **Proporciona contexto**: ¿Cómo se relaciona con la funcionalidad existente?
4. **Ejemplos de uso**: Casos de uso o snippets de código de ejemplo.

## Licencia y atribución

Al contribuir a este proyecto:

1. Aceptas que tus contribuciones serán licenciadas bajo la misma licencia MIT que cubre el proyecto.
2. Confirmas que tienes los derechos necesarios sobre tu contribución y puedes licenciarla bajo estos términos.
3. Entiendes que tu contribución estará disponible públicamente y podrá ser utilizada por otros según los términos de la licencia.

---

¡Gracias por leer esta guía y por tu interés en contribuir a TypeScript Library Template Pro! Tu ayuda es fundamental para hacer este proyecto mejor para todos. Si tienes preguntas o necesitas clarificación sobre cualquier punto, no dudes en abrir un issue o contactar con el equipo de mantenimiento.
