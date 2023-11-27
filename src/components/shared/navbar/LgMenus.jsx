import { Link, NavLink } from "react-router-dom";
import { toast } from "react-toastify";
import useAdmin from "../../../hooks/useAdmin";
import useAuth from "../../../hooks/useAuth";
import useAxiosPrivate from "../../../hooks/useAxiosPrivate";
import useModerator from "../../../hooks/useModerator";

const LgMenus = () => {
  const { user, logoutUser } = useAuth();
  const axiosPrivate = useAxiosPrivate();
  const { isAdmin } = useAdmin();
  const { isModerator } = useModerator();

  const handleLogout = async () => {
    logoutUser();
    const res = await axiosPrivate.post("/users/logout");
    if (res?.data?.success) {
      toast?.success("Logout successful!", {
        position: "top-right",
        theme: "colored",
      });
    }
  };

  return (
    <div className="flex items-center justify-between gap-5">
      <NavLink
        to="/"
        className={({ isActive }) =>
          isActive ? "text-yellow-600 border-yellow-600 py-1 " : "py-1"
        }
      >
        Home
      </NavLink>
      <NavLink
        to="/products"
        className={({ isActive }) =>
          isActive ? "text-yellow-600 border-yellow-600 py-1 " : "py-1"
        }
      >
        Products
      </NavLink>

      {user ? (
        <div className="dropdown dropdown-end">
          <label tabIndex={0} className="btn btn-circle avatar">
            <img alt="" src={user?.photoURL} className="rounded-full" />
          </label>
          <div
            tabIndex={0}
            className="w-52 mr-10 -mt-2 p-5 shadow menu-sm dropdown-content bg-white rounded-md flex flex-col uppercase"
          >
            <h1 className="font-bold text-center mb-2">{user?.displayName}</h1>
            <Link
              to={`/dashboard/${
                isAdmin
                  ? "statistics"
                  : isModerator
                  ? "review-queue"
                  : "user-profile"
              }`}
            >
              <button className="bg-yellow-500 hover:bg-emerald-500 text-white transition-all duration-1000 p-2 rounded uppercase cursor-pointer w-full text-center mt-3">
                Dashboard
              </button>
            </Link>
            <Link to="/">
              <button
                onClick={handleLogout}
                className="bg-yellow-500 hover:bg-emerald-500 text-white transition-all duration-1000 p-2 rounded uppercase cursor-pointer w-full text-center mt-3"
              >
                Logout
              </button>
            </Link>
          </div>
        </div>
      ) : (
        <Link
          to="/login"
          className="bg-yellow-500 hover:bg-emerald-500 text-white transition-all duration-1000 p-2 rounded uppercase cursor-pointer"
        >
          Login
        </Link>
      )}
    </div>
  );
};

export default LgMenus;
