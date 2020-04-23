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
import Dialog from "@material-ui/core/Dialog";
import { ModalDialog } from "../../elements/ModalDialog";
import TableRow from "@material-ui/core/TableRow";
import { GroupCell } from "../../elements/GroupCell";
import "./GroupList.css";
import { SuccessButton } from "../../elements/SuccessButton";
import { TableButton } from "../../elements/TableButton";
import { Button } from "@material-ui/core";

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
          if (!data.addUserToGroup.success) {
            setLoadingAddUserToGroup(false);
            return toast.error(data.addUserToGroup.message);
          }
          await dispatch(reduxSetGroup(data.addUserToGroup.group));
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
        <TableRow>
          <GroupCell fontSize="1em" fontWeight="bold">
            loadingAddUserToGroup...
          </GroupCell>
        </TableRow>
      ) : (
        groups?.map((group: Group) => (
          <TableRow key={group._id}>
            <GroupCell fontSize="12px" fontWeight="normal">
              {" "}
              <Image
                src={`${process.env.REACT_APP_CLOUDINARY_IMAGE}${group.image}`}
                alt={group.name}
                noBoard
              />
            </GroupCell>
            <GroupCell fontSize="12px" fontWeight="normal">
              {" "}
              {group.name}
            </GroupCell>
            <GroupCell fontSize="12px" fontWeight="normal">
              {group.users && group.users[0].name}
            </GroupCell>
            <GroupCell fontSize="12px" fontWeight="normal">
              {" "}
              {group.password ? group.password : "None"}
            </GroupCell>
            <GroupCell fontSize="12px" fontWeight="normal">
              {group.users && ` ${group.users.length}/${group.maxParticipate}`}
            </GroupCell>
            <GroupCell fontSize="12px" fontWeight="normal">
              {group.users &&
              group.maxParticipate &&
              group.users.findIndex(
                (user: User) =>
                  user._id === (localStorage.getItem("user_id") as string)
              ) === -1 &&
              group.users.length < group.maxParticipate ? (
                group.password ? (
                  <TableButton
                    variant="contained"
                    color="primary"
                    background="#0000ff"
                    backgroundhover="#3f51b5"
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
                  </TableButton>
                ) : (
                  <TableButton
                    variant="contained"
                    color="primary"
                    background="blue"
                    backgroundhover="rgba(0, 0, 0, 0.12)"
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
                  </TableButton>
                )
              ) : (
                <TableButton
                  variant="contained"
                  background="rgba(0, 0, 0, 0.12)"
                  backgroundhover="rgba(0, 0, 0, 0.12)"
                  disabled
                >
                  Join
                </TableButton>
              )}
              <TableButton
                background="rgb(28, 184, 65)"
                backgroundhover="rgb(5, 236, 60)"
                onClick={() => history.push("/score", group._id)}
              >
                View
              </TableButton>
              {/* <button
                className="button-success pure-button small__view__group"
                onClick={() => history.push("/score", group._id)}
              >
                View
              </button> */}
            </GroupCell>
          </TableRow>
        ))
      )}
      <>
        <ModalDialog
          onClose={closeModal}
          aria-labelledby="simple-dialog-title"
          open={modalIsOpen}
          className="dialog--group"
        >
          <div>
            <h3 style={{ color: "black", textAlign: "center" }}>
              {" "}
              {groupInput.name}
            </h3>

            {/* <div className="join__group__modal__content__wrapper"> */}
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
              InputLabelProps={{
                shrink: true,
              }}
            />

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
              className="dialog--group__image"

              // className="join__modal__password__image"
            />

            <SuccessButton
              margin="0 0 0 auto"
              variant="contained"
              color="primary"
              padding="0.75em 1.7em"
              onClick={handleJoinGroup}
            >
              Join
            </SuccessButton>
          </div>
        </ModalDialog>
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
      success
      message
      group{
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
  }
`;
