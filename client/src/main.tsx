import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import { RouterProvider } from "react-router-dom";
import route from "./router/route";
import AuthContextProvider from "./context/AuthContextProvider";
import Navbar from "./components/navbar";

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <AuthContextProvider>
      <Navbar />
      <div className="main">
        <RouterProvider router={route} />
      </div>
    </AuthContextProvider>
  </React.StrictMode>
);
