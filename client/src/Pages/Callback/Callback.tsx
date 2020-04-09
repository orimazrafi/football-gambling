import React, { useEffect } from "react";
import Auth from "../../auth";
import { css } from "@emotion/core";
import { ClipLoader } from "react-spinners";
import { LoadingWrapper } from "../../elements/LoadingWrapper";
const override = css`
  display: block;
  margin: auto;
`;
export const Callback = () => {
  useEffect(() => {
    const auth = new Auth();
    auth.handleAuthentication();
  }, []);
  return (
    <LoadingWrapper>
      <ClipLoader css={override} size={150} color={"#123abc"} loading={true} />
    </LoadingWrapper>
  );
};
