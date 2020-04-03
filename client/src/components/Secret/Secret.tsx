import React from "react";
export const Secret = ({ name, auth, picture }: any) => {
  return (
    <div>
      you are:{name}
      <br />
      This is a super secret area. Jump back to<a href="/">Home</a>
      <br />
      <img src={picture} alt={name} />
      <button onClick={auth.logout}>Logout</button>
    </div>
  );
};
