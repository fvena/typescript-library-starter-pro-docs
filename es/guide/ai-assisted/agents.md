# Configuración de agentes

Los agentes de IA son asistentes especializados que pueden integrarse en tu flujo de trabajo de desarrollo para automatizar tareas y proporcionar asistencia inteligente. A diferencia de las interacciones simples con LLMs, los agentes pueden ejecutar acciones, mantener contexto y operar de manera semiautónoma. Este documento explora cómo configurar y utilizar agentes de IA para mejorar el desarrollo de bibliotecas TypeScript.

## Fundamentos de los agentes de IA

Los agentes de IA van más allá de la generación simple de texto o código; son sistemas que pueden:

1. **Mantener contexto** a través de múltiples interacciones
2. **Ejecutar herramientas** y tomar decisiones basadas en los resultados
3. **Seguir instrucciones complejas** que involucran múltiples pasos
4. **Adaptarse** a flujos de trabajo y convenciones específicas

### Tipos de agentes para desarrollo

Existen varios tipos de agentes que pueden ser útiles para el desarrollo de bibliotecas:

- **Agentes de codificación**: Especializados en escribir, revisar y refactorizar código
- **Agentes de documentación**: Centrados en generar y mantener documentación
- **Agentes de prueba**: Enfocados en la generación de casos de prueba y testing
- **Agentes de revisión**: Analizan código en busca de problemas y sugieren mejoras
- **Agentes de investigación**: Ayudan a investigar problemas complejos o API externas

## Configuración de Cursor

