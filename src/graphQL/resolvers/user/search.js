import UserStore from "../../store/user";
export const userSearchResolver = async (obj, args, req) => {
  const { email } = args;
  let user = await UserStore.findByEmail(email);
  if (user) return { success: true };
  return { success: true };
};
