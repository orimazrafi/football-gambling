import React, { useEffect } from "react";
import Auth from "../../auth";
import { LoadingGif } from "../../Components/LoadingGif/LoadingGif";
export const Callback = () => {
  useEffect(() => {
    new Auth().handleAuthentication();
  }, []);
  return <LoadingGif loading={true} size={150} />;
};
