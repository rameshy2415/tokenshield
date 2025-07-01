import { createContext, useState } from "react";
import ToastContainer from "../components/tostMsg/ToastContainer";


export const TostMsgContext = createContext();

const TostMsgContextProvider = ({ Children }) => {
  const [toasts, setToasts] = useState([]);

  const addToast = (message, type = "success", duration = 5000) => {
    const id = Date.now() + Math.random();
    const newToast = { id, message, type, duration };

    setToasts((prev) => [...prev, newToast]);

    // Auto remove toast after duration
    setTimeout(() => {
      removeToast(id);
    }, duration);
  };

  const removeToast = (id) => {
    setToasts((prev) => prev.filter((toast) => toast.id !== id));
  };

  const showSuccess = (message, duration) =>
    addToast(message, "success", duration);
  const showError = (message, duration) => addToast(message, "error", duration);

  return (
    <>
      <TostMsgContext.Provider
        value={{ showSuccess, showError, addToast, removeToast }}
      >
        {Children}
        <ToastContainer toasts={toasts} removeToast={removeToast} />
      </TostMsgContext.Provider>
    </>
  );
};

export default TostMsgContextProvider;
