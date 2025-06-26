import { Routes, Route } from "react-router";
import MainLayout from "../layout/MainLayout";
import { Login, Register, Profile, UserList, AdminRoute, CategoryList } from "../pages";
import { PrivateRoute } from "../components";

const RouterProvider = () => {
  return (
    <Routes>
      <Route path="/" element={<MainLayout />}>
        <Route path="/admin" element={<AdminRoute />}>
          <Route path="userlist" element={<UserList />} />
          <Route path="categorylist" element={<CategoryList />} />
        </Route>

        <Route path="" element={<PrivateRoute />}>
          <Route path="/profile" element={<Profile />} />
        </Route>

        <Route index element={<h1>Hello World</h1>} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
      </Route>
    </Routes>
  );
};

export default RouterProvider;
