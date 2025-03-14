# Convenciones de commits

TypeScript Library Template Pro utiliza [Conventional Commits](https://www.conventionalcommits.org/) para estandarizar los mensajes de commit, facilitar la colaboración y automatizar el versionado semántico.

## Estructura básica

```
<tipo>[ámbito opcional]: <descripción>

[cuerpo opcional]

[notas de ruptura opcionales]

[notas de pie opcionales]
```

### Estructura detallada

1. **Tipo**: Indica la naturaleza del cambio. Los tipos más comunes incluyen:

   - `feat`: Nuevas características o funcionalidades
   - `fix`: Correcciones de errores
   - `docs`: Cambios en la documentación
   - `style`: Cambios que no afectan al significado del código (espacios en blanco, formato, etc.)
   - `refactor`: Cambios en el código que no corrigen errores ni añaden funcionalidades
   - `test`: Añadir o corregir pruebas
   - `chore`: Cambios en el proceso de construcción, herramientas auxiliares, etc.

2. **Ámbito (opcional)**: Especifica la parte del código afectada:

   ```
   feat(auth): añadir autenticación con Google
   fix(parser): corregir manejo de arrays vacíos
   ```

   Define ámbitos específicos para tu biblioteca para mantener la consistencia:

   ```
   api: Cambios en la API pública
   core: Cambios en la funcionalidad central
   utils: Cambios en utilitarios
   types: Cambios en definiciones de tipos
   config: Cambios en configuración
   ```

3. **Descripción**: Un resumen conciso del cambio, escrito en imperativo presente.

4. **Cuerpo (opcional)**: Descripción más detallada que explica la motivación detrás del cambio y contrasta con el comportamiento anterior.

5. **Notas de ruptura (opcional)**: Cambios que rompen la compatibilidad hacia atrás, precedidos por `BREAKING CHANGE:`.

6. **Notas de pie (opcional)**: Referencias a issues, PRs u otra información relevante.

### Ejemplo completo

```
feat(auth): implementar login con OAuth2

Añadir soporte para autenticación OAuth2 con múltiples proveedores.
- Soporte para Google, GitHub y Facebook
- Actualización automática de tokens
- Persistencia de sesión encriptada

BREAKING CHANGE: La función login() ahora devuelve una promesa en lugar de un valor síncrono.

Closes #123
```

## Ejemplos de uso

### Característica nueva

```
feat: añadir función de validación de email
```

### Corrección con ámbito

```
fix(parser): corregir manejo de arrays vacíos
```

### Cambio con ruptura (breaking change)

```
feat(auth): reemplazar sistema de autenticación

BREAKING CHANGE: La API de autenticación ha cambiado completamente.
Los métodos login() y logout() ahora aceptan diferentes parámetros.
```

## Validación automática

El proyecto incluye:

1. **commitlint**: Verifica que los mensajes de commit sigan las convenciones.
2. **Husky**: Ejecuta commitlint automáticamente en cada commit.

Esto garantiza que todos los commits sigan el formato correcto.

## Integración con semantic-release

La plantilla utiliza semantic-release para determinar automáticamente la versión según los mensajes de commit:

- `fix`: incremento de versión patch (1.0.0 → 1.0.1)
- `feat`: incremento de versión minor (1.0.0 → 1.1.0)
- `feat` o `fix` con `BREAKING CHANGE`: incremento de versión major (1.0.0 → 2.0.0)

Esto automatiza completamente:

- Incremento de versión
- Generación de changelog
- Publicación en npm
- Creación de etiquetas de versión en GitHub

## Buenas prácticas

### Tips para escribir buenos mensajes de commit

1. **Sé específico**: Describe claramente qué cambios se han realizado.
2. **Usa el imperativo**: Escribe como si estuvieras dando una orden ("añadir función" en lugar de "añadida función").
3. **Primera línea concisa**: Mantén la primera línea por debajo de 72 caracteres.
4. **Explica el "por qué"**: En el cuerpo del mensaje, explica por qué se realizó el cambio, no solo qué cambió.
5. **Referencia issues**: Incluye referencias a issues o tickets relacionados.

### Commits atómicos

Intenta que cada commit represente un cambio lógico y completo:

1. **Un tema por commit**: Cada commit debe abordar un solo tema o cambio.
2. **Commits pequeños y frecuentes**: Es mejor hacer varios commits pequeños que uno grande.
3. **Funcionalidad completa**: Cada commit debe dejar el código en un estado funcional.

### Trabajando en equipo

1. **Consistencia**: Asegúrate de que todos los miembros del equipo entiendan y sigan las convenciones.
2. **Revisión de commits**: Revisa los mensajes de commit durante las code reviews.
3. **Documentación**: Incluye las convenciones de commits en la documentación del proyecto.

## Herramientas útiles (opcional)

Si prefieres una interfaz interactiva para crear commits:

```bash
# Instalar Commitizen globalmente
npm install -g commitizen

# Luego puedes usar
git cz
```

También existen extensiones para VS Code como [Conventional Commits](https://marketplace.visualstudio.com/items?itemName=vivaxy.vscode-conventional-commits).

## Solución de problemas comunes

::: details El commit es rechazado

**Problema**: El hook de husky rechaza tu commit con un error de commitlint.

**Solución**: Verifica que el mensaje siga el formato adecuado:

1. Asegúrate de usar uno de los tipos permitidos.
2. Verifica la estructura general (tipo, descripción, etc.).
3. Si necesitas bypass el hook temporalmente (no recomendado):

   ```bash
   git commit -m "mensaje" --no-verify
   ```

:::

::: details Errores con semantic-release

**Problema**: semantic-release no determina correctamente la versión.

**Solución**:

1. Asegúrate de que los mensajes de commit sigan estrictamente las convenciones.
2. Verifica la configuración de branches en `release.config.js`.
3. Comprueba los logs de CI/CD para determinar qué está fallando.

:::
