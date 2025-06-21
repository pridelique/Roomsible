import { toast } from "react-toastify";

const notifySuccess = (message) => {
  toast.success(message, {
    position: "top-right",
    hideProgressBar: false,
    closeOnClick: true,
    pauseOnHover: false,
    draggable: true,
    progress: undefined,
    theme: "light",
  });
};

export { notifySuccess };
