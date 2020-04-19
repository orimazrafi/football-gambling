import React, { useState, useEffect } from "react";
import Modal from "react-modal";
import { Group } from "../../interfaces";
import { Image } from "../../elements/Image";
import { User } from "../../interfaces";
import { Input } from "../../elements/Input";
import { useMutation, useQuery } from "@apollo/react-hooks";
import gql from "graphql-tag";
import { confirmAlert } from "react-confirm-alert";
import "react-confirm-alert/src/react-confirm-alert.css";
import { useHistory } from "react-router-dom";
import { toast } from "react-toastify";
import "./GroupList.css";

const log = console.log;
interface Data {
  groups: Group[];
}
export const GroupList: React.FC<any> = ({ auth, name }) => {
  const { data, loading: loadingGroups } = useQuery<Data, Record<string, any>>(
    FETCH_GROUPS
  );
  const filteredArray = (data: any) =>
    data.groups.filter((group: Group) =>
      group.name.toLowerCase().trim().includes(name.toLocaleLowerCase().trim())
    );

  useEffect(() => {
    filteredArray(data);
  }, [name, data, filteredArray]);

  let id = localStorage.getItem("user_id");
  const history = useHistory();
  const [modalIsOpen, setModalIsOpen] = useState(false);
  const [error, setError] = useState({ message: "", num: 0 });
  const [password, setPassword] = useState("");
  const [modalValues, setModalValues] = useState({
    name: "",
    groupId: "",
    password: "",
    image: "",
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { value } = e.target;
    setPassword(value);
  };
  const handleJoinGroupWithPasssword = (
    name: string,
    groupId: string,
    password: string,
    image: string
  ) => {
    setModalValues({ name, groupId, password, image });
    setModalIsOpen(true);
    setPassword("");
  };
  const closeModal = () => {
    setModalIsOpen(false);
  };
  const handleJoinGroupWithOutPasssword = (groupName: string) => {
    confirmAlert({
      title: `Join the ${groupName}`,
      message: "Are you sure to do this?",

      buttons: [
        {
          label: "Yes",
          onClick: () => {
            joinGroup();
          },
        },
        {
          label: "No",
          onClick: () => {},
        },
      ],
    });
  };
  const [addUserToGroup, { loading: loadingAddUserToGroup }] = useMutation(
    ADD_USER_TO_GROUP,
    {
      update(proxy, result) {
        // setErrors("");
        // console.log(result.data.addUserToGroup);
        if (result.data.addUserToGroup) {
          setModalIsOpen(false);
        }
        toast.success("You were added to the group!");
      },
      onError(err) {
        log("error!!!!!");
        log(err);
        // setErrors(err.message);
      },
      variables: {
        userId: id,
        groupId: modalValues.groupId,
        groupPassword: modalValues.password,
      },
    }
  );
  const handleJoinGroup = () => {
    if (error.num === 5) {
      auth.logout();
    }
    if (password === modalValues.password) {
      log("password is correct!");
      joinGroup();
    } else {
      setError((prev) => ({
        message: "Password is incorrect",
        num: ++prev.num,
      }));
      log("password is incorrect!");
    }
  };
  const joinGroup = () => {
    addUserToGroup();
  };
  return (
    <>
      {loadingAddUserToGroup ? (
        <tr>
          <td>loadingAddUserToGroup...</td>
        </tr>
      ) : loadingGroups ? (
        <tr>
          <td>loading groups...</td>
        </tr>
      ) : (
        data &&
        filteredArray(data).map((group: Group) => (
          <tr key={group._id} style={{ fontSize: "12px" }}>
            <td>
              <Image
                src={`${process.env.REACT_APP_CLOUDINARY_IMAGE}${group.image}`}
                alt={group.name}
                noBoard
              />
            </td>
            <td className="group__name__cell"> {group.name}</td>
            <td>{group.users && group.users[0].name}</td>
            <td> {group.password ? group.password : "None"}</td>
            <td>
              {group.users && ` ${group.users.length}/${group.maxParticipate}`}
            </td>
            <td className="">
              {group.users &&
              group.maxParticipate &&
              group.users.findIndex((u: User) => u._id === id) === -1 &&
              group.users.length < group.maxParticipate ? (
                group.password ? (
                  <button
                    className="pure-button pure-button-primary small__join__group"
                    onClick={() =>
                      handleJoinGroupWithPasssword(
                        group.name,
                        group._id,
                        group.password,
                        group.image
                      )
                    }
                  >
                    Join
                  </button>
                ) : (
                  <button
                    className="pure-button pure-button-primary small__join__group"
                    onClick={() => {
                      setModalValues((prev) => ({
                        ...prev,
                        groupId: group._id,
                      }));
                      handleJoinGroupWithOutPasssword(group.name);
                    }}
                  >
                    Join
                  </button>
                )
              ) : (
                <button className="pure-button pure-button-disabled">
                  Join
                </button>
              )}
              <button
                className="button-success pure-button small__view__group"
                onClick={() => history.push("/score", group._id)}
              >
                View
              </button>
            </td>
          </tr>
        ))
      )}
      <>
        <Modal
          isOpen={modalIsOpen}
          shouldCloseOnOverlayClick={false}
          onRequestClose={closeModal}
          className="modal__password__confirmation"
        >
          <div>
            <button
              className="join__group__modal__close__btn"
              onClick={closeModal}
            >
              X
            </button>
            <h3 style={{ color: "black", textAlign: "center" }}>
              {" "}
              {modalValues.name}
            </h3>
          </div>

          <div className="join__group__modal__content__wrapper">
            <label>
              Password
              <Input
                placeholder="Password ..."
                name="password"
                type="text"
                value={password}
                onChange={handleChange}
                error={error.message}
              />
            </label>

            {error.message && error.num < 3 && (
              <div className="error__message__wrapper">{error.message}</div>
            )}
            {error.num === 3 && (
              <div className="error__message__wrapper">
                <strong>
                  {" "}
                  your account would be blocked if you will attempted for a
                  false password.
                </strong>
              </div>
            )}
            <img
              src={`${process.env.REACT_APP_CLOUDINARY_IMAGE}${modalValues.image}`}
              alt={modalValues.name}
              className="join__modal__password__image"
            />
            <button
              className="button-success pure-button btn__success__group__join"
              onClick={handleJoinGroup}
            >
              Join
            </button>
          </div>
        </Modal>
      </>
    </>
  );
};
const ADD_USER_TO_GROUP = gql`
  mutation addUserToGroup($userId: ID!, $groupId: ID!, $groupPassword: String) {
    addUserToGroup(
      userToGroup: {
        userId: $userId
        groupId: $groupId
        groupPassword: $groupPassword
      }
    ) {
      _id
    }
  }
`;
const FETCH_GROUPS = gql`
  query {
    groups {
      _id
      image
      name
      password
      admin
      maxParticipate
      users {
        _id
        name
      }
    }
  }
`;
