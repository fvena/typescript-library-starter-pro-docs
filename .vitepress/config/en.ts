import { type DefaultTheme, defineConfig } from "vitepress";

export const en = defineConfig({
  description:
    "A professional TypeScript library starter. Build libraries for any environment (Node.js, browser) and purpose (utilities, UI components, CSS frameworks) with optimized workflows, automated publishing, and AI-assisted development. Start coding in minutes.",
  lang: "en-US",

  themeConfig: {
    nav: nav(),

    sidebar: {
      "/en/guide/": { base: "/en/guide/", items: sidebarGuide() },
      // '/reference/': { base: '/reference/', items: sidebarReference() }
    },
  },
});

function nav(): DefaultTheme.NavItem[] {
  return [
    {
      activeMatch: "/en/guide/",
      link: "/en/guide",
      text: "Guide",
    },
    // {
    //   text: 'Reference',
    //   link: '/reference/site-config',
    //   activeMatch: '/reference/'
    // },
    // {
    //   text: pkg.version,
    //   items: [
    //     {
    //       text: 'Changelog',
    //       link: 'https://github.com/vuejs/vitepress/blob/main/CHANGELOG.md'
    //     },
    //     {
    //       text: 'Contributing',
    //       link: 'https://github.com/vuejs/vitepress/blob/main/.github/contributing.md'
    //     }
    //   ]
    // }
  ];
}

function sidebarGuide(): DefaultTheme.SidebarItem[] {
  return [
    {
      link: "/",
      text: "Introduction",
    },
    {
      collapsed: false,
      items: [
        {
          link: "/getting-started/create-repository",
          text: "Create Repository",
        },
        {
          link: "/getting-started/update-project-info",
          text: "Project Information",
        },
        { link: "/getting-started/readme", text: "README" },
        { link: "/getting-started/tokens", text: "Tokens" },
        { link: "/getting-started/github-pages", text: "GitHub Pages" },
        {
          link: "/getting-started/branch-protection",
          text: "Branch Protection",
        },
      ],
      text: "Getting Started",
    },
    {
      collapsed: false,
      items: [
        { link: "/development/scripts", text: "Scripts" },
        { link: "/development/workflow", text: "Workflow" },
        { link: "/development/commit-conventions", text: "Commits" },
        { link: "/development/testing", text: "Testing" },
        { link: "/development/code-quality", text: "Code Quality" },
        { link: "/development/documentation", text: "Documentation" },
        { link: "/development/playground", text: "Playground" },
      ],
      text: "Development",
    },
    {
      collapsed: false,
      items: [
        { link: "/publishing/release-process", text: "Process" },
        { link: "/publishing/ci-cd", text: "CI/CD" },
        { link: "/publishing/semantic-release", text: "Semantic-release" },
        { link: "/publishing/manual-release", text: "Manual Release" },
        { link: "/publishing/release-checklist", text: "Checklist" },
      ],
      text: "Publishing",
    },
    {
      collapsed: false,
      items: [
        { link: "/library-types/nodejs", text: "Node.js" },
        { link: "/library-types/browser", text: "Browser" },
        { link: "/library-types/styles", text: "Styles" },
        { link: "/library-types/components", text: "Components" },
      ],
      text: "Library Types",
    },
    {
      collapsed: false,
      items: [
        { link: "/ai-assisted/design", text: "Design" },
        { link: "/ai-assisted/coding", text: "Coding" },
        { link: "/ai-assisted/testing", text: "Testing" },
        { link: "/ai-assisted/agents", text: "Agents" },
        { link: "/ai-assisted/documentation", text: "Documentation" },
      ],
      text: "AI & Development",
    },
    {
      collapsed: true,
      items: [
        { link: "/contributing/guide", text: "Guide" },
        { link: "/contributing/pull-requests", text: "Pull Requests" },
        { link: "/contributing/issue-templates", text: "Issues" },
        { link: "/contributing/code-of-conduct", text: "Code of Conduct" },
      ],
      text: "Contributing",
    },
    { link: "/faqs", text: "FAQs" },
  ];
}

// function sidebarReference(): DefaultTheme.SidebarItem[] {
//   return [
//     {
//       text: 'Reference',
//       items: [
//         { text: 'Site Config', link: 'site-config' },
//         { text: 'Frontmatter Config', link: 'frontmatter-config' },
//         { text: 'Runtime API', link: 'runtime-api' },
//         { text: 'CLI', link: 'cli' },
//         {
//           text: 'Default Theme',
//           base: '/reference/default-theme-',
//           items: [
//             { text: 'Overview', link: 'config' },
//             { text: 'Nav', link: 'nav' },
//             { text: 'Sidebar', link: 'sidebar' },
//             { text: 'Home Page', link: 'home-page' },
//             { text: 'Footer', link: 'footer' },
//             { text: 'Layout', link: 'layout' },
//             { text: 'Badge', link: 'badge' },
//             { text: 'Team Page', link: 'team-page' },
//             { text: 'Prev / Next Links', link: 'prev-next-links' },
//             { text: 'Edit Link', link: 'edit-link' },
//             { text: 'Last Updated Timestamp', link: 'last-updated' },
//             { text: 'Search', link: 'search' },
//             { text: 'Carbon Ads', link: 'carbon-ads' }
//           ]
//         }
//       ]
//     }
//   ]
// }
