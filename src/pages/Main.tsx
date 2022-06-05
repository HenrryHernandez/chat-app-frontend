import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

import { AuthState, logout } from "../redux/states/auth";

import { ChatCard } from "../components/ChatCard";
import { InformationCard } from "../components/InformationCard";
import { InputText } from "../components/InputText";

export const Main = () => {
  const dispatch = useDispatch();
  const authState = useSelector((state: AuthState) => state);
  const navigator = useNavigate();

  const logout2 = () => {
    dispatch(logout());
  };

  const goToLogin = () => {
    navigator("/auth/login");
  };

  const goToAny = () => {
    navigator("/about");
  };

  return (
    <div className="main">
      <div style={{ backgroundColor: "blue" }} className="main__information">
        <InformationCard />
      </div>
      <div style={{ backgroundColor: "green" }} className="main__chats">
        <ChatCard />
        <ChatCard />
        <ChatCard />
        <ChatCard />
      </div>
      <div
        style={{ backgroundColor: "yellow" }}
        className="main__chat-information"
      >
        <InformationCard />
      </div>
      <div style={{ backgroundColor: "orange" }} className="main__chat-screen">
        <pre>{JSON.stringify(authState)}</pre>
        <button onClick={logout2}>Logout</button>
        <button onClick={goToLogin}>try to go to login</button>
        <button onClick={goToAny}>try to go to any</button>
      </div>
      <div style={{ backgroundColor: "pink" }} className="main__keyboard">
        <InputText />
      </div>
    </div>
  );
};
