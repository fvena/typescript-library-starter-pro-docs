# Plantillas de issues en GitHub

Las plantillas de issues son una herramienta poderosa que ayuda a estandarizar la información que los usuarios proporcionan al reportar problemas o solicitar nuevas funcionalidades. Una plantilla bien diseñada facilita la comunicación, agiliza la resolución de problemas y mejora la experiencia tanto para colaboradores como para mantenedores del proyecto.

## Configuración

El proyecto ya incluye plantillas básicas de issues, pero puedes personalizarlas según las necesidades específicas de tu biblioteca. Esta guía te mostrará cómo funcionan las plantillas, cómo configurarlas y cómo crear nuevas.

### Ubicación de las plantillas

Las plantillas de issues se almacenan en la siguiente ubicación del repositorio:

```
.github/
└── ISSUE_TEMPLATE/
    ├── bug_report.md
    ├── feature_request.md
    ├── documentation_improvement.md
    └── config.yml
```

### Archivo de configuración

El archivo `config.yml` controla el comportamiento general del formulario de creación de issues:

```yaml
blank_issues_enabled: false
contact_links:
  - name: 📝 Preguntas y Discusiones
    url: https://github.com/usuario/repo/discussions
    about: Si tienes preguntas sobre el uso de la biblioteca, por favor utiliza la sección de discusiones
  - name: 📚 Documentación
    url: https://usuario.github.io/repo/
    about: Consulta nuestra documentación para encontrar información detallada sobre el uso de la biblioteca
```

#### Opciones principales

- `blank_issues_enabled`: Determina si los usuarios pueden crear issues sin usar una plantilla.
- `contact_links`: Proporciona enlaces alternativos para casos que no deberían ser issues (preguntas, soporte, etc.).

## Plantillas incluidas

### Bug Report (Reporte de errores)

Esta plantilla está diseñada para recolectar toda la información necesaria para diagnosticar y reproducir un error.

```markdown
---
name: 🐞 Reporte de error
about: Crea un reporte para ayudarnos a mejorar
title: "[BUG] "
labels: bug
assignees: ""
---

**Describe el error**
Una descripción clara y concisa del error.

**Para reproducir**
Pasos para reproducir el comportamiento:

1. Ir a '...'
2. Llamar a la función '....' con parámetros '....'
3. Ver el error

**Comportamiento esperado**
Una descripción clara y concisa de lo que esperabas que ocurriera.

**Capturas de pantalla**
Si aplica, añade capturas de pantalla para ayudar a explicar tu problema.

**Entorno (por favor completa la siguiente información):**

- Versión de la biblioteca: [ej. 1.0.0]
- Node.js versión: [ej. 18.15.0]
- Sistema operativo: [ej. Windows 11, Ubuntu 22.04]
- Navegador (si aplica): [ej. Chrome 120]

**Contexto adicional**
Añade cualquier otro contexto sobre el problema aquí.
```

### Feature Request (Solicitud de funcionalidad)

Esta plantilla ayuda a los usuarios a proponer nuevas funcionalidades de manera estructurada.

```markdown
---
name: 💡 Solicitud de funcionalidad
about: Sugiere una idea para este proyecto
title: "[FEATURE] "
labels: enhancement
assignees: ""
---

**¿Tu solicitud de funcionalidad está relacionada con un problema? Por favor descríbelo.**
Una descripción clara y concisa del problema. Ej. Siempre me frustro cuando [...]

**Describe la solución que te gustaría**
Una descripción clara y concisa de lo que quieres que ocurra.

**Describe alternativas que has considerado**
Una descripción clara y concisa de cualquier solución o característica alternativa que hayas considerado.

**Casos de uso**
Explica cómo se utilizaría esta función y quién se beneficiaría de ella.

**Contexto adicional**
Añade cualquier otro contexto o capturas de pantalla sobre la solicitud de funcionalidad aquí.
```

### Documentation Improvement (Mejora de documentación)

Esta plantilla está específicamente enfocada en mejorar la documentación.