[Cursor](https://cursor.sh/) es un editor de código basado en VS Code que integra capacidades avanzadas de IA, ideales para desarrollar bibliotecas TypeScript.

### Instalación y configuración básica

1. **Descarga e instala Cursor** desde [cursor.sh](https://cursor.sh/)
2. **Configura tu clave de API**:
   - OpenAI (GPT-4): Más potente para tareas complejas
   - Anthropic (Claude): Excelente para razonamiento y explicaciones extensas
   - LLMs de código abierto: Para desarrollo local o preocupaciones de privacidad

### Configuración de proyecto

Para optimizar Cursor para tu biblioteca TypeScript:

1. **Abre tu proyecto** basado en TypeScript Library Template Pro en Cursor
2. **Configura los modelos de IA**:

   ```json
   // .cursor/settings.json
   {
     "ai": {
       "defaultModel": "gpt-4",
       "codeCompletionModel": "gpt-4",
       "chatModel": "claude-3-opus-20240229"
     }
   }
   ```

3. **Configura referencias de contexto** para mejorar la comprensión de tu biblioteca:

   ```json
   // .cursor/context.json
   {
     "importantFiles": ["src/index.ts", "package.json", "tsconfig.json", "README.md"],
     "codebaseContext": "Esta es una biblioteca TypeScript que sigue la estructura de TypeScript Library Template Pro. Utiliza tsup para la compilación, Vitest para testing, y semantic-release para publicación automática."
   }
   ```

### Comandos y atajos útiles

Cursor ofrece varios comandos específicos para IA:

- **Ctrl+L / Cmd+L**: Abre el chat de IA
- **Ctrl+K / Cmd+K**: Completa el código actual
- **Alt+K / Option+K**: Edita código seleccionado según instrucciones
- **Ctrl+Shift+L / Cmd+Shift+L**: Genera código según instrucciones

## Configuración de GitHub Copilot

GitHub Copilot ofrece capacidades de agente a través de Copilot Chat y extensiones.

### Instalación y configuración

1. **Instala extensiones**:

   - GitHub Copilot
   - GitHub Copilot Chat

2. **Configura preferencias** en VS Code:

   ```json
   // settings.json
   {
     "github.copilot.enable": {
       "*": true,
       "plaintext": true,
       "markdown": true,
       "typescript": true
     },
     "github.copilot.editor.enableAutoCompletions": true,
     "github.copilot.advanced": {
       "indentationMode": true,
       "listCount": 5,
       "inlineSuggestCount": 3
     }
   }
   ```

### Crear perfiles específicos

Para bibliotecas TypeScript, crea un perfil dedicado con configuraciones específicas:

1. En VS Code, ve a **Manage > Profiles > Create Profile**
2. Nombra el perfil "TypeScript Library Development"
3. Incluye las extensiones mencionadas anteriormente
4. Configura settings específicos para este tipo de desarrollo

### Comandos y prompts eficientes

GitHub Copilot Chat responde a comandos específicos:

- `/explain`: Explica el código seleccionado
- `/tests`: Genera pruebas para el código seleccionado
- `/fix`: Sugiere arreglos para problemas en el código
- `/optimize`: Optimiza el código seleccionado
- `/docs`: Genera documentación para el código

## Rules para agentes

Las "rules" o reglas son instrucciones que puedes proporcionar a agentes de IA para guiar su comportamiento y asegurar que generen resultados consistentes con las convenciones de tu proyecto.

### Creación de archivos de reglas

Crea un archivo `.ai-rules.md` en la raíz de tu proyecto:

```markdown
# AI Assistant Rules for TypeScript Library

## Code Style

- Follow the existing code style in the repository
- Use functional programming patterns when possible
- Prefer immutability and pure functions
- Use explicit typing, avoid 'any' type
- Add JSDoc comments to public API functions

## Naming Conventions

- Use camelCase for variables and functions
- Use PascalCase for classes, interfaces, and types
- Use UPPER_CASE for constants
- Prefix interfaces with 'I' (e.g., IConfig)
- Prefix type parameters with 'T' (e.g., TValue)

## Testing

- Write tests using Vitest
- Follow AAA pattern (Arrange-Act-Assert)
- Create both unit and integration tests
- Test edge cases and error handling

## Documentation

- Document all public APIs with JSDoc
- Include examples in documentation
- Keep README.md updated with new features
- Follow conventional commits for all changes

## Project Structure

- Keep related files together
- Organize by feature, not by file type
- Export public API from index.ts files
- Keep implementation details private
```

### Uso de las reglas con agentes

Para usar estas reglas con diferentes agentes:

#### Con Cursor

1. Abre el chat (Ctrl+L / Cmd+L)
2. Introduce: "Por favor sigue las reglas en el archivo .ai-rules.md mientras trabajas en este proyecto."
3. Para tareas específicas: "Genera un módulo de validación siguiendo las reglas del proyecto."

#### Con GitHub Copilot

1. Abre Copilot Chat
2. Introduce: "/reference .ai-rules.md"
3. Luego haz tu solicitud: "Crea una clase de caché que siga nuestras convenciones de proyecto."

### Personalización de reglas según el componente

Para bibliotecas grandes, considera crear reglas específicas para diferentes componentes:

```markdown
# Rules for Validation Module

## Validation Rules

- Each validator should be a pure function
- Validators should return a consistent result object
- Support both synchronous and asynchronous validation
- Allow composition of validators
- Prioritize helpful error messages
```

## Integración con IDEs

Además de Cursor y GitHub Copilot, puedes configurar agentes en otros IDEs y entornos.

### VS Code con extensiones personalizadas

1. **Continue.dev**: Una extensión de código abierto que permite configurar agentes personalizados.

   Instalación:

   ```bash
   npm install -g @continue/cli
   ```

   Configuración:

   ```json
   // .continue/config.json
   {
     "models": [
       {
         "title": "GPT-4",
         "provider": "openai",
         "model": "gpt-4",
         "apiKey": "${OPENAI_API_KEY}"
       }
     ],
     "defaultModel": "GPT-4",
     "contextSizeLimit": 14000
   }
   ```

2. **Codeium**: Una alternativa a Copilot con plan gratuito para proyectos personales.

3. **Tabnine**: Ofrece completado de código adaptativo con opciones de privacidad.

### JetBrains IDEs (WebStorm, IntelliJ IDEA)

Para desarrolladores que prefieren el ecosistema JetBrains:

1. Instala el plugin **AI Assistant**
2. Configura con tu clave de API preferida
3. Usa los atajos:
   - Alt+Enter: Muestra intenciones de IA
   - Ctrl+Shift+Space: Completado sensible al contexto

## Creación de agentes personalizados

Para necesidades específicas, puedes desarrollar agentes personalizados.

### Agentes basados en LangChain

[LangChain](https://js.langchain.com/) permite crear agentes personalizados en JavaScript/TypeScript:

```typescript
// agents/libraryDeveloper.ts
import { ChatOpenAI } from "langchain/chat_models/openai";
import { initializeAgentExecutorWithOptions } from "langchain/agents";
import { SerpAPI, Calculator, WebBrowser } from "langchain/tools";
import { ChainTool } from "langchain/tools";
import { createLibraryStructureChain } from "./chains/libraryStructure";

export async function createLibraryDeveloperAgent(apiKey: string) {
  const model = new ChatOpenAI({
    openAIApiKey: apiKey,
    modelName: "gpt-4",
    temperature: 0.2,
  });

  // Crear herramientas personalizadas
  const createStructure = new ChainTool({
    name: "CreateLibraryStructure",
    description: "Create a structure for a TypeScript library",
    chain: createLibraryStructureChain(),
  });

  // Definir todas las herramientas
  const tools = [
    new SerpAPI(process.env.SERPAPI_API_KEY, {
      location: "San Francisco,California,United States",
      hl: "en",
      gl: "us",
    }),
    new Calculator(),
    new WebBrowser(),
    createStructure,
  ];

  // Inicializar el agente
  const executor = await initializeAgentExecutorWithOptions(tools, model, {
    agentType: "chat-conversational-react-description",
    verbose: true,
    maxIterations: 5,
  });

  return executor;
}
```

### Agentes basados en API directa

También puedes crear agentes usando directamente las APIs de OpenAI o Anthropic:

```typescript
// agents/directApiAgent.ts
import { OpenAI } from "openai";
import * as fs from "fs";
import * as path from "path";

export class TypeScriptLibraryAgent {
  private client: OpenAI;
  private context: string = "";

  constructor(apiKey: string) {
    this.client = new OpenAI({ apiKey });
    this.loadProjectContext();
  }

  private loadProjectContext() {
    // Cargar archivos importantes para proporcionar contexto
    const files = ["package.json", "tsconfig.json", "src/index.ts", "README.md"];

    let context = "Project files:\n\n";

    files.forEach((file) => {
      try {
        const content = fs.readFileSync(path.join(process.cwd(), file), "utf8");
        context += `--- ${file} ---\n${content}\n\n`;
      } catch (error) {
        console.warn(`Could not load ${file}: ${error.message}`);
      }
    });

    this.context = context;
  }

  async generateComponent(description: string, path: string) {
    const response = await this.client.chat.completions.create({
      model: "gpt-4",
      messages: [
        {
          role: "system",
          content: `You are a TypeScript library development agent. You write clean,
                    well-documented TypeScript code following best practices for library development.

                    ${this.context}`,
        },
        {
          role: "user",
          content: `Generate a TypeScript component for my library with the following description:
                    ${description}

                    The file should be created at: ${path}`,
        },
      ],
      temperature: 0.2,
    });

    const generatedCode = response.choices[0].message.content;

    // Asegúrate de que el directorio existe
    fs.mkdirSync(path.dirname(path), { recursive: true });

    // Guarda el archivo
    fs.writeFileSync(path, generatedCode);

    return {
      path,
      code: generatedCode,
    };
  }

  // Más métodos para diferentes tareas...
}
```

## Automatización de flujos de trabajo

Los agentes pueden integrarse en flujos de trabajo automatizados para el desarrollo de bibliotecas.

### Scripts de automatización

Crea scripts para tareas comunes en `package.json`:

```json
{
  "scripts": {
    "generate:component": "node scripts/generate-component.js",
    "generate:test": "node scripts/generate-test.js",
    "generate:docs": "node scripts/generate-docs.js",
    "ai:review": "node scripts/ai-code-review.js"
  }
}
```

Ejemplo de script para generar componentes:

```javascript
// scripts/generate-component.js
const { program } = require("commander");
const { TypeScriptLibraryAgent } = require("../agents/directApiAgent");

program
  .argument("<name>", "Component name")
  .argument("<description>", "Component description")
  .action(async (name, description) => {
    const agent = new TypeScriptLibraryAgent(process.env.OPENAI_API_KEY);
    const path = `src/components/${name}.ts`;

    console.log(`Generating component ${name}...`);
    const result = await agent.generateComponent(description, path);
    console.log(`Component generated at ${result.path}`);
  });

program.parse(process.argv);
```

### Integración con Husky

Configura [Husky](https://typicode.github.io/husky/) para ejecutar agentes de revisión de código antes de commits:

```bash
npx husky add .husky/pre-commit "npm run ai:review"
```

El script de revisión podría verse así:

```javascript
// scripts/ai-code-review.js
const { execSync } = require("child_process");
const { Anthropic } = require("@anthropic/sdk");

// Inicializar cliente
const anthropic = new Anthropic({
  apiKey: process.env.ANTHROPIC_API_KEY,
});

async function main() {
  // Obtener archivos modificados
  const modifiedFiles = execSync("git diff --cached --name-only")
    .toString()
    .split("\n")
    .filter((file) => file.endsWith(".ts") || file.endsWith(".tsx"));

  if (modifiedFiles.length === 0) {
    console.log("No TypeScript files to review.");
    return;
  }

  // Preparar contenido para revisión
  const filesToReview = [];
  for (const file of modifiedFiles) {
    const content = execSync(`git show :${file}`).toString();
    filesToReview.push({ name: file, content });
  }

  // Revisar cada archivo
  for (const file of filesToReview) {
    console.log(`Reviewing ${file.name}...`);

    const response = await anthropic.messages.create({
      model: "claude-3-opus-20240229",
      max_tokens: 1000,
      messages: [
        {
          role: "user",
          content: `Review the following TypeScript code for a library and provide feedback on potential issues, improvements, or best practices:

          Filename: ${file.name}

          \`\`\`typescript
          ${file.content}
          \`\`\`

          Format your response as bullet points of issues found, or "No issues found" if the code looks good.`,
        },
      ],
    });

    console.log(`\nReview for ${file.name}:`);
    console.log(response.content);
    console.log("----------------------------\n");
  }
}

