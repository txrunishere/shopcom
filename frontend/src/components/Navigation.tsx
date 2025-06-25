import { FaHome, FaHeart, FaShoppingCart, FaShoppingBag } from "react-icons/fa";
import { IoIosArrowDown, IoIosArrowUp } from "react-icons/io";
import { Link } from "react-router";
import { useAppDispatch, useAppSelector } from "../hooks";
import { logout } from "../features/auth/authSlice";
import { useLogoutMutation } from "../features/api/userApiSlice";
import { useNavigate } from "react-router";
import { toast } from "react-toastify";
import { useEffect, useState } from "react";

const Navigation = () => {
  const [dropDown, setDropDown] = useState<boolean>(false);
  const { userInfo } = useAppSelector((state) => state.auth);
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const [handleUserLogout] = useLogoutMutation();

  useEffect(() => {
    setDropDown(false);
  }, [navigate]);

  const handleLogout = async () => {
    try {
      const user = await handleUserLogout({}).unwrap();
      if (user?.message) {
        dispatch(logout());
        navigate("/login");
      }
      setDropDown(false);
    } catch (error) {
      toast.error((error as any).data?.error);
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
            <div className="flex items-center justify-between">
              <span className="font-semibold text-[17px]">
                {userInfo?.username}
              </span>
              {dropDown ? (
                <IoIosArrowUp
                  onClick={() => setDropDown(false)}
                  className="cursor-pointer"
                  size={20}
                />
              ) : (
                <IoIosArrowDown
                  onClick={() => setDropDown(true)}
                  className="cursor-pointer"
                  size={20}
                />
              )}
              {dropDown && userInfo && (
                <ul
                  className={`absolute bottom-12 right-5 text-white bg-gray-600`}
                >
                  {userInfo.isAdmin ? (
                    <>
                      <li>
                        <Link
                          to="/admin/dashboard"
                          className="block px-4 py-2 hover:bg-gray-100  hover:text-gray-700"
                        >
                          Dashboard
                        </Link>
                      </li>
                      <li>
                        <Link
                          to="/admin/productlist"
                          className="block px-4 py-2 hover:bg-gray-100  hover:text-gray-700"
                        >
                          Products
                        </Link>
                      </li>
                      <li>
                        <Link
                          to="/admin/categorylist"
                          className="block px-4 py-2 hover:bg-gray-100  hover:text-gray-700"
                        >
                          Category
                        </Link>
                      </li>
                      <li>
                        <Link
                          to="/admin/orderlist"
                          className="block px-4 py-2 hover:bg-gray-100  hover:text-gray-700"
                        >
                          Orders
                        </Link>
                      </li>
                      <li>
                        <Link
                          to="/admin/userlist"
                          className="block px-4 py-2 hover:bg-gray-100  hover:text-gray-700"
                        >
                          Users
                        </Link>
                      </li>
                      <li>
                        <Link
                          to="/profile"
                          className="block px-4 py-2 hover:bg-gray-100  hover:text-gray-700"
                        >
                          Profile
                        </Link>
                      </li>
                      <li>
                        <button
                          onClick={handleLogout}
                          className="block w-full px-4 py-2 text-left hover:bg-gray-100 hover:text-gray-700"
                        >
                          Logout
                        </button>
                      </li>
                    </>
                  ) : (
                    <>
                      <li>
                        <Link
                          to="/profile"
                          className="block px-4 py-2 hover:bg-gray-100  hover:text-gray-700"
                        >
                          Profile
                        </Link>
                      </li>
                      <li>
                        <button
                          onClick={handleLogout}
                          className="block w-full px-4 py-2 text-left hover:bg-gray-100 hover:text-gray-700"
                        >
                          Logout
                        </button>
                      </li>
                    </>
                  )}
                </ul>
              )}
              {/* <button
                onClick={handleLogout}
                className="bg-[#444] text-white border-none py-3 text-center px-4 rounded-lg cursor-pointer font-medium"
              >
                Logout
              </button> */}
            </div>
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
