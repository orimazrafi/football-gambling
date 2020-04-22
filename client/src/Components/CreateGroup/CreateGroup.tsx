import React, { useState, useCallback } from "react";
import Modal from "react-modal";
import { H2 } from "../../elements/H2";
import { Input } from "../../elements/Input";
import { Small } from "../../elements/SmallText";
import { Button } from "../../elements/Button";
import { DropzoneImage } from "../DropzoneImage/DropzoneImage";
import { UseFormData } from "../../Hooks/UseFormData";
import { UseCloudinaryUpload } from "../../Hooks/UseCloudinaryUpload";
import { Formik, Field, Form } from "formik";
import { useQuery } from "@apollo/react-hooks";
import gql from "graphql-tag";
import * as yup from "yup";
import { request } from "graphql-request";

import { GroupBlur } from "../../interfaces";
import { defualtGroupImage } from "../../helpers";
import { toast } from "react-toastify";
import { LoadingGif } from "../LoadingGif/LoadingGif";
import "./CreateGroup.css";
import { reduxSetGroup } from "../../Features/Group/GroupSlice";
import { useDispatch } from "react-redux";
import { PrimaryButton } from "../../elements/PrimaryButton";
import { RadioButton } from "../../elements/RadioButton";
import { Radio, RadioGroup } from "@material-ui/core";

Modal.setAppElement("#root");

