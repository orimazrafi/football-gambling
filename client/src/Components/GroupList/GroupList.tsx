import React, { useState } from "react";
import Modal from "react-modal";
import { Group } from "../../interfaces";
import { Image } from "../../elements/Image";
import { User } from "../../interfaces";
import { Input } from "../../elements/Input";
import { confirmAlert } from "react-confirm-alert";
import { useHistory } from "react-router-dom";
import { toast } from "react-toastify";
import { request } from "graphql-request";
import { useDispatch } from "react-redux";
import { reduxSetGroup } from "../../Features/Group/GroupSlice";
import "react-confirm-alert/src/react-confirm-alert.css";
import "./GroupList.css";

// eslint-disable-next-line
const log = console.log;

export const GroupList: React.FC<{
  auth: any;
  groups: Group[];
}> = ({ auth, groups }) => {
  log(groups);
  const history = useHistory();

  const [password, setPassword] = useState("");
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { value } = e.target;
    setPassword(value);
  };
  const [groupInput, setGroupInput] = useState({
    name: "",
    userId: "",
    groupId: "",
    password: "",
    image: "",
  });

  const [modalIsOpen, setModalIsOpen] = useState(false);
  const handleJoinGroupWithPasssword = (groupInput: any) => {
    setGroupInput((prev: any) => ({
      ...prev,
      name: groupInput.name,
      groupId: groupInput.groupId,
      password: groupInput.password,
      image: groupInput.image,
    }));
    setModalIsOpen(true);
    setPassword("");
  };
  const closeModal = () => {
    setModalIsOpen(false);
  };
  const handleJoinGroupWithOutPasssword = (group: any) => {
    confirmAlert({
      title: `Join the ${group.name}`,
      message: "Are you sure to do this?",

      buttons: [
        {
          label: "Yes",
          onClick: () => {
            addUserToGroup(group);
          },
        },
        {
          label: "No",
          onClick: () => {},
        },
      ],
    });
  };

  const dispatch = useDispatch();
  const [loadingAddUserToGroup, setLoadingAddUserToGroup] = useState(false);
  const addUserToGroup = (group: any) => {
    setLoadingAddUserToGroup(true);
    const variables = {
      userId: localStorage.getItem("user_id") as string,
      groupId: group.groupId,
      groupPassword: group.password,
    };
    request("http://localhost:8080", ADD_USER_TO_GROUP, variables).then(
      async (data) => {
        log(data);
        try {
          await dispatch(reduxSetGroup(data.addUserToGroup));
          setModalIsOpen(false);
          toast.success("You were added to the group!");
          setLoadingAddUserToGroup(false);
        } catch (ex) {
          toast.error(ex.message);
          setLoadingAddUserToGroup(false);
        }
      }
    );
  };

  const [error, setError] = useState({ message: "", num: 0 });

  const handleJoinGroup = () => {
    log(groupInput);
    if (error.num === 5) {
      auth.logout();
    }
    if (password === groupInput.password) addUserToGroup(groupInput);
    else
      setError((prev) => ({
        message: "Password is incorrect",
        num: ++prev.num,
      }));
  };

  return (
    <>
      {loadingAddUserToGroup ? (
        <tr>
          <td>loadingAddUserToGroup...</td>
        </tr>
      ) : (
        groups?.map((group: Group) => (
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
              group.users.findIndex(
                (user: User) =>
                  user._id === (localStorage.getItem("user_id") as string)
              ) === -1 &&
              group.users.length < group.maxParticipate ? (
                group.password ? (
                  <button
                    className="pure-button pure-button-primary small__join__group"
                    onClick={() => {
                      let groupInput = {
                        name: group.name,
                        groupId: group._id,
                        password: group.password,
                        image: group.image,
                      };
                      handleJoinGroupWithPasssword(groupInput);
                    }}
                  >
                    Join
                  </button>
                ) : (
                  <button
                    className="pure-button pure-butston-primary small__join__group"
                    onClick={() => {
                      let groupInput = {
                        name: group.name,
                        groupId: group._id,
                        password: group.password,
                        image: group.image,
                      };
                      handleJoinGroupWithOutPasssword(groupInput);
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
              {groupInput.userId}
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
              src={`${process.env.REACT_APP_CLOUDINARY_IMAGE}${groupInput.image}`}
              alt={groupInput.name}
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
const ADD_USER_TO_GROUP = `
  mutation addUserToGroup($userId: ID!, $groupId: ID!, $groupPassword: String) {
    addUserToGroup(
      userToGroup: {
        userId: $userId
        groupId: $groupId
        groupPassword: $groupPassword
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
