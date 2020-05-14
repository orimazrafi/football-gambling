import React from "react";
import { Input } from "../../elements/Input";
import { SmallText } from "../../elements/SmallText";
import { DropzoneImage } from "../DropzoneImage/DropzoneImage";
import { Formik, Field, Form } from "formik";
import { LoadingGif } from "../LoadingGif/LoadingGif";
import { RadioButton } from "../../elements/RadioButton";
import { Radio, RadioGroup, MenuItem } from "@material-ui/core";
import { SuccessButton } from "../../elements/SuccessButton";
import { useCheckForDuplicateGroupName } from "../../Hooks/useCheckForDuplicateGroupName";
import { Group, GroupBlur } from "../../interfaces";

interface Data {
  leagues: League[];
}
interface League {
  _id: string;
  name: string;
  label?: string;
}
interface Props {
  validateSchema: any;
  onSubmit: (groupInput: Group, image: string) => void;
  image: string;
  open: boolean;
  handelNameBlur: () => void;
  handlePasswordConfirmBlur: () => void;
  blur: GroupBlur;
  handleLeagueBlur: () => void;
  loadingLeagues: boolean;
  data: Data | undefined;
  loadingImage: boolean;
  loadingCreateGroup: boolean;
  onDrop: (acceptedFiles: File[]) => Promise<void>;
}
export const GroupModalForm = (props: Props) => {
  const {
    validateSchema,
    onSubmit,
    image,
    open,
    handelNameBlur,
    handlePasswordConfirmBlur,
    blur,
    handleLeagueBlur,
    loadingLeagues,
    data,
    loadingImage,
    loadingCreateGroup,
    onDrop,
  } = props;
  const { groupName, handleGroupName } = useCheckForDuplicateGroupName(open);

  return (
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
            onBlur={() => {
              handleGroupName(values["name"]);
              handelNameBlur();
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
            onBlur={() => {
              handlePasswordConfirmBlur();
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
            onBlur={() => {
              handleLeagueBlur();
            }}
            InputLabelProps={{
              shrink: true,
            }}
          />
          <div className="group--modal__max__participate__outer__wrapper">
            Max Participate
            <div className="group--modal__max__participate__inner__wrapper">
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
                errors["maxParticipate"] && values.maxParticipate ? true : false
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
              onBlur={() => {
                handleLeagueBlur();
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
  );
};
