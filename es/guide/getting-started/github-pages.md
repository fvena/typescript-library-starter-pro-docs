# Configurar Github Pages

El starter utiliza GitHub Pages para alojar la documentación generada por VitePress. Requiere activar GitHub Pages en el repositorio:

1. Ve a tu repositorio en GitHub.
2. Haz clic en la pestaña **Settings**.
3. En el menú lateral, desplázate hacia abajo y selecciona **Pages**.
4. En la sección **Build and deployment**, cambia la **Source** a **GitHub Actions**.

![Configuración de GitHub Pages](https://i.imgur.com/example.png)

::: info Nota
No es necesario seleccionar una rama o directorio específico, ya que el flujo de trabajo de GitHub Actions se encargará de todo el proceso de compilación y despliegue.
:::

## Despliegue

La plantilla incluye un flujo de trabajo dedicado a la compilación y el despliegue de la documentación en GitHub Pages. Este flujo se encuentra en el archivo `.github/workflows/deploy.yml`.

## Verificación

Una vez que hayas configurado GitHub Pages y se haya ejecutado el flujo de trabajo de despliegue, debes verificar que la documentación se ha desplegado correctamente.

1. Espera a que se complete el flujo de trabajo de despliegue (esto puede tomar unos minutos).
2. Ve a la pestaña **Actions** en tu repositorio y comprueba que el flujo de trabajo "Deploy" se ha completado con éxito.
3. Una vez completado, ve a la sección **Pages** en la configuración de tu repositorio.
4. Deberías ver un mensaje que indica que tu sitio está publicado en una URL como `https://tu-usuario.github.io/nombre-de-tu-repositorio/`.
5. Haz clic en la URL para verificar que la documentación se muestra correctamente.

## Personalizar el dominio (opcional)

Si tienes un dominio personalizado, puedes configurarlo para tu documentación:

1. En la sección **Pages** de la configuración de tu repositorio, busca la opción **Custom domain**.
2. Ingresa tu dominio (por ejemplo, `docs.mibiblioteca.com`).
3. Haz clic en **Save**.
4. Configura los registros DNS de tu dominio para que apunten a los servidores de GitHub Pages:
   - Para un subdominio (como `docs.mibiblioteca.com`), crea un registro CNAME que apunte a `tu-usuario.github.io`.
   - Para un dominio apex (como `mibiblioteca.com`), configura registros A que apunten a las direcciones IP de GitHub Pages.

::: warning Importante
Si usas un dominio personalizado, debes actualizar la opción `base` en la configuración de VitePress a `"/"` en lugar del nombre de tu repositorio.
:::

### Solución de problemas comunes

::: details La documentación no se muestra correctamente

- **Causa**: La opción `base` en la configuración de VitePress no coincide con la estructura de la URL.
- **Solución**: Verifica que `base` esté configurada como `/nombre-de-tu-repositorio/` (incluyendo las barras) y reconstruye la documentación.
  :::

::: details Recursos (CSS, imágenes) no se cargan

- **Causa**: Rutas incorrectas a los recursos debido a una configuración de base incorrecta.
- **Solución**: Asegúrate de usar rutas relativas a la base en tu documentación y verifica la configuración de base en VitePress.
  :::

::: details El despliegue falla

- **Causa**: Problemas con el flujo de trabajo de GitHub Actions o con la compilación de VitePress.
- **Solución**: Revisa los logs de error en la pestaña Actions, verifica las dependencias y asegúrate de que la documentación se compile localmente con `npm run docs:build`.
  :::

## Personalización

Consulta la [documentación oficial de VitePress](https://vitepress.dev/) para más información sobre cómo personalizar tu documentación.