```markdown
---
name: 📚 Mejora de documentación
about: Sugiere mejoras o reporta problemas en la documentación
title: "[DOCS] "
labels: documentation
assignees: ""
---

**¿Dónde encontraste el problema en la documentación?**
URL o sección específica de la documentación.

**Describe el problema**
¿Qué falta, es incorrecto o podría mejorarse?

**Sugerencia de mejora**
Si tienes una idea específica sobre cómo mejorar esta parte de la documentación, descríbela aquí.

**Capturas de pantalla**
Si aplica, añade capturas de pantalla para ilustrar el problema o la mejora.

**Contexto adicional**
Cualquier información adicional que pueda ser útil.
```

## Creación de nuevas plantillas

### Formato Markdown

Las plantillas en formato Markdown son la forma tradicional de crear plantillas de issues. Para crear una nueva plantilla:

1. Crea un nuevo archivo en `.github/ISSUE_TEMPLATE/` con extensión `.md`
2. Añade un encabezado YAML al principio del archivo con la siguiente estructura:

```markdown
---
name: 🔧 Nombre de la plantilla
about: Breve descripción de cuándo usar esta plantilla
title: "[PREFIJO] "
labels: etiqueta1, etiqueta2
assignees: usuario1, usuario2
---

Contenido de la plantilla...
```

**Campos del encabezado:**

- `name`: Nombre visible de la plantilla (usa emojis para hacerlos más identificables)
- `about`: Descripción breve que aparece bajo el nombre
- `title`: Prefijo predeterminado para el título del issue
- `labels`: Etiquetas que se aplicarán automáticamente
- `assignees`: Usuarios que serán asignados automáticamente (opcional)

### Formato YAML (Forms)

GitHub también ofrece un formato más avanzado basado en YAML que permite crear formularios interactivos con validación. Este formato es recomendado para recolectar información más estructurada.

Para crear una plantilla de formulario:

1. Crea un nuevo archivo en `.github/ISSUE_TEMPLATE/` con extensión `.yml` o `.yaml`
2. Utiliza la siguiente estructura:

```yaml
name: 🔧 Nombre de la plantilla
description: Breve descripción de cuándo usar esta plantilla
title: "[PREFIJO]: "
labels: ["etiqueta1", "etiqueta2"]
assignees:
  - usuario1
body:
  - type: markdown
    attributes:
      value: |
        Gracias por tomarte el tiempo para completar este formulario.

  - type: input
    id: version
    attributes:
      label: Versión
      description: ¿Qué versión de la biblioteca estás utilizando?
      placeholder: "1.0.0"
    validations:
      required: true

  - type: textarea
    id: description
    attributes:
      label: Descripción
      description: Describe el problema o la sugerencia en detalle.
      placeholder: Explica tu problema aquí...
    validations:
      required: true

  - type: dropdown
    id: browsers
    attributes:
      label: Navegadores
      description: ¿En qué navegadores has visto el problema? (si aplica)
      multiple: true
      options:
        - Firefox
        - Chrome
        - Safari
        - Microsoft Edge
        - Opera

  - type: checkboxes
    id: terms
    attributes:
      label: Verificaciones
      description: Antes de enviar, por favor confirma lo siguiente
      options:
        - label: He verificado que no existe un issue similar ya reportado
          required: true
        - label: He incluido toda la información necesaria para reproducir el problema
          required: true
```

### Tipos de elementos disponibles en formularios YAML

Los formularios YAML soportan varios tipos de elementos:

1. **markdown**: Texto informativo que no requiere entrada del usuario.
2. **input**: Campo de texto de una sola línea.
3. **textarea**: Campo de texto multilínea, ideal para descripciones largas.
4. **dropdown**: Lista desplegable de opciones predefinidas.
5. **checkboxes**: Lista de casillas de verificación.

Para cada elemento puedes configurar:

- `label`: Etiqueta visible del campo
- `description`: Texto explicativo
- `placeholder`: Texto de ejemplo
- `validations.required`: Si el campo es obligatorio

