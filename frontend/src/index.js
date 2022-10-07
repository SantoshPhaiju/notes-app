import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import {Provider} from 'react-redux'
import App from "./App";
import reportWebVitals from "./reportWebVitals";
import {store} from './app/store'

import { fetchNotes } from "./features/notes/notesSlice";

store.dispatch(fetchNotes());
const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <Provider store={store}>
      <App />
    </Provider>
  </React.StrictMode>
);

reportWebVitals();
