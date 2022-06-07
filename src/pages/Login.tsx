import { useEffect } from "react";
import { useDispatch } from "react-redux";

import useRequestAndLoad from "../hooks/useRequestAndLoad";
import { CustomResponse, LoginInformation } from "../models/response.model";
import { loginAction } from "./../redux/states/auth";
import { loginService } from "./../services/auth.service";

export const Login = () => {
  const { loading, makeCallRequest } = useRequestAndLoad();
  const dispatch = useDispatch();

  const login = async () => {
    try {
      const { data }: CustomResponse<LoginInformation> = await makeCallRequest(
        loginService("user_1", "asdjo")
      );

      dispatch(loginAction({ isAuthenticated: true, ...data.user }));
    } catch (error) {
      //TODO: add error handler
    }
  };

  useEffect(() => {
    console.log(loading);
  }, [loading]);

  return (
    <div>
      <button onClick={login}>Login</button>
    </div>
  );
};
