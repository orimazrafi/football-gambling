import React from "react";
import "./App.css";
import { Main } from "./components/Main/Main";
import { Secret } from "./components/Secret/Secret";
import { NotFound } from "./components/NotFound/NotFound";
import { Callback } from "./components/Callback/Callback";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
const log = console.log;

const App = ({
  name,
  auth,
  picture
}: { name: string; auth: any; picture: string } | any) => {
  return (
    <div>
      <Router>
        <Switch>
          <Route
            path="/"
            exact
            render={() => <Main name={name} auth={auth} />}
          />
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
      </Router>
    </div>
  );
};
// extends React.Component<
//   { name: string; location: string; auth: any; picture: string } | any
// >
// {
// render() {
//   log(this.props);
//   let mainComponent: Element | any = "";
//   switch (this.props.location) {
//     case "":
//       mainComponent = <Main {...this.props} />;
//       break;
//     case "callback":
//       mainComponent = <Callback />;
//       break;
//     case "secret":
//       mainComponent = this.props.auth.isAuthenticated() ? (
//         <Secret {...this.props} />
//       ) : (
//         <NotFound />
//       );
//       break;
//     default:
//       mainComponent = <NotFound />;
//   }

export default App;
