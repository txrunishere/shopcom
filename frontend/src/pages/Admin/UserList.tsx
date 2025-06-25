import { toast } from "react-toastify";
import { useGetAllUsersQuery } from "../../features/api/adminApiSlice";
import { useDeleteUserMutation } from "../../features/api/adminApiSlice";
import moment from "moment";
import { useState } from "react";

const UserList = () => {
  const { data, isLoading } = useGetAllUsersQuery();
  const [deleteUserId, setdeleteUserId] = useState<string | null>(null);

  const [handleDelete, { isLoading: deleteLoading }] = useDeleteUserMutation();

  const handleUserDelete = async (id: string) => {
    try {
      setdeleteUserId(id)
      const user = await handleDelete(id).unwrap();
      if (user?.success) {
        toast.success(user?.message);
      }
    } catch (error) {
      toast.error((error as any).data.error);
    }
  };

  return (
    <div className="p-6">
      <h1 className="text-4xl text-center font-bold mb-10">Users</h1>
      {isLoading ? (
        <p className="text-center">Loading</p>
      ) : (
        <section className="flex flex-col flex-wrap">
          <table className="w-full mx-auto">
            <thead>
              <tr>
                <th className="px-4 py-2 text-xl text-left">ID</th>
                <th className="px-4 py-2 text-xl text-left">NAME</th>
                <th className="px-4 py-2 text-xl text-left">EMAIL</th>
                <th className="px-4 py-2 text-xl text-left">CREATEDAT</th>
              </tr>
            </thead>
            <tbody>
              {data &&
                data?.users.map((user) => (
                  <tr className="bg-gray-600" key={user.id}>
                    <td className="px-4 py-2 text-left">{user.id}</td>
                    <td className="px-4 py-2 text-left">{user.username}</td>
                    <td className="px-4 py-2 text-left">{user.email}</td>
                    <td className="px-4 py-2 text-left">
                      {moment(user.createdAt).format("MMMM Do YYYY, h:mm A")}
                    </td>
                    <td className="text-left">
                      {
                        <button
                          disabled={deleteLoading && deleteUserId == user.id}
                          className={`bg-pink-400 hover:bg-pink-500 cursor-pointer py-1 px-2 ${
                            (deleteLoading && deleteUserId == user.id) ? "opacity-50" : "opacity-100"
                          } rounded-sm`}
                          onClick={() => handleUserDelete(user.id)}
                        >
                          Delete
                        </button>
                      }
                    </td>
                  </tr>
                ))}
            </tbody>
          </table>
        </section>
      )}
    </div>
  );
};

export default UserList;
