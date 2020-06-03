import UserStore from "../../store/user";
export const addFirebaseMessageTokenResolver = async (obj, args, req) => {
  const { token, userId } = args;
  await UserStore.updateUserMessageToken(userId, token);
  return { success: true };
};
