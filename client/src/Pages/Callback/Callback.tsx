import React, { useEffect } from "react";
import Auth from "../../auth";
import { LoadingGif } from "../../Components/LoadingGif/LoadingGif";
import { LoadingText } from "../../elements/LoadingText";
import "./Callback.css";
export const Callback = () => {
  useEffect(() => {
    new Auth().handleAuthentication();
  }, []);
  return (
    <div className="callback--page">
      <div className="callback--page__inner__wrapper">
        <LoadingText>Checking Authentication...</LoadingText>
        <LoadingGif loading={true} size={150} />
      </div>
    </div>
  );
};
