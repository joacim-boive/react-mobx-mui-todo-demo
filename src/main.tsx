import { LongPressProvider } from "@/contexts/long-press-context.tsx";
import { ScreenSizeProvider } from "@/contexts/small-screen-context.tsx";
import { ThemeProvider } from "@/contexts/theme-context.tsx";
import { TodosProvider } from "@/contexts/todos-context";
import React from "react";
import ReactDOM from "react-dom/client";
import App from "./app.tsx";
import { longPressState } from "@/stores/long-press-state.ts";
import "./index.css";

if (import.meta.env.MODE === "development") {
  void import("@mobx-devtools/tools").then((module) => {
    module.injectStores({ appStore: longPressState });
  });
}

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <LongPressProvider longPress={longPressState}>
      <ThemeProvider defaultTheme="light" storageKey="theme">
        <TodosProvider>
          <ScreenSizeProvider>
            <App />
          </ScreenSizeProvider>
        </TodosProvider>
      </ThemeProvider>
    </LongPressProvider>
  </React.StrictMode>
);

// Prevent the context menu from opening and colliding with our long press on mobile.
window.addEventListener(
  "contextmenu",
  function (e) {
    e.preventDefault();
  },
  false
);
