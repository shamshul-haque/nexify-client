import { RiMenu3Fill } from "react-icons/ri";
import { Link, NavLink } from "react-router-dom";
import { toast } from "react-toastify";
import useAdmin from "../../../hooks/useAdmin";
import useAuth from "../../../hooks/useAuth";
import useAxiosPrivate from "../../../hooks/useAxiosPrivate";
import useModerator from "../../../hooks/useModerator";

const DropdownMenus = () => {
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
    <div className="dropdown dropdown-end z-50">
      <label tabIndex={0} className="btn m-1">
        <RiMenu3Fill className="text-xl" />
      </label>
      <div
        tabIndex={0}
        className="dropdown-content p-5 shadow bg-white rounded-md w-52"
      >
        <div className="flex flex-col">
          {user && (
            <div className="text-center mb-2 uppercase">
              <img
                alt="profile picture"
                src={user?.photoURL}
                className="w-10 rounded-full mx-auto"
              />
              <h1 className="font-bold text-center my-2">
                {user?.displayName}
              </h1>
              <Link
                to={`/dashboard/${
                  isAdmin
                    ? "statistics"
                    : isModerator
                    ? "review-queue"
                    : "user-profile"
                }`}
              >
                <button className="bg-yellow-500 hover:bg-emerald-500 text-white transition-all duration-1000 p-2 rounded uppercase cursor-pointer w-full text-center">
                  Dashboard
                </button>
              </Link>
            </div>
          )}
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
            <Link to="/" onClick={handleLogout}>
              Logout
            </Link>
          ) : (
            <Link
              to="/login"
              className={({ isActive }) =>
                isActive
                  ? "text-yellow-600 active border-yellow-600 py-1 "
                  : "py-1"
              }
            >
              Login
            </Link>
          )}
        </div>
      </div>
    </div>
  );
};

export default DropdownMenus;
