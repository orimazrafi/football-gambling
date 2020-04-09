import React from "react";
import "./App.css";
import { HomePage } from "./Pages/HomePage/HomePage";
import { Secret } from "./Pages/Secret/Secret";
import { NotFound } from "./Pages/NotFound/NotFound";
import { Callback } from "./Pages/Callback/Callback";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import { Global } from "../src/elements/Global";
import { Navbar } from "./Components/Navbar/Navbar";
import { GamblingTable } from "./Pages/GamblingTable/GamblingTable";
import { ScoreTable } from "./Pages/ScoreTable/ScoreTable";
import { Rules } from "./Pages/Rules/Rules";
import { Opponents } from "./Pages/Opponents/Opponents";
// eslint-disable-next-line
const log = console.log;
const App = ({
  name,
  auth,
  picture,
}: { name: string; auth: any; picture: string } | any) => {
  return (
    <Router>
      <Global>
        <div>
          {auth.isAuthenticated() && (
            <Navbar name={name} auth={auth} picture={picture} />
          )}
          <Switch>
            <Route
              path="/"
              exact
              render={() => <HomePage name={name} auth={auth} />}
            />
            {auth.isAuthenticated() && (
              <Route path="/gamble" component={GamblingTable} />
            )}
            {auth.isAuthenticated() && (
              <Route path="/score" component={ScoreTable} />
            )}
            {auth.isAuthenticated() && (
              <Route path="/rules" component={Rules} />
            )}
            {auth.isAuthenticated() && (
              <Route path="/opponents" component={Opponents} />
            )}

            <Route path="/callback" component={Callback} />
            <Route
              path="/secret"
              render={() =>
                auth.isAuthenticated() ? (
                  <Secret auth={auth} name={name} picture={picture} />
                ) : (
                  <NotFound />
                )
              }
            />
            <Route path="/" component={NotFound} />
          </Switch>
        </div>
      </Global>
    </Router>
  );
};

export default App;