main().catch(console.error);
```

## Configuración para equipos

Para facilitar la colaboración en equipos, es importante estandarizar el uso de agentes.

### Archivos de configuración compartidos

Crea archivos de configuración compartidos para todos los miembros del equipo:

```json
// .vscode/extensions.json
{
  "recommendations": ["github.copilot", "github.copilot-chat", "continue.continue"]
}
```

```json
// .vscode/settings.json
{
  "editor.codeActionsOnSave": {
    "source.fixAll": true
  },
  "github.copilot.enable": {
    "*": true,
    "typescript": true,
    "typescriptreact": true,
    "plaintext": false
  }
}
```

### Directrices para uso de agentes

Crea un documento `AI_GUIDELINES.md` con directrices sobre el uso de agentes:

```markdown
# Directrices para el uso de agentes de IA

## Cuándo usar agentes

- Para generar esqueletos iniciales de componentes
- Para crear tests estándar
- Para generar documentación de API
- Para refactorizar código repetitivo

## Cuándo NO usar agentes

- Para lógica de negocio crítica sin revisión humana
- Para código que maneja seguridad o criptografía
- Para implementaciones que requieren optimización extrema

## Buenas prácticas

1. Siempre revisa y comprende el código generado
2. Ejecuta tests antes de confirmar cambios generados por IA
3. Documenta cuando el código fue generado sustancialmente por IA
4. Mantén los prompts y configuraciones en el repositorio

