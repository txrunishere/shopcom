import { useEffect, useId, useState, type ChangeEvent } from "react";
import { useAppDispatch, useAppSelector } from "../../hooks";
import { useUpdateProfileMutation } from "../../features/api/userApiSlice";
import { toast } from "react-toastify";
import { setCredentials } from "../../features/auth/authSlice";

const Profile = () => {
  const [username, setUsername] = useState<string>("");
  const [email, setEmail] = useState<string>("");

  const { userInfo } = useAppSelector((state) => state.auth);
  const id = useId();

  const [handleUserProfileUpdate, { isLoading }] = useUpdateProfileMutation();

  useEffect(() => {
    if (userInfo) {
      setUsername(userInfo?.username);
      setEmail(userInfo?.email);
    }
  }, [userInfo]);

  const dispatch = useAppDispatch();

  const handleSubmit = async (e: ChangeEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      const user = await handleUserProfileUpdate({
        username,
        email,
      }).unwrap();
      if (user?.success) {
        dispatch(setCredentials({ ...user?.updatedUser }));
        toast.success(user.message);
      }
    } catch (error) {
      toast.error((error as any).data.error);
    }
  };

  return (
    <div className="container mx-auto p-4 mt-[10rem]">
      <div className="flex justify-center flex-col items-center md:flex md:space-x-4">
        <h2 className="text-2xl font-semibold mb-6">Update Profile</h2>

        <form onSubmit={handleSubmit}>
          <div className="mb-4 flex flex-col space-y-2">
            <label htmlFor={id + "-username"} className="block font-semibold">
              Username
            </label>
            <input
              className="p-4 rounded-sm w-full outline-none bg-gray-500"
              type="text"
              id={id + "-username"}
              value={username}
              name="username"
              onChange={(e) => setUsername(e.target.value)}
            />
          </div>
          <div className="mb-4 flex flex-col space-y-2">
            <label htmlFor={id + "-email"} className="block font-semibold">
              Email
            </label>
            <input
              className="p-4 rounded-sm w-full outline-none bg-gray-500"
              type="email"
              id={id + "-email"}
              value={email}
              name="email"
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>
          <button
            type="submit"
            disabled={isLoading}
            className={`bg-pink-400 w-full mt-2 hover:bg-pink-500 py-3 px-2 rounded-sm ${
              isLoading ? "opacity-50" : "opacity-100"
            }`}
          >
            Change
          </button>
        </form>
      </div>
    </div>
  );
};

export default Profile;
