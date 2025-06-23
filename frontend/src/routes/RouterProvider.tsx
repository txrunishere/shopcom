import { Routes, Route } from "react-router";
import MainLayout from "../layout/MainLayout"
import Login from "../pages/Auth/Login"

const RouterProvider = () => {
  return (
    <Routes>
      <Route path="/" element={<MainLayout />}>
        <Route index element={<h1>Hello World</h1>} />
        <Route path="/login" element={<Login />} />
      </Route>
    </Routes>
  )
};

export default RouterProvider;
