import type { DefaultTheme } from "vitepress";
import { defineConfig } from "vitepress";

export const es = defineConfig({
  description:
    "Plantilla profesional para librerías TypeScript. Crea librerías para cualquier entorno (Node.js, navegador) y propósito (utilidades, componentes UI, frameworks CSS) con flujos de trabajo optimizados, publicación automatizada y desarrollo asistido por IA. Comienza a programar en minutos.",
  lang: "es-ES",

  themeConfig: {
    darkModeSwitchLabel: "Tema Oscuro",

    darkModeSwitchTitle: "Cambiar a modo oscuro",

    docFooter: {
      next: "Siguiente",
      prev: "Anterior",
    },

    langMenuLabel: "Cambiar Idioma",

    lastUpdated: {
      formatOptions: {
        dateStyle: "short",
        timeStyle: "medium",
      },
      text: "Actualizado en",
    },

    lightModeSwitchTitle: "Cambiar a modo claro",
    nav: nav(),
    outline: {
      label: "En esta página",
    },
    returnToTopLabel: "Volver arriba",
    sidebar: {
      "/es/guide/": { base: "/es/guide/", items: sidebarGuide() },
    },
    sidebarMenuLabel: "Menu Lateral",
    skipToContentLabel: "Saltar al contenido",
  },
});

function nav(): DefaultTheme.NavItem[] {
  return [
    {
      link: "/es/guide",
      text: "Guia",
    },
  ];
}

function sidebarGuide(): DefaultTheme.SidebarItem[] {
  return [
    {
      link: "/",
      text: "Introducción",
    },
    {
      collapsed: false,
      items: [
        {
          link: "/getting-started/create-repository",
          text: "Crear repositorio",
        },
        {
          link: "/getting-started/update-project-info",
          text: "Información del proyecto",
        },
        { link: "/getting-started/readme", text: "README" },
        { link: "/getting-started/vibe-coding", text: "Vibe Coding" },
        { link: "/getting-started/tokens", text: "Tokens" },
        { link: "/getting-started/github-pages", text: "GitHub Pages" },
        {
          link: "/getting-started/branch-protection",
          text: "Protección de ramas",
        },
        { link: "/getting-started/first-commit", text: "Primer commit y release" },
      ],
      text: "Primeros Pasos",
    },
    {
      collapsed: false,
      items: [
        { link: "/development/scripts", text: "Scripts" },
        { link: "/development/workflow", text: "Flujo de trabajo" },
        { link: "/development/commit-conventions", text: "Commits" },
        { link: "/development/build", text: "Construir la librería" },
        { link: "/development/testing", text: "Testing" },
        { link: "/development/code-quality", text: "Calidad de código" },
        { link: "/development/documentation", text: "Documentación" },
        { link: "/development/playground", text: "Playground" },
        { link: "/development/browser", text: "Librerías para Navegador" },
        { link: "/development/ci-cd", text: "CI/CD" },
        { link: "/development/release-process", text: "Releases" },
      ],
      text: "Desarrollo",
    },
    {
      collapsed: false,
      items: [
        { link: "/ai-assisted/design", text: "Diseño" },
        { link: "/ai-assisted/coding", text: "Codificación" },
        { link: "/ai-assisted/testing", text: "Testing" },
        { link: "/ai-assisted/agents", text: "Agentes" },
        { link: "/ai-assisted/documentation", text: "Documentación" },
      ],
      text: "IA & Desarrollo",
    },
    {
      collapsed: true,
      items: [
        { link: "/contributing/guide", text: "Guía" },
        { link: "/contributing/pull-requests", text: "Pull Requests" },
        { link: "/contributing/issue-templates", text: "Issues" },
        { link: "/contributing/code-of-conduct", text: "Código de conducta" },
      ],
      text: "Contribuir",
    },
    { link: "/faqs", text: "FAQs" },
  ];
}

export const search: DefaultTheme.AlgoliaSearchOptions["locales"] = {
  es: {
    placeholder: "Buscar documentos",
    translations: {
      button: {
        buttonAriaLabel: "Buscar",
        buttonText: "Buscar",
      },
      modal: {
        errorScreen: {
          helpText: "Verifique su conexión de red",
          titleText: "No fue posible obtener resultados",
        },
        footer: {
          closeKeyAriaLabel: "Cerrar",
          closeText: "Cerrar",
          navigateDownKeyAriaLabel: "Navegar hacia abajo",
          navigateText: "Navegar",
          navigateUpKeyAriaLabel: "Navegar hacia arriba",
          searchByText: "Buscar por",
          selectKeyAriaLabel: "Seleccionar",
          selectText: "Seleccionar",
        },
        noResultsScreen: {
          noResultsText: "No fue posible encontrar resultados",
          reportMissingResultsLinkText: "Click para enviar feedback",
          reportMissingResultsText: "Deberian haber resultados para esa consulta?",
          suggestedQueryText: "Puede intentar una nueva búsqueda",
        },
        searchBox: {
          cancelButtonAriaLabel: "Cancelar",
          cancelButtonText: "Cancelar",
          resetButtonAriaLabel: "Limpiar búsqueda",
          resetButtonTitle: "Limpiar búsqueda",
        },
        startScreen: {
          favoriteSearchesTitle: "Favoritos",
          noRecentSearchesText: "Ninguna búsqueda reciente",
          recentSearchesTitle: "Historial de búsqueda",
          removeFavoriteSearchButtonTitle: "Borrar de favoritos",
          removeRecentSearchButtonTitle: "Borrar del historial de búsqueda",
          saveRecentSearchButtonTitle: "Guardar en el historial de búsqueda",
        },
      },
    },
  },
};
