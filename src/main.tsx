import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.tsx";
import "./index.css";
import { BrowserRouter as Router } from "react-router-dom";
import { GoogleOAuthProvider } from "@react-oauth/google";
import { Provider } from "react-redux";
import store from "./reduxKit/store.ts";
// In your main file (e.g., index.js or App.js)
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
// import { clientId } from "./config/constants.ts";
const VITE_GOOGLE_CLIENT_ID ="201800197345-93j613rp6o1ebi2ne50lfb7ug1v5ap1n.apps.googleusercontent.com";

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <Router>
      <GoogleOAuthProvider clientId={VITE_GOOGLE_CLIENT_ID}>
        <Provider store={store}>
          <App />
        </Provider>
      </GoogleOAuthProvider>
    </Router>
  </React.StrictMode>
);
