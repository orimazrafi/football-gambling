const UserStore = require("../../store/user");
const userSearchResolver = async (obj, args, req) => {
  try {
    const { email } = args.user;

    let user = await UserStore.findByEmail(email);
    if (!user) return { success: true };
    return { success: false };
  } catch (err) {
    return { success: false };
  }
};

module.exports = userSearchResolver;
