import { useSelector } from "react-redux";
import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";

import { PrivateRouter } from "./PrivateRouter";
import { PublicRouter } from "./PublicRouter";
import { AppStore } from "../models";
import { Login, Main } from "../pages";

export const MainRouter = () => {
  const { isAuthenticated } = useSelector((state: AppStore) => state.auth);

  return (
    <BrowserRouter>
      <Routes>
        <Route
          path="/"
          element={<PrivateRouter isAuthenticated={isAuthenticated} />}
        >
          <Route path="" element={<Main />}></Route>

          <Route path="*" element={<Navigate replace to="/" />}></Route>
        </Route>

        <Route
          path="/auth"
          element={<PublicRouter isAuthenticated={isAuthenticated} />}
        >
          <Route path="login" element={<Login />}></Route>

          <Route
            path="*"
            element={<Navigate replace to="/auth/login" />}
          ></Route>
        </Route>

        <Route path="*" element={<h1>No element</h1>} />
      </Routes>
    </BrowserRouter>
  );
};
