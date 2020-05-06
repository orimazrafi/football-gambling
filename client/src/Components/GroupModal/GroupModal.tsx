import React, { useState, useEffect, useCallback } from "react";
import { Dialog } from "@material-ui/core";
import { H2 } from "../../elements/H2";
import { Input } from "../../elements/Input";
import { SmallText } from "../../elements/SmallText";
import { DropzoneImage } from "../DropzoneImage/DropzoneImage";
import { UseFormData } from "../../Hooks/UseFormData";
import { UseCloudinaryUpload } from "../../Hooks/UseCloudinaryUpload";
import { Formik, Field, Form } from "formik";
import * as yup from "yup";
import { CHECK_GROUP_NAME_EXIST } from "../../queries";
import { GroupBlur } from "../../interfaces";
import { imageIcon, BACKEND_URL } from "../../helpers";
import { LoadingGif } from "../LoadingGif/LoadingGif";
import { RadioButton } from "../../elements/RadioButton";
import { Radio, RadioGroup, MenuItem } from "@material-ui/core";
import { SuccessButton } from "../../elements/SuccessButton";
import request from "graphql-request";

interface League {
  _id: string;
  name: string;
  label?: any;
}

export interface SimpleDialogProps {
  open: boolean;
  onClose: () => void;
  errors: any;
  onSubmit: any;
  loadingLeagues: any;
  data: any;
  loadingCreateGroup: any;
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
  useEffect(() => {
    setBlur({ name: false, passwordConfirm: false, league: false });
  }, []);
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

  const [image, setImage] = useState(imageIcon);
  useEffect(() => {
    setImage(imageIcon);
  }, [open]);
  const [blur, setBlur] = useState<GroupBlur>({
    name: false,
    passwordConfirm: false,
    league: false,
  });

  const [loadingImage, setLoadingImage] = useState(false);

  const onDrop = useCallback(async (acceptedFiles: File[]) => {
    setLoadingImage(true);
    const formData = UseFormData(acceptedFiles[0]);
    const { data } = await UseCloudinaryUpload(formData);
    setImage(() => data.public_id);
    setLoadingImage(false);
  }, []);
  const [groupName, setGroupName] = useState({
    duplicate: false,
    message: "",
  });
  useEffect(() => {
    setGroupName({ duplicate: false, message: "" });
  }, [open]);
  const handleGroupName = (name: string) => {
    setGroupName({ duplicate: false, message: "" });
    const variables = { name };
    request(BACKEND_URL, CHECK_GROUP_NAME_EXIST, variables).then(
      async (groupResponse) => {
        if (!groupResponse.checkGroupNameExist.success) {
          setGroupName({
            duplicate: true,
            message: groupResponse.checkGroupNameExist.messsage,
          });
        }
      }
    );
  };