## Proceso recomendado

1. Definir claramente los requisitos antes de usar agentes
2. Generar una primera versión con asistencia de IA
3. Revisar, probar y refinar manualmente
4. Solicitar revisión de código de otro miembro del equipo
```

### Almacenamiento seguro de claves API

Para equipos, es importante gestionar las claves API de forma segura:

1. **Nunca incluyas claves API en el código o commits**
2. **Usa variables de entorno** en archivos `.env` que estén en `.gitignore`
3. **Configura secretos en CI/CD** para pruebas automatizadas
4. **Considera usar gestores de secretos** como:
   - [Doppler](https://www.doppler.com/)
   - [HashiCorp Vault](https://www.vaultproject.io/)
   - [AWS Secrets Manager](https://aws.amazon.com/secrets-manager/)

## Limitaciones y consideraciones

Es importante comprender las limitaciones actuales de los agentes de IA.

### Limitaciones técnicas

1. **Contexto limitado**: Los agentes tienen una ventana de contexto limitada y pueden no comprender todo el proyecto.
2. **No garantizan exactitud**: Pueden generar código que parece correcto pero contiene errores sutiles.
3. **Conocimiento desactualizado**: No están al día con las últimas mejores prácticas o APIs.
4. **Problemas éticos y legales**: Pueden generar código que infringe licencias o contiene sesgos.

### Buenas prácticas para mitigar limitaciones

1. **Revisión humana**: Siempre revisa el código generado antes de integrarlo.
2. **Testing exhaustivo**: Escribe pruebas completas para cualquier código generado.
3. **Supervisión humana**: Usa agentes como colaboradores, no como reemplazos.
4. **Documentación de uso**: Documenta qué partes fueron asistidas por IA para referencia futura.

## Conclusión

Los agentes de IA representan un nuevo paradigma en el desarrollo de bibliotecas TypeScript, ofreciendo capacidades que van más allá de la simple generación de código. Configurados correctamente, pueden convertirse en colaboradores valiosos que aceleran el desarrollo, mantienen la coherencia y ayudan con tareas repetitivas.

La clave para aprovechar al máximo los agentes de IA es combinar sus capacidades con el juicio humano, la experiencia de dominio y las prácticas de ingeniería sólidas. Con la configuración adecuada y directrices claras, los agentes pueden potenciar significativamente el proceso de desarrollo mientras mantienes el control sobre la calidad y dirección de tu biblioteca.

## Siguientes pasos

Una vez que hayas configurado agentes para asistir en el desarrollo, el siguiente paso lógico es explorar cómo pueden ayudar específicamente con la documentación. Consulta [Documentación automática](/es/guide/ai-assisted/documentation) para aprender a utilizar IA para generar y mantener documentación de alta calidad para tu biblioteca TypeScript.
