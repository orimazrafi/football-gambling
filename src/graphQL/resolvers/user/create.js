const UserStore = require("../../store/user");
const createUserResolver = async (obj, args, req) => {
  try {
    const { name, image, email } = args.user;

    let user = await UserStore.findByEmail(email);
    if (user)
      return await UserStore.response(
        true,
        "there is already user with that email",
        user
      );
    else {
      user = await UserStore.create(name, email, image);
      return UserStore.response(true, "user created!", user.ops[0]);
    }

    {
    }
  } catch (err) {
    return UserStore.response(false, err.message, user);
  }
};

module.exports = createUserResolver;