## Plantillas de ejemplo para casos específicos

A continuación se presentan algunas plantillas adicionales que podrías querer implementar según las necesidades de tu proyecto.

### Plantilla para reportar problemas de rendimiento

```yaml
name: 🐢 Problema de rendimiento
description: Reporta un problema de rendimiento o solicita una optimización
title: "[PERFORMANCE]: "
labels: ["performance"]
body:
  - type: markdown
    attributes:
      value: |
        # Reporte de problema de rendimiento
        Gracias por ayudarnos a mejorar el rendimiento de nuestra biblioteca.

  - type: textarea
    id: description
    attributes:
      label: Descripción del problema
      description: Describe el problema de rendimiento que has observado
      placeholder: "La función X toma mucho tiempo en procesar grandes conjuntos de datos..."
    validations:
      required: true

  - type: textarea
    id: reproduction
    attributes:
      label: Código para reproducir
      description: Proporciona un ejemplo mínimo que demuestre el problema
      render: typescript
      placeholder: |
        import { yourLibrary } from 'your-library';

        // Ejemplo de código con problemas de rendimiento
        const result = yourLibrary.process(largeDataSet);
    validations:
      required: true

  - type: input
    id: benchmark
    attributes:
      label: Métricas de rendimiento
      description: Si es posible, proporciona métricas de tiempo de ejecución o memoria
      placeholder: "Tiempo de ejecución: 500ms para procesar 1000 elementos"

  - type: dropdown
    id: environment
    attributes:
      label: Entorno
      description: ¿Dónde experimentaste el problema de rendimiento?
      options:
        - Node.js
        - Navegador
        - Aplicación de servidor
        - Aplicación móvil (via framework)
        - Otro (especificar en la descripción)
    validations:
      required: true
```

### Plantilla para solicitar soporte para una nueva plataforma

```yaml
name: 🌐 Soporte para nueva plataforma
description: Solicita soporte para una nueva plataforma o entorno
title: "[PLATFORM]: "
labels: ["platform-support"]
body:
  - type: dropdown
    id: platform
    attributes:
      label: Plataforma solicitada
      description: ¿Para qué plataforma estás solicitando soporte?
      options:
        - Deno
        - Bun
        - React Native
        - Electron
        - Edge Functions
        - Cloudflare Workers
        - AWS Lambda
        - Otra (especificar en la descripción)
    validations:
      required: true

  - type: textarea
    id: use_case
    attributes:
      label: Caso de uso
      description: Describe cómo planeas utilizar la biblioteca en esta plataforma
      placeholder: "Quiero utilizar la biblioteca para..."
    validations:
      required: true

  - type: textarea
    id: current_workarounds
    attributes:
      label: Soluciones alternativas actuales
      description: ¿Cómo estás resolviendo esto actualmente sin soporte nativo?
      placeholder: "Actualmente estoy utilizando..."

  - type: checkboxes
    id: contribution
    attributes:
      label: Contribución
      options:
        - label: Estoy interesado en contribuir a la implementación de esta característica
```

## Personalización y mejores prácticas

### Campos y validaciones

Para mejorar la calidad de la información recibida:

1. **Marca campos como obligatorios** para información crítica:

   ```yaml
   validations:
     required: true
   ```

2. **Utiliza dropdowns** para opciones predefinidas:

   ```yaml
   type: dropdown
   attributes:
     options:
       - Opción 1
       - Opción 2
   ```

3. **Usa checkboxes** para verificaciones previas:

   ```yaml
   type: checkboxes
   attributes:
     options:
       - label: He buscado issues existentes
         required: true
   ```

### Mejorando la experiencia del usuario

Para hacer más amigables tus plantillas:

1. **Utiliza emojis** en los nombres para crear distinción visual.
2. **Proporciona ejemplos** en los placeholders.
3. **Escribe descripciones claras** para cada campo.
4. **Incluye instrucciones** sobre cómo completar información técnica.
5. **Añade texto introductorio** con markdown para dar contexto.

