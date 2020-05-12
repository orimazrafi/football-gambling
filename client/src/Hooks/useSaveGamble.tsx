import { UseGambleMutation } from "./UseGambleMutation";
import { toast } from "react-toastify";

export const useSaveGamble = (user: any) => {
  const handleSave = async () => {
    const [data] = await UseGambleMutation(user);
    if (data.addGamble.success) {
      return toast.success(data.addGamble.message);
    }
    return toast.error(data.addGamble.message);
  };
  return { handleSave };
};
