import React from "react";

import { request } from "graphql-request";
import { LoadingGif } from "../../Components/LoadingGif/LoadingGif";
import { SEARCH_USER } from "../../queries";
import { BACKEND_URL } from "../../helpers";
import { useFetchUser } from "../../Hooks/useFetchUser";
import { useCreateUser } from "../../Hooks/useCreateUser";

interface Props {
  email: string;
  name: string;
  image: string;
}
export const Secret = (props: Props) => {
  const { email, name, image } = props;
  const variables = {
    name,
    email,
    image,
  };

  request(BACKEND_URL, SEARCH_USER, { email: email }).then(async (data) => {
    if (data.search.success) {
      fetchUser();
    }
    createUser();
  });
  const fetchUser = useFetchUser(variables);

  const createUser = useCreateUser(variables);

  return (
    <div className="secret--page">
      <div className="secret--page__inner__wrapper">
        <h1>Fetching user...</h1>
        <LoadingGif loading={true} size={150} />
      </div>
    </div>
  );
};
