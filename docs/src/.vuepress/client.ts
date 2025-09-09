import qqGroupLink from "./components/qqGroupLink.js";
import { defineClientConfig } from "vuepress/client";

export default defineClientConfig({
  enhance: ({ app }) => {
    app.component("qqGroupLink", qqGroupLink);
  },
});