### Mantenimiento de plantillas

Con el tiempo, es importante revisar y actualizar tus plantillas:

1. **Revisa periódicamente** si están recopilando la información necesaria.
2. **Simplifica campos** que rara vez proporcionan valor.
3. **Añade nuevos campos** cuando identifiques información faltante recurrente.
4. **Actualiza opciones** de dropdowns para reflejar nuevas versiones o plataformas.

## Configuración adicional

### Etiquetas personalizadas

Para aprovechar al máximo las plantillas, configura etiquetas personalizadas en tu repositorio:

1. Ve a **Issues > Labels** en tu repositorio de GitHub.
2. Crea etiquetas específicas para categorizar issues:
   - `bug`: Para errores
   - `enhancement`: Para nuevas funcionalidades
   - `documentation`: Para mejoras en la documentación
   - `good first issue`: Para tareas adecuadas para nuevos colaboradores
   - `help wanted`: Para indicar que se busca ayuda
   - `performance`: Para problemas de rendimiento
   - `security`: Para vulnerabilidades de seguridad

Personaliza los colores para crear una distinción visual clara entre los diferentes tipos de issues.

### Integración con proyectos de GitHub

Puedes configurar la automatización para que los issues nuevos se añadan automáticamente a un tablero de proyecto:

1. Ve a **Projects** en tu repositorio o perfil de GitHub.
2. Crea un nuevo proyecto o selecciona uno existente.
3. Configura un flujo de trabajo automatizado que añada nuevos issues al proyecto.
4. Opcionalmente, configura columnas o estados diferentes según las etiquetas.

## Implementación en tu proyecto

Para implementar o actualizar plantillas de issues en tu proyecto:

1. **Crea la estructura de directorios** si no existe:

   ```bash
   mkdir -p .github/ISSUE_TEMPLATE
   ```

2. **Crea el archivo de configuración**:

   ```bash
   touch .github/ISSUE_TEMPLATE/config.yml
   ```

3. **Crea las plantillas de issues** que necesites:

   ```bash
   touch .github/ISSUE_TEMPLATE/bug_report.yml
   touch .github/ISSUE_TEMPLATE/feature_request.yml
   ```

4. **Añade el contenido** a cada archivo según los ejemplos proporcionados.

5. **Haz commit y push** de los cambios a tu repositorio:

   ```bash
   git add .github
   git commit -m "chore: añadir plantillas de issues"
   git push
   ```

6. **Verifica la implementación** creando un nuevo issue en tu repositorio para asegurarte de que las plantillas aparecen correctamente.

## Solución de problemas comunes

### Las plantillas no aparecen

- Verifica que los archivos estén en la ubicación correcta (`.github/ISSUE_TEMPLATE/`)
- Comprueba que el formato YAML sea válido (sin errores de indentación)
- Asegúrate de que el repositorio esté actualizado

### Errores en la validación de formularios

- Los formularios YAML son estrictos en su formato
- Utiliza un validador de YAML para verificar la sintaxis
- Revisa la indentación (debe ser consistente, típicamente 2 espacios)

### Conflictos entre plantillas

- Asegúrate de que cada plantilla tenga un nombre único
- Evita solapamientos en los casos de uso de diferentes plantillas

## Recursos adicionales

- [Documentación oficial de GitHub sobre plantillas de issues](https://docs.github.com/es/communities/using-templates-to-encourage-useful-issues-and-pull-requests/configuring-issue-templates-for-your-repository)
- [Sintaxis de formularios de issues](https://docs.github.com/es/communities/using-templates-to-encourage-useful-issues-and-pull-requests/syntax-for-issue-forms)
- [Buenas prácticas para mantener proyectos de código abierto](https://opensource.guide/es/best-practices/)

---

Con estas plantillas y configuraciones, tu proyecto estará bien preparado para recibir feedback estructurado y manejable, mejorando la experiencia tanto para los usuarios que reportan problemas como para los mantenedores que los resuelven.
