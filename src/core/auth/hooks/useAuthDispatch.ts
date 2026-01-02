import { useContext } from "react";
import { AuthDispatchContext } from "../contexts/AuthContext";

export const useAuthDispatch = () => {
  const dispatch = useContext(AuthDispatchContext);
  if (!dispatch) {
    throw new Error("useAuthDispatch must be used within an AuthProvider");
  }
  return dispatch;
};
