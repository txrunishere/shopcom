import { FaHome, FaHeart, FaShoppingCart, FaShoppingBag } from "react-icons/fa";
import { Link } from "react-router";
import { useAppDispatch, useAppSelector } from "../hooks";
import { logout } from "../features/auth/authSlice";
import { useLogoutMutation } from "../features/api/userApiSlice";
import { useNavigate } from "react-router";
import { toast } from "react-toastify";

const Navigation = () => {
  const { userInfo } = useAppSelector((state) => state.auth);
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const [handleUserLogout] = useLogoutMutation();

  const handleLogout = async () => {
    try {
      await handleUserLogout({}).unwrap();
      dispatch(logout());
      navigate("/");
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <nav className="h-full">
      <div className="flex flex-col h-full fixed bg-[#181818] text-white p-6 min-w-[250px] justify-between">
        <nav>
          <ul className="list-none p-0 m-0">
            <li className="mb-6">
              <Link className="flex items-center gap-2" to={"/"}>
                <FaHome size={18} />
                Home
              </Link>
            </li>
            <li className="mb-6">
              <Link className="flex items-center gap-2" to={"/"}>
                <FaShoppingBag size={18} />
                Shop
              </Link>
            </li>
            <li className="mb-6">
              <Link className="flex items-center gap-2" to={"/"}>
                <FaShoppingCart size={18} />
                Cart
              </Link>
            </li>
            <li>
              <Link className="flex items-center gap-2" to={"/"}>
                <FaHeart size={18} />
                Favourite
              </Link>
            </li>
          </ul>
        </nav>
        {userInfo ? (
          <>
            <span>{userInfo?.username}</span>
          </>
        ) : (
          <div className="mt-8 flex flex-col gap-4">
            <Link
              to={"/login"}
              className="bg-[#222] text-white border-none py-3 text-center px-4 rounded-lg cursor-pointer font-medium"
            >
              Login
            </Link>
            <Link
              to={"/register"}
              className="bg-[#444] text-white border-none py-3 text-center px-4 rounded-lg cursor-pointer font-medium"
            >
              Register
            </Link>
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navigation;
