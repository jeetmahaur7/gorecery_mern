import { createRoot } from "react-dom/client";
import { Provider } from "react-redux";
import Store from "./Redux/Store.jsx";
import App from "./App.jsx";

createRoot(document.getElementById("root")).render(
  <Provider store={Store}>
    <App />
  </Provider>
);
