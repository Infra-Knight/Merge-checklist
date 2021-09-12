import React from "react";
import { Route, Switch } from "react-router-dom";

import Features from "./Features";
import Feature, { CreateFeature } from "./Feature";

const App = () => (
  <Switch>
    <Route exact path="/" component={Features} />
    <Route path="/features/create" component={CreateFeature} />
    <Route path="/features/:selectedFeatureId" component={Feature} />
  </Switch>
);

export default App;
