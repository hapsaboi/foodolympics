import React from "react";
import ReactDOM from "react-dom";
import App from "./App";
import AuthContext from './contexts/AuthContext';
import Modal from "react-modal";

import "bootstrap/dist/css/bootstrap.min.css";
import "./views/admin/assets/css/animate.min.css";
import "./views/admin/assets/scss/light-bootstrap-dashboard-react.scss?v=2.0.0";
import "./views/admin/assets/css/demo.css";
import "@fortawesome/fontawesome-free/css/all.min.css";

Modal.setAppElement("#root");

ReactDOM.render(
  <React.StrictMode>
    <AuthContext>
      <App />
    </AuthContext>
  </React.StrictMode>,
  document.getElementById("root")
);
