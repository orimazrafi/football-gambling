import { useState } from "react";
import { toast } from "react-toastify";
import { request } from "graphql-request";
import { reduxSetGroup } from "../Features/Group/GroupSlice";
import { useDispatch } from "react-redux";
import { imageIcon, defualtImage, BACKEND_URL } from "../helpers";
import { Group } from "../interfaces";
import { CREATE_GROUP } from "../mutations";

export const useCreateGroup = (
  setOpen: React.Dispatch<React.SetStateAction<boolean>>
) => {
  const [loadingCreateGroup, setLoadingCreateGroup] = useState(false);

  const [errors, setErrors] = useState("");
  const handleSubmit = (groupInput: Group, image: string) => {
    const {
      name,
      password,
      limitParticipate,
      maxParticipate,
      league,
    } = groupInput;
    let group = {
      name,
      password,
      limitParticipate,
      maxParticipate,
      admin: localStorage.getItem("user_id") as string,
      image: image === imageIcon ? defualtImage : image,
      league,
    };
    createGroup(group);
  };

  const dispatch = useDispatch();
  const createGroup = (group: Group) => {
    setLoadingCreateGroup(true);
    const variables = { ...group };
    request(BACKEND_URL, CREATE_GROUP, variables).then(async (data) => {
      try {
        if (!data.createGroup.success) {
          setLoadingCreateGroup(false);
          return setErrors(data.createGroup.message);
        }

        await dispatch(reduxSetGroup(data.createGroup.group));
        toast.success("Group was Added");
        setOpen(false);
        setLoadingCreateGroup(false);
      } catch (err) {
        setLoadingCreateGroup(false);
        setErrors(data.createGroup.message);
        toast.success(data.createGroup.message);
      }
    });
  };

  return { handleSubmit, loadingCreateGroup, errors };
};
