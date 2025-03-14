# TypeScript Library Template Pro

## Motivación del proyecto

Crear una biblioteca de TypeScript desde cero puede ser una tarea desalentadora. Configurar herramientas, garantizar la calidad del código y gestionar procesos como pruebas, compilación y publicación requiere mucho esfuerzo antes de comenzar a escribir el código real de la biblioteca.

Esta plantilla tiene como objetivo simplificar el proceso, proporcionándote un entorno preconfigurado y profesional para que puedas concentrarte en lo que realmente importa: desarrollar tu biblioteca.

### ¿Por qué usar esta plantilla?

- **Lista para desarrollar**: Comienza con todo lo que necesitas para escribir, probar y publicar una biblioteca de TypeScript.
- **Buenas prácticas**: Incluye herramientas y flujos de trabajo que garantizan un código de alta calidad y procesos confiables.
- **Escalable**: Diseñada tanto para desarrolladores individuales como para equipos pequeños, con características como pipelines CI/CD automatizados, conventional commits y documentación.
- **Personalizable**: Extiende o ajusta fácilmente las configuraciones para adaptarlas a las necesidades de tu proyecto.

## Características principales

- **TypeScript**: Proporciona soporte completo para las características modernas de TypeScript, garantizando un tipado estricto.
- **Compilación sin esfuerzo**: Utiliza [Tsup](https://tsup.egoist.dev) para compilaciones rápidas y sencillas. Compatible tanto con ESM como con CommonJS.
- **Calidad de código**: [ESLint](https://eslint.org) y [Prettier](https://prettier.io) preconfigurados garantizan una base de código limpia y mantenible.
- **Testing**: Incluye [Vitest](https://vitest.dev) para testing unitario rápidos y confiables.
- **Conventional Commits**: Aplica estándares de mensajes de commit con [Commitlint](https://commitlint.js.org) y [Husky](https://typicode.github.io/husky/).
- **Documentación**: Impulsada por [Vitepress](https://vitepress.dev) para una documentación fácil e interactiva.
- **Release automatizadas**: Gestiona el versionado y los registros de cambios con [semantic-release](https://semantic-release.gitbook.io/semantic-release/).
- **Pipelines CI/CD**: Configurados con [GitHub Actions](https://github.com/features/actions) para linting, pruebas, publicación y despliegue de la documentación.
- **Integración de Dependabot**: Mantiene tus dependencias actualizadas automáticamente.

## Beneficios de usar esta plantilla

- **Enfoque en el desarrollo**: La configuración inicial ya está lista, por lo que puedes concentrarte en crear tu biblioteca.
- **Consistencia garantizada**: Las herramientas preconfiguradas aseguran que tu código siga buenas prácticas.
- **Proceso de publicación simplificado**: La integración con semantic-release automatiza el versionado y la publicación.
- **Flujo de trabajo optimizado**: El desarrollo trunk-based y las GitHub Actions agilizan el ciclo de desarrollo.
- **Mantenibilidad mejorada**: La documentación generada automáticamente y los estándares de código facilitan el mantenimiento a largo plazo.
- **Experiencia de contribución mejorada**: Plantillas de PR e issue, commits convencionales y guías de contribución facilitan la colaboración.
