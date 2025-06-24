import { useEffect, useId, useRef, type ChangeEvent } from "react";
import { Link, useNavigate } from "react-router";
import { useAppDispatch } from "../../hooks";
import { setCredentials } from "../../features/auth/authSlice";
import { useLoginMutation } from "../../features/api/userApiSlice";
import { useAppSelector } from "../../hooks";
import { toast } from "react-toastify";

const Login = () => {
  const email = useRef<HTMLInputElement>(null);
  const password = useRef<HTMLInputElement>(null);
  const id = useId();
  const [handleLoginUser, { isLoading }] = useLoginMutation();
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const { userInfo } = useAppSelector((state) => state.auth);

  const handleForm = async (e: ChangeEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      const user = await handleLoginUser({
        email: email.current?.value,
        password: password.current?.value,
      }).unwrap();
      console.log("user", user);
      if (user?.success) {
        dispatch(setCredentials({ ...user?.user }));
        navigate("/");
      }
      toast.success(user?.message)
    } catch (error) {
      toast.error((error as any).data?.error)
    }
  };

  useEffect(() => {
    if (userInfo) {
      navigate("/");
    }
  }, [navigate, userInfo]);

  return (
    <div className="flex items-center justify-center min-h-screen bg-black text-white px-4">
      <div className="w-full max-w-md space-y-8">
        <div>
          <h2 className="text-3xl font-bold text-center">Welcome Back</h2>
          <p className="text-gray-400 text-center">
            Please login to your account
          </p>
        </div>

        <form onSubmit={handleForm} className="space-y-6">
          <div>
            <label htmlFor={id + "-email"} className="block text-sm mb-1">
              Email address
            </label>
            <input
              id={id + "-email"}
              type="email"
              ref={email}
              required
              className="w-full p-3 rounded-md bg-gray-800 border border-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          <div>
            <label htmlFor={id + "-password"} className="block text-sm mb-1">
              Password
            </label>
            <input
              id={id + "-password"}
              type="password"
              ref={password}
              required
              className="w-full p-3 rounded-md bg-gray-800 border border-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          <button
            type="submit"
            disabled={isLoading}
            className={`w-full ${
              isLoading ? "opacity-40" : "opacity-100"
            } py-3 cursor-pointer bg-blue-600 hover:bg-blue-700 rounded-md font-semibold`}
          >
            Login
          </button>

          <p className="text-sm text-center text-gray-400">
            Don’t have an account?{" "}
            <Link to={"/register"} className="text-blue-400 hover:underline">
              Sign up
            </Link>
          </p>
        </form>
      </div>
    </div>
  );
};

export default Login;
