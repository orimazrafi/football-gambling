import React, { useState, useCallback, useEffect } from "react";
import Modal from "react-modal";
import { H2 } from "../../elements/H2";
import { Input } from "../../elements/Input";
import { Small } from "../../elements/SmallText";
import { Button } from "../../elements/Button";
import { DropzoneImage } from "../DropzoneImage/DropzoneImage";
import { UseFormData } from "../../Hooks/UseFormData";
import { UseCloudinaryUpload } from "../../Hooks/UseCloudinaryUpload";
import { Formik, Field, Form } from "formik";
import { useMutation } from "@apollo/react-hooks";
import gql from "graphql-tag";
import * as yup from "yup";
import { GroupBlur } from "../../interfaces";
import { defualtGroupImage } from "../../helpers";
import { css } from "@emotion/core";
import { ClipLoader } from "react-spinners";
import "./CreateGroup.css";

const override = css`
  display: block;
  justify-content: flex-end;
`;
Modal.setAppElement("#root");
// eslint-disable-next-line

const log = console.log;

const validateSchema = yup.object({
  name: yup.string().required().min(3).max(15),
  password: yup.string(),
  passwordConfirm: yup.string().when("password", {
    is: (password: string) => password,
    then: yup
      .string()
      .required("Password Confirm must be the same as password.")
      .oneOf([yup.ref("password"), null]),
  }),
  maxParticipate: yup.number().min(2).max(256),
});

export const CreateGroup = () => {
  useEffect(() => {
    setUserId(localStorage.getItem("user_id") as string);
  }, []);
  const [userId, setUserId] = useState("");
  const [errors, setErrors] = useState("");
  const [image, setImage] = useState(defualtGroupImage);
  const [modalIsOpen, setModalIsOpen] = useState(false);
  const [group, setGroup] = useState({
    name: "",
    password: "",
    limitParticipate: "no",
    maxParticipate: 256,
    admin: "",
    image: defualtGroupImage,
  });
  const [blur, setBlur] = useState<GroupBlur>({
    name: false,
    passwordConfirm: false,
  });
  const handleSubmit = (data: any, image: string) => {
    log(data, image);
    setGroup(() => ({
      name: data.name,
      password: data.password,
      limitParticipate: data.limitParticipate,
      maxParticipate: data.maxParticipate,
      admin: userId,
      image,
    }));
    createGroup();
  };
  const [createGroup, { loading }] = useMutation(CREATE_GROUP, {
    update(proxy, result) {
      setErrors("");
      console.log(result.data.createGroup._id);
      if (result.data.createGroup._id) {
        setModalIsOpen(false);
      }
    },
    onError(err) {
      setErrors(err.message);
    },
    variables: { ...group },
  });

  const onDrop = useCallback(async (acceptedFiles: File[]) => {
    const formData = UseFormData(acceptedFiles[0]);
    const { data } = await UseCloudinaryUpload(formData);
    setImage(() => data.public_id);
  }, []);
  const openModal = () => {
    setModalIsOpen(true);
    setBlur({ name: false, passwordConfirm: false });
  };
  const closeModal = () => {
    setModalIsOpen(false);
  };

  return (
    <>
      <button className="button-secondary" onClick={openModal}>
        {" "}
        Add Group
      </button>

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
          }}
          validationSchema={validateSchema}
          onSubmit={(data: any) => {
            handleSubmit(data, image);
          }}
        >
          {({ values, errors }) => (
            <Form>
              <div>
                <label>
                  Group name
                  <Field
                    placeholder="Group name..."
                    name="name"
                    type="input"
                    as={Input}
                    autoFocus={true}
                    onBlur={(e: any) => {
                      setBlur((prev: GroupBlur) => ({ ...prev, name: true }));
                    }}
                    displayError={blur.name && errors["name"]}
                  />
                </label>
                <div style={{ color: "red", marginBottom: "8px" }}>
                  {blur.name && errors["name"]}
                </div>
              </div>
              <>
                <div>
                  <label>
                    Password
                    <div style={{ textAlign: "center" }}></div>
                    <Field
                      placeholder="Password..."
                      name="password"
                      type="input"
                      as={Input}
                    />
                    <Small>
                      if password will not supllied you'r group is going to be
                      public and anyone could enter it...{" "}
                    </Small>
                  </label>
                </div>
                <div>
                  <label>
                    Password Confirmation
                    <Field
                      placeholder="Password Confirmation..."
                      name="passwordConfirm"
                      type="input"
                      as={Input}
                      displayError={
                        blur.passwordConfirm &&
                        values.password &&
                        errors["passwordConfirm"]
                      }
                      onBlur={(e: any) => {
                        setBlur((prev: GroupBlur) => ({
                          ...prev,
                          passwordConfirm: true,
                        }));
                      }}
                    />
                  </label>
                </div>
                <div style={{ color: "red", marginBottom: "8px" }}>
                  {blur.passwordConfirm &&
                    values.password &&
                    errors["passwordConfirm"]}
                </div>
              </>

              <div>
                <br />

                <label>
                  Max Participate
                  <div style={{ margin: "10px 0" }}>
                    <Small>
                      Do you want to limit the number of participates that allow
                      in this group?
                    </Small>
                    <label>
                      Yes
                      <Field name="limitParticipate" type="radio" value="yes" />
                    </label>
                    <label>
                      No
                      <Field name="limitParticipate" type="radio" value="no" />
                    </label>
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
              <DropzoneImage onDrop={onDrop} image={image} />
              {loading ? (
                <div style={{ float: "right" }}>
                  <ClipLoader
                    css={override}
                    size={50}
                    color={"#123abc"}
                    loading={loading}
                  />
                </div>
              ) : (
                <Button type="submit" small floatRight>
                  save
                </Button>
              )}
            </Form>
          )}
        </Formik>
      </Modal>
    </>
  );
};
const CREATE_GROUP = gql`
  mutation createGroup(
    $name: String!
    $password: String
    $limitParticipate: String!
    $maxParticipate: Int!
    $admin: ID!
    $image: String!
  ) {
    createGroup(
      group: {
        name: $name
        password: $password
        limitParticipate: $limitParticipate
        maxParticipate: $maxParticipate
        admin: $admin
        image: $image
      }
    ) {
      _id
    }
  }
`;
