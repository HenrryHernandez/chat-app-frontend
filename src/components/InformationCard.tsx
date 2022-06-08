import { useDispatch } from "react-redux";

import { logoutAction } from "../redux/states/auth";
import { removeUserAction } from "../redux/states/user";

export const InformationCard = () => {
  const dispatch = useDispatch();

  const logout = () => {
    dispatch(logoutAction());
    dispatch(removeUserAction());

    localStorage.removeItem("token");
    localStorage.removeItem("userId");
  };

  return (
    <div>
      <button onClick={logout}>Logout</button>
    </div>
  );
};
