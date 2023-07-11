import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import "normalize.css";
import App from "./App";
import { AppProvider } from "./context";
// ReactDOM.render(
//   <React.StrictMode>
//     <AppProvider>
//       <App />
//     </AppProvider>
//   </React.StrictMode>,
//   document.getElementById('root')
// );
const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <AppProvider>
      <App />
    </AppProvider>
  </React.StrictMode>
);
