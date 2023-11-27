import { useQuery } from "@tanstack/react-query";
import { Link } from "react-router-dom";
import useAuth from "../../hooks/useAuth";
import useAxiosPrivate from "../../hooks/useAxiosPrivate";

const MyProfile = () => {
  const { user } = useAuth();
  const axiosPrivate = useAxiosPrivate();

  const { data: payment, isLoading } = useQuery({
    queryKey: ["payment"],
    queryFn: async () => {
      const res = await axiosPrivate.get(
        `/users/payment-history?email=${user?.email}`
      );
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

  return (
    <div className="bg-emerald-500 shadow-xl min-h-screen p-5 md:p-10 m-5 md:m-10 text-white text-center">
      <img
        src={user?.photoURL}
        alt="profile pic"
        className="mx-auto w-40 h-40 rounded-full mt-10"
      />
      <h1 className="text-xl lg:text-4xl font-bold mt-5">
        Name: {user?.displayName}
      </h1>
      <p>{user?.email}</p>
      {payment.length === 0 ? (
        <Link to="/dashboard/payments">
          <button className="bg-yellow-500 hover:bg-transparent hover:border hover:border-yellow-500 text-white transition-all duration-1000 p-2 md:px-4 md:py-3 rounded uppercase cursor-pointer text-center mt-5">
            Subscribe - $20/month
          </button>
        </Link>
      ) : (
        <>
          <p>{payment[0].status === true ? "Status: Verified" : ""}</p>
          <button
            disabled
            className="bg-gray-300 text-black cursor-not-allowed p-2 md:px-4 md:py-3 rounded uppercase text-center mt-5"
          >
            Subscribe - $20/month
          </button>
        </>
      )}
    </div>
  );
};

export default MyProfile;
