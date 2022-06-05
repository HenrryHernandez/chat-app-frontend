import { Navigate, Outlet } from "react-router-dom";

interface Props {
  isAuthenticated: Boolean;
}

export const PublicRouter = ({ isAuthenticated }: Props) => {
  return !isAuthenticated ? <Outlet /> : <Navigate replace to="/" />;
};
