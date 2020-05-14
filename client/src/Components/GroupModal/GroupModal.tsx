import React, { useState, useEffect, useCallback } from "react";
import { Dialog } from "@material-ui/core";
import { H2 } from "../../elements/H2";
import { UseFormData } from "../../Hooks/UseFormData";
import { UseCloudinaryUpload } from "../../Hooks/UseCloudinaryUpload";
import * as yup from "yup";
import { imageIcon } from "../../helpers";
import { useBlur } from "../../Hooks/useBlur";
import { Group } from "../../interfaces";
import { GroupModalForm } from "../GroupModalForm/GroupModalForm";
import "./GroupModal.css";
interface Data {
  leagues: League[];
}
interface League {
  _id: string;
  name: string;
  label?: string;
}

export interface SimpleDialogProps {
  open: boolean;
  onClose: () => void;
  errors: string;
  onSubmit: (groupInput: Group, image: string) => void;
  loadingLeagues: boolean;
  data: Data | undefined;
  loadingCreateGroup: boolean;
}
// eslint-disable-next-line
const log = console.log;
export const GroupModal = (props: SimpleDialogProps) => {
  const {
    onClose,
    open,
    errors,
    onSubmit,
    loadingLeagues,
    data,
    loadingCreateGroup,
  } = props;

  const validateSchema = yup.object({
    name: yup.string().required().min(3).max(25),
    password: yup.string(),
    passwordConfirm: yup.string().when("password", {
      is: (password: string) => password,
      then: yup
        .string()
        .required("Password Confirm must be the same as password.")
        .oneOf([yup.ref("password"), null]),
    }),
    maxParticipate: yup.number().min(2).max(256),
    league: yup.string().min(2).required(),
  });

  const {
    handelNameBlur,
    handlePasswordConfirmBlur,
    handleLeagueBlur,
    blur,
  } = useBlur();

  const [loadingImage, setLoadingImage] = useState(false);
  const [image, setImage] = useState(imageIcon);
  useEffect(() => {
    setImage(imageIcon);
  }, [open]);
  const onDrop = useCallback(async (acceptedFiles: File[]) => {
    setLoadingImage(true);
    const formData = UseFormData(acceptedFiles[0]);
    const { data } = await UseCloudinaryUpload(formData);
    setImage(() => data.public_id);
    setLoadingImage(false);
  }, []);
  return (
    <Dialog
      className="group--modal"
      onClose={onClose}
      aria-labelledby="simple-dialog-title"
      open={open}
    >
      <H2>Create new Group</H2>
      {errors && (
        <div className="group--modal__error__title">
          {errors.includes("name") ? errors.slice(14) : errors}
        </div>
      )}
      <GroupModalForm
        validateSchema={validateSchema}
        onSubmit={onSubmit}
        image={image}
        open={open}
        handelNameBlur={handelNameBlur}
        handlePasswordConfirmBlur={handlePasswordConfirmBlur}
        blur={blur}
        handleLeagueBlur={handleLeagueBlur}
        loadingLeagues={loadingLeagues}
        data={data}
        loadingImage={loadingImage}
        loadingCreateGroup={loadingCreateGroup}
        onDrop={onDrop}
      />
    </Dialog>
  );
};
