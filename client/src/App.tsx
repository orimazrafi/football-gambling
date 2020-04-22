import React from "react";
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

import ApolloClient, { InMemoryCache } from "apollo-boost";

import { ApolloProvider } from "react-apollo";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "./App.css";
const client = new ApolloClient({
  uri: process.env.REACT_APP_BACKEND_PORT,
  cache: new InMemoryCache({
    addTypename: false,
  }),
});

// eslint-disable-next-line
const log = console.log;
const App = ({
  email,
  name,
  auth,
  image,
}: { name: string; auth: any; image: string } | any) => {
  return (
    <ApolloProvider client={client}>
      <Router>
        <Global>
          <div>
            {auth.isAuthenticated() && (
              <Navbar name={name} auth={auth} image={image} />
            )}
            <ToastContainer />
            <Switch>
              <Route path="/" exact render={() => <HomePage auth={auth} />} />
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
                    <Secret
                      email={email}
                      name={name}
                      image={image}
                      auth={auth}
                    />
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
    </ApolloProvider>
  );
};

export default App;
