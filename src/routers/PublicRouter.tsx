import { Navigate, Outlet } from "react-router-dom";

interface Props {
  isAuthenticated: boolean;
}

export const PublicRouter = ({ isAuthenticated }: Props) => {
  return !isAuthenticated ? <Outlet /> : <Navigate replace to="/" />;
};
