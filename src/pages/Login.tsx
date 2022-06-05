import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";

import { AuthState, login } from "./../redux/states/auth";

const initState: AuthState = {
  isAuthenticated: true,
  user: {
    username: "henrry",
    _id: "alsdjlasd",
    groups: ["chat 1"],
  },
  token: "aspdj2pjpo2j3p",
};

export const Login = () => {
  const dispatch = useDispatch();
  const navigator = useNavigate();

  const goToMain = () => {
    navigator("/");
  };

  const login2 = () => {
    dispatch(login(initState));
  };

  const goToAny = () => {
    navigator("/about");
  };

  return (
    <div>
      <button onClick={login2}>Login</button>
      <button onClick={goToMain}>try to go to main</button>
      <button onClick={goToAny}>try to go to any</button>
    </div>
  );
};
