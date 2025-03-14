# Configurar Github y NPM Tokens

Necesitas configurar los tokens de acceso tanto para GitHub como para NPM. Estos tokens permitirán que las GitHub Actions realicen operaciones como publicar nuevas versiones en NPM y actualizar la documentación en GitHub Pages.

## Crear tokens de GitHub

1. Ve a tu cuenta de GitHub y navega a **Settings**.
2. En el menú lateral, selecciona **Developer settings** > **Personal access tokens** > **Fine-grained tokens**.
3. Haz clic en **Generate new token (classic)**.
4. Proporciona un nombre descriptivo para el token, por ejemplo, "semantic-release".
5. Establece la fecha de vencimiento (para proyectos personales, puedes seleccionar "No expiration").
6. En **Repository access**, selecciona **All repositories** si deseas usar el mismo token para múltiples proyectos, o selecciona repositorios específicos.
7. En **Permissions**, necesitarás habilitar:
   - **Commit statuses**: `Read & write`
   - **Contents**: `Read & write`
   - **Environments**: `Read-only`
   - **Issues**: `Read & write`
   - **Metadata**: `Read-only`
   - **Pull requests**: `Read & write`
   - **Secrets**: `Read-only`
   - **Variables**: `Read-only`
   - **Workflows**: `Read & write`
8. Haz clic en **Generate token**.

::: tip Importante
Copia el token generado y guárdalo en un lugar seguro. No podrás verlo nuevamente después de salir de esta página.
:::

::: danger Seguridad
Trata tu token como una contraseña. Nunca lo compartas públicamente o lo incluyas en el código fuente.
:::

## Crear tokens de NPM

1. Inicia sesión en tu cuenta en el [sitio web de NPM](https://www.npmjs.com/).
2. Haz clic en tu avatar en la esquina superior derecha y selecciona **Access Tokens**.
3. Haz clic en **Generate New Token**.
4. Selecciona el tipo de token:
   - Para CI/CD y publicación automática, selecciona **Automation** (Automatización).
5. Proporciona un nombre descriptivo para el token, por ejemplo, el nombre de tu biblioteca.
6. Haz clic en **Generate Token**.

::: tip Importante
Copia el token generado y guárdalo en un lugar seguro. No podrás verlo nuevamente.
:::

## Añadir tokens a tu repositorio de GitHub

Una vez que tengas los tokens de GitHub y NPM, debes configurarlos como secretos en tu repositorio para que las GitHub Actions puedan utilizarlos.

1. Ve a tu repositorio en GitHub.
2. Haz clic en la pestaña **Settings**.
3. En el menú lateral, selecciona **Secrets and variables** y luego **Actions**.
4. Añade el token de GitHub:
   - Haz clic en **New repository secret**.
   - **Name**: `GH_TOKEN`
   - **Value**: Pega el token de acceso personal de GitHub que generaste anteriormente.
   - Haz clic en **Add secret**.
5. Añade el token de NPM:
   - Haz clic nuevamente en **New repository secret**.
   - **Name**: `NPM_TOKEN`
   - **Value**: Pega el token de NPM que generaste anteriormente.
   - Haz clic en **Add secret**.
