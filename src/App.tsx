import React from "react";
import "./App.css";
import UserModule from "./pages/EmployeeModule";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function App() {
  return (
    <div className="App">
      <UserModule />
      <ToastContainer
        closeButton={true}
        autoClose={3000}
        newestOnTop
        hideProgressBar
      />
    </div>
  );
}

export default App;
