# Vibe Coding

## Reglas de codificación (cursor rules)

La plantilla viene con unas reglas de codificación (cursor rules) ya configuradas, específicamente diseñadas para el desarrollo de librerías TypeScript. Estas reglas ayudan a mantener un código consistente, bien estructurado y de alta calidad. Se encuentran en la carpeta `./cursor/rules` y están divididas en los siguientes archivos:

- `code-quality.mdc` - Define estándares de calidad para TypeScript, incluyendo convenciones de nomenclatura, patrones de diseño recomendados, y prácticas para evitar código vulnerable o propenso a errores.
- `documentation.mdc` - Establece pautas para la documentación del código, incluyendo el formato JSDoc para funciones, clases e interfaces, así como recomendaciones para README y documentación de API.
- `functional-programming.mdc` - Contiene directrices para aplicar principios de programación funcional en TypeScript, como inmutabilidad, composición de funciones y el manejo adecuado de efectos secundarios.
- `general-development.mdc` - Abarca buenas prácticas generales de desarrollo que son aplicables independientemente del paradigma o lenguaje específico, como convenciones de commits y gestión de dependencias.
- `module-design.mdc` - Proporciona pautas para diseñar módulos cohesivos con interfaces claras, manejo adecuado de importaciones/exportaciones y estrategias para módulos intercambiables.
- `testing.mdc` - Define enfoques para pruebas unitarias, de integración y end-to-end, incluyendo cobertura de código, mocking y estructura de tests.

Cursor IDE reconoce automáticamente estas reglas y las aplicará mientras desarrollas, ofreciendo sugerencias y mejoras alineadas con estos estándares.

## Documentación de desarrollo

Para facilitar que los agentes de IA (como Cursor, Claude o GitHub Copilot) comprendan eficazmente tu proyecto, es crucial proporcionarles contexto detallado sobre su estructura, propósito y características técnicas. Esta documentación no sólo ayuda a los agentes, sino que también es valiosa para nuevos colaboradores humanos que se integren al proyecto.

La plantilla incluye una carpeta dedicada `./documentation` con varios documentos clave:

- `implementation-plan-document.md` - Este documento detalla la estrategia paso a paso para implementar la librería. Incluye fases de desarrollo, hitos clave, dependencias entre componentes y la secuencia lógica para construir las diferentes partes de la librería.
- `library-flow-document.md` - Define los flujos de trabajo y el comportamiento en tiempo de ejecución de la librería. Incluye diagramas o descripciones del ciclo de vida de los componentes, flujos de datos, y patrones de interacción entre los diferentes módulos.
- `project-requirements-document.md` - Especifica los requisitos funcionales y no funcionales que la librería debe cumplir. Esto incluye capacidades, restricciones, comportamientos esperados, compatibilidad con diferentes entornos y cualquier otro requisito específico del dominio.
- `tech-stack-document.md` - Proporciona un inventario detallado de las tecnologías utilizadas en el proyecto, incluyendo versiones específicas, justificación de su elección, alternativas consideradas, y cómo estas tecnologías se integran entre sí.
- `technical-specification-document.md` - Contiene las especificaciones técnicas detalladas de la librería, incluyendo arquitectura, diseño de interfaces, estructuras de datos, algoritmos clave, y decisiones técnicas importantes junto con su razonamiento.

Al referenciar estos documentos cuando solicites a un agente que realice una tarea, le proporcionarás el contexto necesario para entender correctamente los requisitos y las restricciones del proyecto, permitiéndole generar soluciones más precisas y alineadas con tu visión.

Se recomienda mantener esta documentación actualizada a medida que el proyecto evoluciona, ya que sirve como una fuente centralizada de conocimiento sobre las decisiones de diseño y la arquitectura del sistema.
