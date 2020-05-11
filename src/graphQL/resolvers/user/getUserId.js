import UserStore from "../../store/user";
export const getUserIdResolver = async (obj, args, req) => {
  try {
    const { email } = args.user;

    let userResponse = await UserStore.findByEmail(email);
    if (!userResponse) {
      return await UserStore.response(
        false,
        "there is no user with that email",
        {
          _id: null,
          name: undefined,
          image: undefined,
          groups: [],
          results: [],
        }
      );
    }

    return await UserStore.response(true, "user was fetched!", userResponse);
  } catch (err) {
    return UserStore.response(false, err.message, userResponse);
  }
};
