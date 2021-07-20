import React from "react";
import { hydrate } from "react-dom";
import { BrowserRouter } from "react-router-dom";
import App from "../shared/App";
import { Provider } from "react-redux";
import { configureStore } from "../shared/store";
const store = configureStore();
hydrate(
  <Provider store={store}>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </Provider>,
  document.getElementById("app")
);