  return (
    <Dialog onClose={onClose} aria-labelledby="simple-dialog-title" open={open}>
      <H2>Create new Group</H2>
      {errors && (
        <div style={{ textAlign: "center", color: "red" }}>
          {errors.includes("name") ? errors.slice(14) : errors}
        </div>
      )}
      <Formik
        validateOnChange={true}
        initialValues={{
          name: "",
          password: "",
          passwordConfirm: "",
          limitParticipate: "no",
          maxParticipate: 256,
          league: "",
        }}
        validationSchema={validateSchema}
        onSubmit={(data: any) => {
          onSubmit(data, image);
        }}
      >
        {({ values, errors }) => (
          <Form>
            <Field
              placeholder="Group name..."
              name="name"
              type="input"
              label="Group name"
              variant="outlined"
              fullWidth
              as={Input}
              helperText={
                (blur.name && errors["name"]) ||
                (groupName.duplicate && "Group name is already taken.")
              }
              autoFocus={true}
              onBlur={(e: any) => {
                handleGroupName(values["name"]);
                setBlur((prev: GroupBlur) => ({ ...prev, name: true }));
              }}
              error={
                (blur.name && errors["name"]) || groupName.duplicate
                  ? true
                  : false
              }
              InputLabelProps={{
                shrink: true,
              }}
            />

            <Field
              placeholder="Password..."
              name="password"
              type="input"
              label="Password"
              variant="outlined"
              fullWidth
              as={Input}
              helperText={
                "If you will not provide password you'r group would be public."
              }
              onBlur={(e: any) => {
                setBlur((prev: GroupBlur) => ({ ...prev, name: true }));
              }}
              InputLabelProps={{
                shrink: true,
              }}
            />
            <Field
              placeholder="Password Confirmation..."
              name="passwordConfirm"
              type="input"
              label="Password Confirmation"
              variant="outlined"
              fullWidth
              as={Input}
              helperText={
                blur.passwordConfirm &&
                values.password &&
                errors["passwordConfirm"] &&
                "Both passwords must matched!"
              }
              error={
                blur.passwordConfirm &&
                errors["passwordConfirm"] &&
                values.password
                  ? true
                  : false
              }
              onBlur={(e: any) => {
                setBlur((prev: GroupBlur) => ({
                  ...prev,
                  passwordConfirm: true,
                }));
              }}
              InputLabelProps={{
                shrink: true,
              }}
            />
            <div style={{ padding: "12px 20px" }}>
              Max Participate
              <div style={{ margin: "10px 0" }}>
                <SmallText>
                  Do you want to limit the number of participates that allow in
                  this group?
                </SmallText>
                <RadioGroup
                  row
                  aria-label="position"
                  name="position"
                  defaultValue="no"
                >
                  <Field
                    name="limitParticipate"
                    as={RadioButton}
                    label="yes"
                    value="yes"
                    control={<Radio color="primary" />}
                  />
                  <Field
                    name="limitParticipate"
                    as={RadioButton}
                    label="no"
                    value="no"
                    control={<Radio color="primary" />}
                  />
                </RadioGroup>
              </div>
            </div>

            {values.limitParticipate === "yes" && (
              <Field
                placeholder="Max Participate..."
                name="maxParticipate"
                type="number"
                label="Max Participate"
                variant="outlined"
                fullWidth
                as={Input}
                helperText={values.maxParticipate && errors["maxParticipate"]}
                error={
                  errors["maxParticipate"] && values.maxParticipate
                    ? true
                    : false
                }
                InputLabelProps={{
                  shrink: true,
                }}
              />
            )}
            {loadingLeagues ? (
              "Loading Leagues..."
            ) : (
              <Field
                name="league"
                select
                label="league"
                variant="outlined"
                fullWidth
                as={Input}
                helperText={blur.league && errors["league"]}
                error={blur.league && errors["league"] ? true : false}
                onBlur={(e: any) => {
                  setBlur((prev: GroupBlur) => ({
                    ...prev,
                    league: true,
                  }));
                }}
                InputLabelProps={{
                  shrink: true,
                }}
              >
                {data?.leagues?.map((league: League) => (
                  <MenuItem value={league._id} key={league._id}>
                    {league.name}
                  </MenuItem>
                ))}
              </Field>
            )}
            {loadingImage || loadingCreateGroup ? (
              <LoadingGif
                loading={loadingImage || loadingCreateGroup}
                size={50}
              />
            ) : (
              <>
                {image === "iconfinder_image_103588_ig40fo" ? (
                  <>
                    <DropzoneImage onDrop={onDrop} image={image} />
                  </>
                ) : (
                  <DropzoneImage onDrop={onDrop} image={image} />
                )}

                <SuccessButton
                  margin="0 20px 20px auto"
                  variant="contained"
                  color="primary"
                  type="submit"
                  padding="0.5em 1em"
                  background="rgb(28, 184, 65)"
                >
                  Save
                </SuccessButton>
              </>
            )}
          </Form>
        )}
      </Formik>
    </Dialog>
  );
};
