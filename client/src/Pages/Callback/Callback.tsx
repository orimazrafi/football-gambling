import React, { useEffect } from "react";
import Auth from "../../auth";
import { LoadingGif } from "../../Components/LoadingGif/LoadingGif";
export const Callback = () => {
  useEffect(() => {
    const auth = new Auth();
    auth.handleAuthentication();
  }, []);
  return <LoadingGif loading={true} />;
};
