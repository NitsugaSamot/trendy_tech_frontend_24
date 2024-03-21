import { HashRouter } from "react-router-dom";
import { Provider } from "react-redux";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import "./index.css";
import store from "./redux/store.js";
import { Auth0Provider } from "@auth0/auth0-react";
import { StrictMode } from "react";
// import "./index.css"
import "./App.css"

ReactDOM.createRoot(document.getElementById("root")).render(
  <Provider store={store}>
    <Auth0Provider
      domain="dev-6u1rw8b065enk7nb.us.auth0.com"
      clientId="q8WshN0PeWFSr3lZlvXkBx0blXS5SwjZ"
      authorizationParams={{
        redirect_uri: `${window.location.origin}/#/home`,
      }}
    >
      <HashRouter>
        <App />
      </HashRouter>
    </Auth0Provider>
  </Provider>
);



// import React from 'react'
// import ReactDOM from 'react-dom/client'
// import App from './App.jsx'
// import './index.css'

// ReactDOM.createRoot(document.getElementById('root')).render(
//   <React.StrictMode>
//     <App />
//   </React.StrictMode>,
// )
