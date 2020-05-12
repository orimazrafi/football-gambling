import { useDispatch } from "react-redux";
import { useState, useEffect } from "react";
import { BACKEND_URL } from "../helpers";
import { request } from "graphql-request";
import { reduxGetGroups } from "../Features/Group/GroupSlice";
import { toast } from "react-toastify";
import { FETCH_GROUPS } from "../queries";

export const useInitailgroupsFetch = () => {
  const dispatch = useDispatch();
  const [loading, setLoading] = useState(false);
  useEffect(() => {
    setLoading(true);
    request(BACKEND_URL, FETCH_GROUPS).then(async (data) => {
      try {
        await dispatch(reduxGetGroups(data.groups));
        setLoading(false);
        toast.success("Groups was fetched");
      } catch (ex) {
        setLoading(false);
        toast.error(ex.message);
      }
    });
  }, [dispatch]);
  return { loading };
};