// eslint-disable-next-line
const log = console.log;
interface Data {
  leagues: League[];
}
interface League {
  _id: string;
  name: string;
}
export const CreateGroup = () => {
  let { data, loading: loadingLeagues } = useQuery<Data, Record<string, any>>(
    FETCH_LEAGUES
  );
  if (
    data?.leagues.findIndex((l: League) => l.name === "Choose A League") === -1
  ) {
    data?.leagues.unshift({ _id: "", name: "Choose A League" });
  }

  const handleSubmit = (data: any, image: string) => {
    let group = {
      name: data.name,
      password: data.password,
      limitParticipate: data.limitParticipate,
      maxParticipate: data.maxParticipate,
      admin: localStorage.getItem("user_id") as string,
      image,
      league: data.league,
    };
    createGroup(group);
  };

  const [loadingImage, setLoadingImage] = useState(false);
  const [loadingCreateGroup, setLoadingCreateGroup] = useState(false);
  const [image, setImage] = useState(defualtGroupImage);
  const onDrop = useCallback(async (acceptedFiles: File[]) => {
    setLoadingImage(true);
    const formData = UseFormData(acceptedFiles[0]);
    const { data } = await UseCloudinaryUpload(formData);
    setImage(() => data.public_id);
    setLoadingImage(false);
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

  const [errors, setErrors] = useState("");
  const [modalIsOpen, setModalIsOpen] = useState(false);

  const dispatch = useDispatch();
  const createGroup = (group: any) => {
    setLoadingCreateGroup(true);
    const variables = { ...group };
    request("http://localhost:8080", CREATE_GROUP, variables).then(
      async (data) => {
        try {
          await dispatch(reduxSetGroup(data.createGroup));
          toast.success("Group was Added");
          setModalIsOpen(false);
          setLoadingCreateGroup(false);
        } catch (ex) {
          setLoadingCreateGroup(false);
          setErrors(ex.message);
          toast.success(ex.message);
        }
      }
    );
  };

  const [blur, setBlur] = useState<GroupBlur>({
    name: false,
    passwordConfirm: false,
  });
  const openModal = () => {
    setModalIsOpen(true);
    setBlur({ name: false, passwordConfirm: false });
  };
  const closeModal = () => {
    setModalIsOpen(false);
  };

  return (
    <>
      <PrimaryButton variant="contained" color="primary" onClick={openModal}>
        Add Group
      </PrimaryButton>

      <Modal
        isOpen={modalIsOpen}
        shouldCloseOnOverlayClick={false}
        onRequestClose={closeModal}
        style={{
          overlay: {
            background: "grey",
          },
          content: {
            color: "orange",
          },
        }}
      >
        <button className="close__button" onClick={closeModal}>
          X
        </button>
        <H2>Create new Group</H2>
        {errors && (
          <div style={{ textAlign: "center", color: "red" }}>
            {errors.slice(14)}
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
            handleSubmit(data, image);
          }}
        >
          {({ values, errors }) => (
            <Form>
              <Field
                placeholder="Group name..."
                name="name"
                type="input"
                fullWidth
                helperText={blur.name && errors["name"]}
                // helperText={blur.name && errors["name"]}
                label="Group name"
                autoFocus={true}
                InputLabelProps={{
                  shrink: true,
                }}
                variant="outlined"
                as={Input}
                onBlur={(e: any) => {
                  setBlur((prev: GroupBlur) => ({ ...prev, name: true }));
                }}
                error={blur.name && errors["name"] ? true : false}
              />
              <Field
                placeholder="Password..."
                name="password"
                type="input"
                fullWidth
                InputLabelProps={{
                  shrink: true,
                }}
                variant="outlined"
                as={Input}
                onBlur={(e: any) => {
                  setBlur((prev: GroupBlur) => ({ ...prev, name: true }));
                }}
                helperText={blur.name && errors["name"]}
              />
              <Field
                placeholder="Password Confirmation..."
                name="passwordConfirm"
                type="input"
                fullWidth
                label="Password Confirmation"
                InputLabelProps={{
                  shrink: true,
                }}
                variant="outlined"
                as={Input}
                onBlur={(e: any) => {
                  setBlur((prev: GroupBlur) => ({
                    ...prev,
                    passwordConfirm: true,
                  }));
                }}
                error={
                  blur.passwordConfirm &&
                  errors["passwordConfirm"] &&
                  values.password
                    ? true
                    : false
                }
                helperText={
                  blur.passwordConfirm &&
                  values.password &&
                  errors["passwordConfirm"] &&
                  "Both passwords must matched!"
                }
              />
              <div>
                <br />
                <label>
                  Max Participate
                  <div style={{ margin: "10px 0" }}>
                    <Small>
                      Do you want to limit the number of participates that allow
                      in this group?
                    </Small>
                    <RadioGroup
                      row
                      aria-label="position"
                      name="position"
                      defaultValue="top"
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
                    {/* <label>
                      Yes
                      <Field type="radio" value="yes" />
                    </label>
                    <label>
                      No
                      <Field name="limitParticipate" type="radio" value="no" />
                    </label> */}
                  </div>
                  {values.limitParticipate === "yes" && (
                    <Field
                      placeholder="Max number opf Participate..."
                      name="maxParticipate"
                      type="number"
                      as={Input}
                    />
                  )}
                </label>
              </div>
              {JSON.stringify(errors)}
              {loadingLeagues ? (
                "Loading..."
              ) : (
                <>
                  <div>
                    <label>League</label>
                  </div>
                  <Field
                    as="select"
                    name="league"
                    placeholder="Choose You'r League"
                    style={{
                      width: "100%",
                      padding: "12px 20px",
                      margin: "8px 0",
                      border: "1px solid #ccc",
                      display: "inline-block",
                      borderRadius: "4px",
                      boxSizing: "border-box",
                    }}
                  >
                    >
                    {data?.leagues?.map((league: League) => (
                      <option value={league._id} key={league._id}>
                        {league.name}
                      </option>
                    ))}
                  </Field>
                </>
              )}
              {loadingImage || loadingCreateGroup ? (
                <LoadingGif
                  loading={loadingImage || loadingCreateGroup}
                  size={50}
                />
              ) : (
                <>
                  <DropzoneImage onDrop={onDrop} image={image} />
                  <Button type="submit" small floatRight>
                    save
                  </Button>
                </>
              )}
            </Form>
          )}
        </Formik>
      </Modal>
    </>
  );
};
// const CREATE_GROUP = gql`
//   mutation createGroup(
//     $name: String!
//     $password: String
//     $limitParticipate: String!
//     $maxParticipate: Int!
//     $admin: ID!
//     $image: String!
//     $league: ID!
//   ) {
//     createGroup(
//       group: {
//         name: $name
//         password: $password
//         limitParticipate: $limitParticipate
//         maxParticipate: $maxParticipate
//         admin: $admin
//         image: $image
//         league: $league
//       }
//     ) {
//       _id
//       admin
//       name
//       limitParticipate
//       maxParticipate
//       image
//       password
//     }
//   }
// `;

const CREATE_GROUP = `
mutation createGroup(
  $name: String!
  $password: String
  $limitParticipate: String!
  $maxParticipate: Int!
  $admin: ID!
  $image: String!
  $league: ID!
) {
  createGroup(
    group: {
      name: $name
      password: $password
      limitParticipate: $limitParticipate
      maxParticipate: $maxParticipate
      admin: $admin
      image: $image
      league: $league
    }
  ) {
    _id
    admin
    name
    maxParticipate
    image
    password
    users {
      _id
      name
    }
  }
}
`;

const FETCH_LEAGUES = gql`
  query {
    leagues {
      _id
      name
    }
  }
`;
