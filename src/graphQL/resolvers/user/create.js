const Store = require("../../store");
const createUserResolver = async (obj, args, req) => {
  try {
    const { name, image, email } = args.user;

    let user = await Store.findByEmail("users", email);
    if (user)
      return await Store.userResponse(
        true,
        "there is already user with that email",
        user
      );
    else {
      user = await Store.createUser(name, email, image);
      return Store.userResponse(true, "user created!", user.ops[0]);
    }

    {
    }
  } catch (err) {
    return Store.userResponse(false, err.message, user);
  }
};

module.exports = createUserResolver;
