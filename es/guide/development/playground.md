# Playground

Un playground te permite probar tu biblioteca durante el desarrollo sin necesidad de publicarla. TypeScript Library Template Pro facilita la creación de este entorno de pruebas.

## Estructura básica

El playground está configurado como un workspace de npm, para que puedas usar la biblioteca localmente y probarla en un entorno controlado. La estructura actual es la siguiente:

```
/
├── src/               # Código fuente de tu biblioteca
├── playground/        # Entorno de pruebas
│   ├── src/           # Código fuente del playground
│   ├── package.json   # Dependencias específicas del playground
│   └── tsconfig.json  # Configuración de TypeScript para el playground
└── package.json       # Configuración principal del proyecto
```

## Ejecutar el playground

Tanto la biblioteca como el playground se pueden iniciar con los siguientes comandos. Ambos se ejecutarán en modo de observación, por lo que se recompilarán y reiniciarán automáticamente cuando detecten cambios tanto en la biblioteca como en el playground.

```bash
npm run dev         # para iniciar la biblioteca
npm run playground  # para iniciar el playground
```

## Entornos múltiples

En proyectos más complejos, puede ser útil tener múltiples playgrounds:

```
/
└── playground/
    ├── playground-node/     # Para pruebas en Node.js
    ├── playground-vue/      # Para pruebas en Vue
    └── playground-react/    # Para pruebas en React
```

## Buenas prácticas

1. **Mantén el playground simple**: El objetivo es probar tu biblioteca, no crear una aplicación compleja.

2. **Añade ejemplos variados**: Incluye ejemplos para diferentes casos de uso y escenarios.

3. **Prueba API pública y privada**: El playground es un buen lugar para probar tanto la API pública como implementaciones internas durante el desarrollo.

4. **Documentación en el código**: Añade comentarios explicativos en los ejemplos del playground, serán útiles para entender el uso de la biblioteca.

5. **No incluyas el playground en la distribución**: Configura tu `package.json` para excluir el playground del paquete publicado:

```json
{
  "files": ["dist", "README.md"]
}
```

6. **Usa datos realistas**: En lugar de usar datos de ejemplo como "foo" o "bar", utiliza ejemplos más realistas que muestren casos de uso prácticos.

## Solución de problemas comunes

::: details La biblioteca no se actualiza en el playground

**Problema**: Realizas cambios en tu biblioteca pero no se reflejan en el playground.

**Solución**:

1. Asegúrate de que el modo de observación de tu biblioteca esté ejecutándose (`npm run dev`).
2. Verifica que estás importando correctamente desde tu biblioteca.
3. Si usas bundlers como Vite, puede ser necesario reiniciar el servidor de desarrollo.
4. Si usas npm link, prueba con `npm unlink` y luego `npm link` nuevamente.

:::

::: details Errores de tipos TypeScript

**Problema**: TypeScript muestra errores de tipos aunque el código funcione.

**Solución**:

1. Verifica que el `tsconfig.json` del playground tenga `"skipLibCheck": true`.
2. Asegúrate de que los archivos de declaración (`.d.ts`) se están generando correctamente en tu biblioteca.
3. A veces es necesario reiniciar el servidor de TypeScript en tu editor (VS Code: Ctrl+Shift+P, "TypeScript: Restart TS Server").

:::

::: details Dependencias incompatibles

**Problema**: Errores relacionados con versiones duplicadas de dependencias.

**Solución**:

1. Usa hoisting de dependencias en tu configuración de workspaces.
2. Configura un `.npmrc` con `shamefully-hoist=true` si usas pnpm.
3. Asegúrate de que las versiones de dependencias compartidas sean compatibles.

:::
