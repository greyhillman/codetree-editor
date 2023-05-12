import { createApp } from "vue";
import { createPinia } from "pinia";
import Editor from "./Editor.vue";

const app = createApp(Editor);

app.use(createPinia());

app.mount("#app");
