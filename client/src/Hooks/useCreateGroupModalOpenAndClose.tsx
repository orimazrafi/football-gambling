import { useState } from "react";

export const useCreateGroupModalOpenAndClose = () => {
  const [open, setOpen] = useState(false);
  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };
  return { open, handleClickOpen, handleClose, setOpen };
};
