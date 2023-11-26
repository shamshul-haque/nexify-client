import { useQuery } from "@tanstack/react-query";
import { toast } from "react-toastify";
import useAuth from "../../hooks/useAuth";
import useAxiosPrivate from "../../hooks/useAxiosPrivate";

const ManageUsers = () => {
  const axiosPrivate = useAxiosPrivate();
  const { user } = useAuth();

  const {
    data: users,
    isLoading,
    refetch,
  } = useQuery({
    queryKey: ["users"],
    enabled: !!user?.email,
    queryFn: async () => {
      const res = await axiosPrivate.get("/users");
      return res?.data;
    },
  });
  if (isLoading) {
    return (
      <div className="w-full flex justify-center items-center">
        <span className="loading loading-spinner w-40 py-52 bg-yellow-500"></span>
      </div>
    );
  }

  const handleRole = async (user, role) => {
    const res = await axiosPrivate.patch(`/users/admin/${user?._id}`, { role });
    if (res?.data?.modifiedCount > 0) {
      refetch();
      toast?.success(`${user?.name} is ${role} now.`, {
        position: "top-center",
        theme: "colored",
      });
    }
  };

  return (
    <div className="bg-emerald-500 shadow-xl min-h-screen p-5 md:p-10 m-5 md:m-10">
      <div className="uppercase">
        <h2 className="font-bold text-center text-3xl">
          Total Users: {users?.length}
        </h2>
      </div>
      <div className="overflow-x-auto mt-6">
        <table className="table">
          <thead className="bg-yellow-500">
            <tr className="uppercase text-white">
              <th>Sl</th>
              <th>Name</th>
              <th>Email</th>
              <th>Role</th>
              <th className="text-center">Set Role</th>
            </tr>
          </thead>
          <tbody>
            {users?.map((user, index) => (
              <tr key={user._id}>
                <th>{index + 1}</th>
                <td>{user?.name}</td>
                <td>{user?.email}</td>
                <td>
                  {user.role === "admin"
                    ? "Admin"
                    : user.role === "moderator"
                    ? "Moderator"
                    : "User"}
                </td>
                <td className="text-center flex flex-col gap-2">
                  <button
                    onClick={() => handleRole(user, "admin")}
                    className="bg-yellow-500 hover:text-white transition-all duration-1000 p-2 rounded"
                  >
                    Make Admin
                  </button>
                  <button
                    onClick={() => handleRole(user, "moderator")}
                    className="bg-yellow-500 hover:text-white transition-all duration-1000 p-2 rounded"
                  >
                    Make Moderator
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default ManageUsers;
