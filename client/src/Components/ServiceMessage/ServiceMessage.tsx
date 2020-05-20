import React from "react";
import { useAddTokenAndMessageNotificationListener } from "../../Hooks/useAddTokenAndMessageNotificationListener";

export const ServiceMessage = () => {
  useAddTokenAndMessageNotificationListener();
  return <div></div>;
};
