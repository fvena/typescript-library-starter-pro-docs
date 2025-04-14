# Crea tu repositorio

El primer paso para comenzar con la plantilla TypeScript Library Template Pro será crear tu propio repositorio. Existen dos formas de hacerlo:

## Usar como plantilla de GitHub

GitHub ofrece una forma sencilla de crear un nuevo repositorio basado en una plantilla existente. Sigue estos pasos para crear tu repositorio:

1. Navega a la [página del repositorio TypeScript Library Template Pro](https://github.com/fvena/typescript-library-template-pro) en GitHub.
2. Haz clic en el botón verde **"Use this template"** en la parte superior derecha de la página.
3. Selecciona **"Create a new repository"** del menú desplegable.
4. Se te redirigirá a una nueva página donde puedes configurar tu nuevo repositorio:
   - Asigna un nombre a tu repositorio (idealmente relacionado con tu biblioteca)
   - Opcionalmente, añade una descripción
   - Elige la visibilidad (pública o privada)
5. Haz clic en **"Create repository from template"**

::: info
Al usar la funcionalidad **"Use this template"** de GitHub, tu nuevo repositorio se crea con un historial limpio, conservando todos los archivos pero eliminando el historial de commits anterior.
:::

## Clonando el repositorio

Si lo prefieres, puedes clonar el repositorio en tu máquina local directamente:

```bash
git clone https://github.com/fvena/typescript-library-template-pro.git nombre-del-proyecto
cd nombre-del-proyecto
```

Después, necesitarás resetear el historial de Git para comenzar con un historial limpio:

```bash
# Elimina la carpeta .git y todo el historial
rm -rf .git

# Inicializa un nuevo repositorio Git
git init

# Añade todos los archivos al staging
git add .

# Realiza el primer commit
git commit -m "chore: initial commit"

# Configura el repositorio remoto (reemplaza con tu URL)
git remote add origin https://github.com/tu-usuario/nombre-del-repositorio.git

# Sube los cambios a tu repositorio remoto
git push -u origin main
```

## Actualizar dependencias

Aunque el repositorio suele actualizarse regularmente, es recomendable revisar y actualizar todas las dependencias a las versiones más recientes al comenzar tu proyecto:

1. Elimina el archivo `package-lock.json`:

```bash
rm package-lock.json
```

2. Utiliza la herramienta npm-check-updates para verificar y actualizar las dependencias:

```bash
npx npm-check-updates --interactive --format group
```

Esta herramienta te mostrará todas las dependencias que pueden actualizarse y te permitirá seleccionar cuáles actualizar. Una vez actualizadas las dependencias en el `package.json`, dile que instale los paquetes.

## Verificación inicial

Después de clonar el repositorio y actualizar las dependencias, es recomendable verificar que todo funcione correctamente:

```bash
# Ejecuta las pruebas
npm test

# Compila la biblioteca
npm run build

# Inicia el servidor de desarrollo de la documentación
npm run docs:dev
```

Si todos estos comandos se ejecutan sin errores, estás listo para comenzar a personalizar y desarrollar tu biblioteca.

## Siguientes pasos

Una vez que hayas creado y clonado tu repositorio, el siguiente paso es actualizar la información del proyecto para reflejar los detalles de tu biblioteca. Consulta [Actualizar información del proyecto](/es/guide/getting-started/update-project-info) para obtener instrucciones detalladas.
