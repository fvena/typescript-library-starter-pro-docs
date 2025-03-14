import { defineConfig } from "vitepress";
import checkbox from "markdown-it-task-checkbox";
import { search as esSearch } from "./es";

export const shared = defineConfig({
  cleanUrls: true,

  // rewrites: {
  //   'en/:rest*': ':rest*'
  // },

  /* prettier-ignore */
  head: [
    ['link', { href: '/logo.png', rel: 'icon', type: 'image/png' }],
    ['meta', { content: '#5f67ee', name: 'theme-color' }],
    ['meta', { content: 'website', property: 'og:type' }],
    ['meta', { content: 'en', property: 'og:locale' }],
    ['meta', { content: 'TypeScript Library Template Pro | A modern template for building TypeScript libraries', property: 'og:title' }],
    ['meta', { content: 'TypeScript Library Template Pro', property: 'og:site_name' }],
    ['meta', { content: 'https://vitepress.dev/vitepress-og.jpg', property: 'og:image' }],
    ['meta', { content: 'https://vitepress.dev/', property: 'og:url' }],
    ['script', {},
      `if (window.location.pathname === '/' || window.location.pathname === '/typescript-library-template-pro/') {
        window.location.href = '/en/';
      }`
    ]
  ],
  markdown: {
    codeTransformers: [
      // We use `[!!code` in demo to prevent transformation, here we revert it back.
      {
        postprocess(code) {
          return code.replaceAll('[!!code', "[!code");
        },
      },
    ],
    config(md) {
      // TODO: remove when https://github.com/vuejs/vitepress/issues/4431 is fixed
      const fence = md.renderer.rules.fence!;
      md.renderer.rules.fence = function (tokens, index, options, env, self) {
        const { localeIndex = "root" } = env;
        const codeCopyButtonTitle = (() => {
          switch (localeIndex) {
            case "es": {
              return "Copiar código";
            }
            default: {
              return "Copy code";
            }
          }
        })();
        return fence(tokens, index, options, env, self).replace(
          '<button title="Copy Code" class="copy"></button>',
          `<button title="${codeCopyButtonTitle}" class="copy"></button>`,
        );
      };
      md.use(checkbox, {
        disabled: true,
        liClass: "task-list-item",
        ulClass: "task-list",
      });
    },
  },

  metaChunk: true,

  sitemap: {
    hostname: "https://vitepress.dev",
    transformItems(items) {
      return items.filter((item) => !item.url.includes("migration"));
    },
  },

  themeConfig: {
    footer: {
      copyright: `Copyright © ${new Date().getFullYear()} Francisco Vena`,
      message: "Released under the MIT License.",
    },

    logo: { height: 24, src: "/logo.png", width: 24 },

    search: {
      options: {
        locales: {
          ...esSearch,
        },
      },
      provider: "local",
    },

    socialLinks: [
      {
        icon: "github",
        link: "https://github.com/fvena/typescript-library-template-pro",
      },
    ],
  },

  title: "TypeScript Library Starter Pro",
});
