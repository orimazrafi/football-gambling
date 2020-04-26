const Store = require("../../store");
const userSearchResolver = async (obj, args, req) => {
  try {
    const { email } = args.user;

    let user = await Store.findByEmail("users", email);
    if (!user) return { success: true };
    return { success: false };
  } catch (err) {
    return { success: false };
  }
};

module.exports = userSearchResolver;
