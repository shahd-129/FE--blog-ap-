import React from "react";
import "./App.css";
import Route from "./Routes/Route";
import { Provider } from "react-redux";
import store from "./Redux/Store/Store";


export default function App() {
  return (
    <Provider store={store}>
      <Route />

    </Provider>
  );
}
