import React, { useEffect } from "react";
import Auth from "../../auth";
import { css } from "@emotion/core";
import { ClipLoader } from "react-spinners";

const override = css`
  display: block;
  margin: 0 auto;
`;
export const Callback = () => {
  useEffect(() => {
    const auth = new Auth();
    auth.handleAuthentication();
  }, []);
  return (
    <div className="sweet-loading">
      <ClipLoader css={override} size={150} color={"#123abc"} loading={true} />
    </div>
  );
};
