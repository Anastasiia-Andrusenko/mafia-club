import { toast } from "react-toastify";

export const notify = (isSuccess: boolean, message: string) => {
  if (isSuccess) {
    toast.success(message);
  } else {
    toast.error(message);
  }
};
