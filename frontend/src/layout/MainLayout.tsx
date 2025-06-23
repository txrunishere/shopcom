import { Outlet } from "react-router";
import { ToastContainer } from "react-toastify";
import Navigation from "../components/Navigation";

const MainLayout = () => {
  return (
    <>
      <ToastContainer />
      <div className="flex">
        <aside className="h-screen w-64 z-50 flex-shrink-0 shadow-lg">
          <Navigation />
        </aside>
        <main className="w-screen">
          <Outlet />
        </main>
      </div>
    </>
  );
};

export default MainLayout;
