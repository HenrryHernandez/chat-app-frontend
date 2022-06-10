import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { AccountCircle } from "@mui/icons-material";

import { AppStore } from "../models";
import { logoutAction, removeUserAction } from "../redux/states";

export const Main = () => {
  const { username } = useSelector((state: AppStore) => state.user);
  const dispatch = useDispatch();
  const [showUserOptions, setShowUserOptions] = useState(false);

  const logout = () => {
    dispatch(logoutAction());
    dispatch(removeUserAction());

    localStorage.removeItem("token");
    localStorage.removeItem("userId");
  };

  const toggleUserOptions = () => {
    setShowUserOptions((prev) => !prev);
  };

  return (
    <div className="main">
      <div style={{ backgroundColor: "blue" }} className="main__information">
        <AccountCircle />
        {username}
        <button onClick={toggleUserOptions}>Display options</button>
        {showUserOptions ? (
          <>
            <button>Search</button>
            <button onClick={logout}>Logout</button>
          </>
        ) : null}
      </div>
      <div style={{ backgroundColor: "green" }} className="main__chats"></div>
      <div
        style={{ backgroundColor: "yellow" }}
        className="main__chat-information"
      ></div>
      <div
        style={{ backgroundColor: "orange" }}
        className="main__chat-screen"
      ></div>
      <div style={{ backgroundColor: "pink" }} className="main__keyboard"></div>
    </div>
  );
};
