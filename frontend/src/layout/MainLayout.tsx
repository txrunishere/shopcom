import { Outlet } from "react-router";
import { ToastContainer } from "react-toastify";

const MainLayout = () => {
  return (
    <>
      <ToastContainer />
      <main>
        <Outlet />
      </main>
    </>
  );
};

export default MainLayout;
