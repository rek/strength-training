import { BrowserRouter, Switch, Route } from "react-router-dom";
import React from "react";

import { Graph } from "./Graph";

export const Routes = () => {
  return (
    <BrowserRouter>
      <Switch>
        <Route path="/" component={Graph} />
      </Switch>
    </BrowserRouter>
  );
};
