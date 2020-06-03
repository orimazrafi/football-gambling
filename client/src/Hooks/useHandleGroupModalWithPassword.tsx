import { useState } from "react";
import { JoinGroupDetails } from "../interfaces";

export const useHandleGroupModalWithPassword = () => {
  const [modalIsOpen, setModalIsOpen] = useState(false);
  const [resetModal, setResetModal] = useState(false);

  const [groupInput, setGroupInput] = useState({
    name: "",
    userId: "",
    groupId: "",
    password: "",
    image: "",
  });
  const OpenGroupPasswordModal = (groupInput: JoinGroupDetails) => {
    setGroupInput((prev: any) => ({
      ...prev,
      name: groupInput.name,
      groupId: groupInput.groupId,
      password: groupInput.password,
      image: groupInput.image,
    }));
    setModalIsOpen(true);
    setResetModal(true);
  };
  const handleclose = () => {
    setModalIsOpen(false);
    setResetModal(false);
  };
  return {
    OpenGroupPasswordModal,
    groupInput,
    handleclose,
    modalIsOpen,
    setModalIsOpen,
    resetModal,
  };
};
