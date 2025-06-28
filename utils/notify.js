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

const notifyError = (message) => {
  toast.error(message, {
    position: "top-right",
    hideProgressBar: false,
    closeOnClick: true,
    pauseOnHover: false,
    draggable: true,
    progress: undefined,
    theme: "light",
  });
};

const notifyWaring = (message) => {
  toast.warning(message, {
    position: "top-right",
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
