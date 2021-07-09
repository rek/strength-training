import { BrowserRouter, Switch, Route } from "react-router-dom";
import React from "react";

import { Routes, Sidebar } from "./pages";

function App() {
  return (
    <div className="App">
      <Sidebar />
      <Routes />
    </div>
  );
}

export default App;
