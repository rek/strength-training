import { BrowserRouter, Switch, Route } from "react-router-dom";
import React from "react";

import { Graph } from "./pages/Graph";

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Switch>
          <Route path="/" component={Graph} />
        </Switch>
      </BrowserRouter>
    </div>
  );
}

export default App;
