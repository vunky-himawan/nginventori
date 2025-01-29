import { Slide, toast as toastify, TypeOptions } from "react-toastify";

interface ToastOptions {
  title: string;
  type?: TypeOptions;
}

export const toast = ({ title, type = "default" }: ToastOptions) => {
  toastify(title, {
    type,
    className: "rounded-md shadow mt-5 w-full lg:w-max",
    closeButton: false,
    autoClose: 1000,
    hideProgressBar: true,
    position: "top-center",
    transition: Slide,
  });
};
