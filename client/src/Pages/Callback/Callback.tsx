import React, { useEffect } from "react";
import Auth from "../../auth";
import { LoadingGif } from "../../Components/LoadingGif/LoadingGif";
export const Callback = () => {
  useEffect(() => {
    new Auth().handleAuthentication();
  }, []);
  return (
    <div style={{ height: "80vh", display: "flex" }}>
      <div style={{ margin: "auto" }}>
        <h1>Checking Authentication...</h1>
        <LoadingGif loading={true} size={150} />
      </div>
    </div>
  );
};
