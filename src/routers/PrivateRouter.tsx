import { Navigate, Outlet } from "react-router-dom";

interface Props {
  isAuthenticated: Boolean;
}

export const PrivateRouter = ({ isAuthenticated }: Props) => {
  return isAuthenticated ? <Outlet /> : <Navigate replace to="/auth/login" />;
};
