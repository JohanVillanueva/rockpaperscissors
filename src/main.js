import App from "./App.svelte";
import initializeAnalytics from "./analytics";

const app = new App({
  target: document.getElementById("app"),
});

initializeAnalytics();

export default app;
