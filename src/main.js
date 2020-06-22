import App from "./App.svelte";
import initializeAnalytics from "./analytics";

initializeAnalytics();

const app = new App({
  target: document.body,
});

export default app;
