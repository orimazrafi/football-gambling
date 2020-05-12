import { useRef, useState, useEffect } from "react";

export const useNavbarGambleDropDown = () => {
  const [open, setOpen] = useState(false);
  const anchorRef = useRef<any>(null);
  const handleToggle = () => {
    setOpen((prevOpen) => !prevOpen);
  };
  const handleCloseDropDown = (event: React.MouseEvent<EventTarget>) => {
    if (
      anchorRef.current &&
      anchorRef.current.contains(event.target as HTMLElement)
    ) {
      return;
    }

    setOpen(false);
  };
  const handleListKeyDown = (event: React.KeyboardEvent) => {
    if (event.key === "Tab") {
      event.preventDefault();
      setOpen(false);
    }
  };
  const prevOpen = useRef(open);
  useEffect(() => {
    if (prevOpen.current === true && open === false) {
      anchorRef.current!.focus();
    }
    prevOpen.current = open;
  }, [open]);
  return {
    open,
    anchorRef,
    handleToggle,
    handleCloseDropDown,
    handleListKeyDown,
  };
};
