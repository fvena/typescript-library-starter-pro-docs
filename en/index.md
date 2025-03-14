---
layout: home

hero:
  name: "TypeScript Library Starter Pro"
  text: "A professional TypeScript library starter"
  tagline: Build libraries for any environment (Node.js, browser) and purpose (utilities, UI components, CSS frameworks) with optimized workflows, automated publishing, and AI-assisted development.
  image:
    src: /logo_shadow.png
    alt: TypeScript Library Starter Pro
  actions:
    - theme: brand
      text: Get Started
      link: /getting-started/
    - theme: alt
      text: View on GitHub
      link: https://github.com/fvena/typescript-library-template-pro

features:
  - icon: 🚀
    title: Modern TypeScript
    details: Full support for modern TypeScript features with strict type checking, ensuring type safety throughout your codebase.

  - icon: 📦
    title: Effortless Build
    details: Powered by tsup for fast, zero-config builds supporting ESM and CommonJS formats with TypeScript declarations.

  - icon: ✅
    title: Quality Built-in
    details: Integrated ESLint, Prettier, and Husky provide code quality tools and Git hooks for consistent standards.

  - icon: 🧪
    title: Testing Ready
    details: Includes Vitest for fast, reliable testing with watch mode, UI interface, and coverage reporting.

  - icon: 🔄
    title: Automated Releases
    details: Semantic-release integration for automated versioning, changelog generation, and npm publishing.

  - icon: 📝
    title: Documentation
    details: Built-in VitePress for beautiful documentation that deploys automatically to GitHub Pages.
---

## Why Use TypeScript Library Template Pro?

Creating a TypeScript library from scratch involves significant setup work before you even begin coding. This template eliminates that overhead by providing a complete, ready-to-use environment with industry best practices already integrated.

### Save Time & Focus on Your Code

Start writing your library code immediately without spending days setting up tooling and workflows. The template includes everything you need for modern TypeScript library development.

```typescript
// Start coding right away in src/index.ts
export function greet(name: string): string {
  return `Hello, ${name}!`;
}
```

### Professional Development Workflow

The template integrates a complete development workflow with code quality tools, testing, and automated releases:

```bash
# Development with auto-rebuild
npm run dev

# Run tests with watch mode
npm run test:watch

# Build for production
npm run build
```

### Easy Playground Testing

Test your library in real applications using the monorepo playground approach:

```typescript
// In playground/basic/src/index.ts
import { yourFunction } from "your-library-name";

// Use your library in a real application!
console.log(yourFunction());
```

## Get Started Today

Follow our [Installation Guide](/getting-started/installation) to set up your library and start building right away. The template is designed to be flexible, extensible, and adaptable to your specific needs.

<div class="tip custom-block">
  <p>If you find this template useful, please consider giving it a star on <a href="https://github.com/fvena/typescript-library-template-pro" target="_blank">GitHub</a>.</p>
</div>
