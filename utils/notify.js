import { toast } from "react-toastify";

const notifySuccess = (message, position) => {
  toast.success(message, {
    position: position || "top-right",
    hideProgressBar: false,
    closeOnClick: true,
    pauseOnHover: false,
    draggable: true,
    progress: undefined,
    theme: "light",
  });
};

const notifyError = (message, position) => {
  toast.error(message, {
    position: position || "top-right",
    hideProgressBar: false,
    closeOnClick: true,
    pauseOnHover: false,
    draggable: true,
    progress: undefined,
    theme: "light",
  });
};

const notifyWaring = (message, position) => {
  toast.warning(message, {
    position: position || "top-right",
    autoClose: 1000,
    hideProgressBar: false,
    closeOnClick: true,
    pauseOnHover: false,
    draggable: true,
    progress: undefined,
    theme: "light",
  });
};

export { notifySuccess, notifyError, notifyWaring };
