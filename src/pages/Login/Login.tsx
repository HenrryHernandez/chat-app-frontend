import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";

import { useInterceptors, useRequestAndLoad } from "../../hooks";
import { CustomResponse, LoginInformation } from "../../models";
import { loginAction, setUserAction } from "../../redux/states";
import { loginService, getUser } from "../../services";

export const Login = () => {
  const [username, setUsername] = useState("user_1");
  const [password, setPassword] = useState("asdjo");

  const dispatch = useDispatch();

  const { loading, makeCallRequest } = useRequestAndLoad();
  const interceptorToken = useInterceptors();

  const login = async () => {
    try {
      const { data }: CustomResponse<LoginInformation> = await makeCallRequest(
        loginService(username, password)
      );

      dispatch(loginAction({ isAuthenticated: true, token: data.token }));
      dispatch(
        setUserAction({
          username: data.user.username,
          chats: data.user.chats,
          id: data.user._id,
        })
      );

      localStorage.setItem("token", data.token);
      localStorage.setItem("userId", data.user._id);
    } catch (error) {
      //TODO: add error handler
    }
  };

  useEffect(() => {
    const userId = localStorage.getItem("userId");
    if (!userId) return;

    makeCallRequest(getUser(userId))
      .then(({ data }) => {
        dispatch(loginAction({ isAuthenticated: true }));
        dispatch(setUserAction({ ...data.user }));
      })
      .catch((error) => {
        //TODO: add error handler
      });
  }, [dispatch, interceptorToken, makeCallRequest]);

  if (loading) return <div>loading</div>;

  return (
    <div className="login">
      <div className="login__container">
        <input value={username} onChange={(e) => setUsername(e.target.value)} />
        <input
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <button onClick={login}>Login</button>
      </div>
    </div>
  );
};
