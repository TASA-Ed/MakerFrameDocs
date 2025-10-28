import { defineClientConfig } from "vuepress/client";
import qqGroupLink from "./components/qqGroupLink.js";

export default defineClientConfig({
  enhance: ({ app }) => {
    app.component("qqGroupLink", qqGroupLink);
  },
});
