import { Navigate, Outlet } from "react-router";
import { useAppSelector } from "../../hooks";

const AdminRoute = () => {
  const userInfo = useAppSelector((state) => state.auth.userInfo);

  return userInfo && userInfo.isAdmin ? (
    <Outlet />
  ) : (
    <Navigate to={"/"} replace />
  );
};

export default AdminRoute;
