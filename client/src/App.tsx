import React from "react";
import { HomePage } from "./Pages/HomePage/HomePage";
import { Secret } from "./Pages/Secret/Secret";
import { NotFound } from "./Pages/NotFound/NotFound";
import { Callback } from "./Pages/Callback/Callback";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import { Global } from "../src/elements/Global";
import { Navbar } from "./Components/Navbar/Navbar";
import { ScoreTable } from "./Pages/ScoreTable/ScoreTable";
import { Rules } from "./Pages/Rules/Rules";
import { Opponents } from "./Pages/Opponents/Opponents";
import { InMemoryCache } from "apollo-boost";
import ApolloClient from "apollo-client";
import { ApolloProvider } from "react-apollo";
import { ToastContainer } from "react-toastify";
import { StylesProvider } from "@material-ui/styles";
import { WebSocketLink } from "apollo-link-ws";
import { BestScorer } from "./Pages/BestScorer/BestScorer";
import { WinningTeam } from "./Pages/WinningTeam/WinningTeam";
import { MatchesGamble } from "./Pages/MatchesGamble/MatchesGamble";
import { Chat } from "./Pages/Chat/Chat";
import { AuthAuthenticate } from "./interfaces";
import { WEB_SOCKET_URI, userIdFromLocalStorage } from "./helpers";
import { ServiceMessage } from "./Components/ServiceMessage/ServiceMessage";
import "purecss/build/pure.css";
import "react-toastify/dist/ReactToastify.css";
import "./App.css";
import { WEB_SOCKET_URI } from "./helpers";
const client = new ApolloClient({
  link: new WebSocketLink({
    uri: WEB_SOCKET_URI,
    options: {
      reconnect: true,
    },
  }),

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
}: { name: string; auth: AuthAuthenticate; image: string } | any) => {
  return (
    <ApolloProvider client={client}>
      <Router>
        <StylesProvider injectFirst>
          <Global>
            <div>
              {auth.isAuthenticated() && (
                <Navbar name={name} auth={auth} image={image} />
              )}
              {userIdFromLocalStorage() !== null && <ServiceMessage />}
              <ToastContainer />
              <Switch>
                <Route path="/" exact render={() => <HomePage auth={auth} />} />
                {auth.isAuthenticated() && (
                  <Route path="/gamble" component={MatchesGamble} />
                )}
                {auth.isAuthenticated() && (
                  <Route path="/best-scorer" component={BestScorer} />
                )}
                {auth.isAuthenticated() && (
                  <Route path="/winning-team" component={WinningTeam} />
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
                {auth.isAuthenticated() && (
                  <Route path="/chat" component={Chat} />
                )}

                <Route path="/callback" component={Callback} />
                <Route
                  path="/secret"
                  render={() =>
                    auth.isAuthenticated() ? (
                      <Secret email={email} name={name} image={image} />
                    ) : (
                      <NotFound />
                    )
                  }
                />
                <Route path="/" component={NotFound} />
              </Switch>
            </div>
          </Global>
        </StylesProvider>
      </Router>
    </ApolloProvider>
  );
};

export default App;
