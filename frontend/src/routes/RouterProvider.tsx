import { Routes, Route } from "react-router";
import MainLayout from "../layout/MainLayout"

const RouterProvider = () => {
  return (
    <Routes>
      <Route path="/" element={<MainLayout />}>
        <Route index element={<h1>Hello World</h1>} />
      </Route>
    </Routes>
  )
};

export default RouterProvider;
