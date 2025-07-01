import { useContext } from "react";
import { TostMsgContext } from "../context/TostMsgContext";


export const useToast = () => {
  const context = useContext(TostMsgContext);
  if (!context) {
    throw new Error('useToast must be used within a ToastProvider');
  }
  return context;
};