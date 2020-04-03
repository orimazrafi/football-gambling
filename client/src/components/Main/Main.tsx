import React from "react";
export const Main = ({
  name,
  auth
}:
  | {
      name: string;
      location: string;
      auth: any;
    }
  | any) => {
  return (
    <div>
      <p className="App-intro">
        Hello, {name}
        <br />
        Do you want to see the secret area? <a href="/secret">Click here</a>
      </p>
      {!auth.isAuthenticated() && (
        <div>
          <hr />
          Please login first
          <hr />
          <button onClick={auth.login}>login</button>
        </div>
      )}
    </div>
  );
};
