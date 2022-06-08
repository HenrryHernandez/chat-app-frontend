import { useDispatch } from "react-redux";

import { removeUserAction, logoutAction } from "../redux/states";

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
