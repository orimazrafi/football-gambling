import React, { useEffect } from "react";
import Auth from "../../auth";
import { LoadingGif } from "../../Components/LoadingGif/LoadingGif";
import { LoadingText } from "../../elements/LoadingText";
export const Callback = () => {
  useEffect(() => {
    new Auth().handleAuthentication();
  }, []);
  return (
    <div style={{ height: "80vh", display: "flex" }}>
      <div style={{ margin: "auto" }}>
        <LoadingText>Checking Authentication...</LoadingText>
        <LoadingGif loading={true} size={150} />
      </div>
    </div>
  );
};
