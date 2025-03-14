import { defineConfig } from "vitepress";
import { shared } from "./shared";
import { en } from "./en";
import { es } from "./es";

export default defineConfig({
  ...shared,
  locales: {
    en: { label: "English", ...en },
    es: { label: "Español", ...es },
  },
});
