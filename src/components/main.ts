import type { App } from "vue";
import { HelloWorld, MyButton } from "@/components";

import InputTextOutline from "@/components/inputs/InputTextOutline.vue";

export default {
  install: (app: App) => {
    app.component("HelloWorld", HelloWorld);
    app.component("MyButton", MyButton);
    app.component("InputTextOutline", InputTextOutline);
  }
};

export { HelloWorld, MyButton, InputTextOutline };