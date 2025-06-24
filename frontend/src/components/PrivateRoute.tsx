import { Navigate, Outlet } from "react-router";
import { useAppSelector } from "../hooks";

const PrivateRoute = () => {
  const { userInfo } = useAppSelector((state) => state.auth);

  return userInfo ? <Outlet /> : <Navigate to={"/login"} />;
};

export default PrivateRoute;
