---
layout: home

hero:
  name: "TypeScript Library Template Pro"
  text: "Plantilla profesional para librerías TypeScript"
  tagline: Desarrolla, prueba y publica bibliotecas TypeScript con buenas prácticas y herramientas modernas
  image:
    src: /logo_shadow.png
    alt: TypeScript Library Template Pro
  actions:
    - theme: brand
      text: Comenzar
      link: /getting-started/create-repository
    - theme: alt
      text: Ver en GitHub
      link: https://github.com/fvena/typescript-library-template-pro

features:
  - icon: 📦
    title: Listo para usar
    details: Configuración completa que incluye TypeScript, ESLint, Prettier, Vitest, y más. Todo pre-configurado y listo para usar.

  - icon: 🚀
    title: Publicación automatizada
    details: Flujo de trabajo CI/CD completo con GitHub Actions para testing, despliegue y publicación automática en NPM.

  - icon: 📝
    title: Commits convencionales
    details: Implementa Conventional Commits y semantic-release para gestionar automáticamente versiones y changelogs.

  - icon: 📚
    title: Documentación integrada
    details: Sistema de documentación con VitePress pre-configurado y desplegado automáticamente en GitHub Pages.

  - icon: 🧪
    title: Testing robusto
    details: Framework de pruebas Vitest configurado para pruebas unitarias, cobertura de código e integración continua.

  - icon: 🔄
    title: Flujo de desarrollo optimizado
    details: Flujo basado en trunk para facilitar el desarrollo individual y en equipo con protección de rama principal.

  - icon: 🔍
    title: Calidad de código
    details: Herramientas de análisis estático que garantizan código limpio, bien tipado y consistente.

  - icon: 🤖
    title: Desarrollo con IA
    details: Guías específicas para integrar herramientas de IA en tu flujo de desarrollo, testing y documentación.
---

<div class="vp-doc" style="padding: 0 24px;">

## 🌟 Por qué usar esta plantilla

Crear una biblioteca TypeScript desde cero es un proceso complejo que implica configurar múltiples herramientas y establecer flujos de trabajo eficientes. Esta plantilla resuelve estos desafíos proporcionando:

- **Configuración Zero-Config**: Empieza a desarrollar inmediatamente sin preocuparte por la configuración.
- **Mejores Prácticas**: Estructura y flujos de trabajo probados por la industria.
- **Automatización**: CI/CD completamente automatizado para testing, versionado y publicación.
- **Mantenibilidad**: Herramientas para mantener alta calidad de código a largo plazo.

## 📋 ¿Qué incluye?

- **TypeScript**: Configuración optimizada para desarrollo de bibliotecas
- **Build System**: [tsup](https://github.com/egoist/tsup) para compilación rápida y eficiente
- **Testing**: [Vitest](https://vitest.dev/) para pruebas unitarias y de integración
- **Linting**: ESLint con reglas para TypeScript
- **Formatting**: Prettier para estilo de código consistente
- **Git Hooks**: Husky y lint-staged para validación pre-commit
- **CI/CD**: GitHub Actions para integración y despliegue continuo
- **Publicación**: semantic-release para gestión automática de versiones
- **Documentación**: VitePress para documentación moderna e interactiva

## 🚀 Empieza rápido

```bash
# Clona el repositorio
git clone https://github.com/fvena/typescript-library-template-pro.git mi-libreria

# Entra al directorio
cd mi-libreria

# Instala dependencias
npm install

# Inicia el servidor de desarrollo
npm run dev
```

## 📖 Explora la documentación

- [Crear Repositorio](/getting-started/create-repository) - Primeros pasos para configurar tu proyecto
- [Flujo de Trabajo](/development/workflow) - Guía del flujo de desarrollo recomendado
- [Testing](/development/testing) - Cómo implementar pruebas efectivas
- [Publicación](/publishing/release-process) - Proceso de publicación automática
- [Desarrollo con IA](/ai-assisted/design) - Cómo integrar IA en tu flujo de desarrollo

## 💼 Para quién es esta plantilla

Esta plantilla está diseñada para:

- **Desarrolladores individuales** que quieren crear bibliotecas mantenibles y profesionales
- **Equipos pequeños** que necesitan una base sólida y procesos estandarizados
- **Proyectos de código abierto** que requieren buenas prácticas y documentación completa
- **Empresas** que desean establecer un estándar para el desarrollo de librerías internas

## 👥 Contribuye

¿Encontraste un error o tienes una sugerencia? ¡Las contribuciones son bienvenidas!

- [Guía de contribución](/contributing/guide)
- [Código de conducta](/contributing/code-of-conduct)
- [Crear Pull Requests](/contributing/pull-requests)

</div>
