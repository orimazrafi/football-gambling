const Store = require("../../store");
const getUserIdResolver = async (obj, args, req) => {
  try {
    const { name, image, email } = args.user;

    let userResponse = await Store.findByEmail("users", email);
    console.log(userResponse);
    if (!userResponse) {
      //   const firstLoggedUser = await Store.initialUser(name, email, image);
      //   return Store.userResponse(
      //     true,
      //     "user created for first!",
      //     firstLoggedUser.ops[0]
      //   );
      console.log("userResponse");

      return await Store.userResponse(
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

    // else {
    return await Store.userResponse(true, "user was fetched!", userResponse);
    // }
  } catch (err) {
    return Store.userResponse(false, err.message, userResponse);
  }
};

module.exports = getUserIdResolver;
