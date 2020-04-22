import React from "react";
import { LoadingWrapper } from "../../elements/LoadingWrapper";
import { ClipLoader } from "react-spinners";
import { css } from "@emotion/core";

const override = css`
  display: block;
  margin: auto;
`;
export const LoadingGif: React.FC<{ loading: boolean; size: number }> = ({
  loading,
  size,
}) => {
  return (
    <LoadingWrapper>
      <ClipLoader
        css={override}
        size={size}
        color={"#123abc"}
        loading={loading}
      />
    </LoadingWrapper>
  );
};
