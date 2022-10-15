import React from "react";
import { toast } from "react-toastify";
import ToastContext from "./toastContext";
import "react-toastify/dist/ReactToastify.css";

const ToastState = (props) => {

  const toastSuccess = (msg) => {
    toast.success(`${msg}`, {
      position: "bottom-left",
      autoClose: 5000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      // progress: ,
      theme: "light",
    });
  };
  const toastError = (msg) => {
    toast.error(`${msg}`, {
      position: "bottom-left",
      autoClose: 5000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      // progress: ,
      theme: "light",
    });
  };
  return (
    <ToastContext.Provider value={{ toastSuccess, toastError }}>
      {props.children}
    </ToastContext.Provider>
  );
};

export default ToastState;
