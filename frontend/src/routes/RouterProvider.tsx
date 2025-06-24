import { Routes, Route } from "react-router";
import MainLayout from "../layout/MainLayout"
import { Login, Register } from "../pages"

const RouterProvider = () => {
  return (
    <Routes>
      <Route path="/" element={<MainLayout />}>
        <Route index element={<h1>Hello World</h1>} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
      </Route>
    </Routes>
  )
};

export default RouterProvider;
