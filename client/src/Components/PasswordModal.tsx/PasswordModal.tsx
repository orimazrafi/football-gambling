import React, { useState, useEffect } from "react";
import { ModalDialog } from "../../elements/ModalDialog";
import { Input } from "../../elements/Input";
import { SuccessButton } from "../../elements/SuccessButton";
import Card from "@material-ui/core/Card";
import { GroupInput } from "../../interfaces";

// eslint-disable-next-line
const log = console.log;

interface Props {
  onClose: () => void;
  modalIsOpen: boolean;
  groupInput: GroupInput;
  auth: any;
  onaddUser: (group: GroupInput) => void;
  resetModal: boolean;
}
const NUMBER_OF_ERROR_THAT_OK = 3;
const NUMBER_OF_ERROR_THAT_NOT_OK = 3;
export const PasswordModal = (props: Props) => {
  const {
    onClose,
    modalIsOpen,
    groupInput,
    auth,
    onaddUser,
    resetModal,
  } = props;
  useEffect(() => {
    setError({ message: "", num: 0 });
    setPassword("");
  }, [resetModal]);

  const [error, setError] = useState({ message: "", num: 0 });

  const handleError = () => {
    if (!error.message) return "";
    if (error.message && error.num < NUMBER_OF_ERROR_THAT_OK)
      return "Incorrect password.";
    return `your account would be blocked if you will continue to supply false password!`;
  };

  const [password, setPassword] = useState("");
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { value } = e.target;
    setPassword(value);
  };

  const handleJoinGroup = () => {
    if (error.num === NUMBER_OF_ERROR_THAT_NOT_OK) {
      auth.logout();
    }
    if (password === groupInput.password) onaddUser(groupInput);
    else
      setError((prev) => ({
        message: "Password is incorrect",
        num: ++prev.num,
      }));
  };

  return (
    <ModalDialog
      onClose={onClose}
      aria-labelledby="group-password-dialog"
      open={modalIsOpen}
      className="dialog-password-group"
    >
      <Card>
        <h1>{groupInput.name}</h1>

        <Input
          label="Group Password..."
          placeholder="Password ..."
          name="password"
          type="text"
          variant="outlined"
          fullWidth
          autoFocus={true}
          value={password}
          onChange={handleChange}
          error={error.message ? true : false}
          helperText={handleError()}
          InputLabelProps={{
            shrink: true,
          }}
        />

        <img
          src={`${process.env.REACT_APP_CLOUDINARY_IMAGE}${groupInput.image}`}
          alt={groupInput.name}
          className="dialog--group__image"
        />

        <SuccessButton
          margin="0 20px 15px auto"
          variant="contained"
          color="primary"
          padding="0.75em 1.7em"
          background="rgb(28, 184, 65)"
          onClick={handleJoinGroup}
        >
          Join
        </SuccessButton>
      </Card>
    </ModalDialog>
  );
};
